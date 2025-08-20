import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {BeatLoader, CircleLoader, ClipLoader, DotLoader} from "react-spinners";
import { useTheme } from '../components/ThemeContext';
import {router} from "next/client";
const ENERGY_OPTIONS = [
  { count: 1, energy: 131_000 },
  { count: 2, energy: 262_000 },
  { count: 5, energy: 655_000 },
  { count: 10, energy: 1_310_000 },
];

const OLD_TRX_PER_ENERGY = 27 / 131_000; // старая цена
const NEW_TRX_PER_ENERGY = 6.25 / 131_000; // новая цена
interface EnergySectionProps {
  onOpenWalletModal: () => void;
  isConnecting: boolean;
  connectWallet: () => void;
}
const EnergySection: React.FC<EnergySectionProps> = ({
                                                       onOpenWalletModal,
                                                       isConnecting,
                                                       connectWallet,
                                                     }) => {

  const handleTransactionSuccess = () => {
    router.push("/success"); // редирект на страницу после оплаты
    // router.push("/thank-you"); // редирект на страницу после оплаты
  };

  // По умолчанию первый вариант
  const [energyValue, setEnergyValue] = useState<number>(131_000);
  const { t } = useTranslation();
  // --- UTM-метка utm_energy ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const utmEnergy = params.get("open");
    if (utmEnergy) {
      // Ищем подходящий быстрый вариант
      const match = ENERGY_OPTIONS.find(
          (opt) => String(opt.count) === utmEnergy
      );
      if (match) setEnergyValue(match.energy);
      else if (!isNaN(Number(utmEnergy)) && Number(utmEnergy) >= 10000) {
        setEnergyValue(Number(utmEnergy));
      }
    }
  }, []);

  // Обработка ручного ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(10_000, Number(e.target.value.replace(/\D/g, "")));
    setEnergyValue(val);
  };

  // Выбор из select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCount = Number(e.target.value);
    const match = ENERGY_OPTIONS.find((opt) => opt.count === selectedCount);
    if (match) setEnergyValue(match.energy);
  };

  const selectedOption = ENERGY_OPTIONS.find((opt) => opt.energy === energyValue);
  const selectedCount = selectedOption ? selectedOption.count : "";

  // Custom select state (dropdown)
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Цены и экономия
  const oldTrxAmount = +(energyValue * OLD_TRX_PER_ENERGY);
  const newTrxAmount = +(energyValue * NEW_TRX_PER_ENERGY);
  const savedTrx = oldTrxAmount - newTrxAmount;

  const { theme } = useTheme();

  return (
      <div id="energy-section" className="rounded-lg">
        <div className="mt-0">
          <div className="flex font-normal justify-between mb-4 flex-col">
            <label className="font-normal text-black">{t("buyCount")}</label>
            <span className="text-black opacity-50 text-sm text-orange">{t("tip")}</span>
          </div>
          
          <input
              type="hidden"
              id="energy_count"
              name="energy_count"
              value={energyValue}
          />
        </div>

        <div className="mt-4 relative">
          <div className="flex justify-between items-center mt-5">
            <label className="absolute top-3 left-0 font-normal text-xs z-10 opacity-40 text-black ml-2 mb-1" style={{ paddingLeft: "1.5rem" }}>{t("getEnergy")}</label>
          </div>
          <div className="relative w-full">
            {/* Input value */}
            <input
                type="text"
                id="energy_display"
                className="w-full py-3 h-11 pr-40 rounded-lg font-bold bg-white text-white border border-gray-600 no-spin"
                style={{
                  paddingLeft: "1.5rem",
                  fontSize: "28px",
                  MozAppearance: "textfield" as any,
                }}
                placeholder={t("energyPlaceholder")}
                value={energyValue}
                min={10000}
                onChange={handleInputChange}
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
            />

            <div ref={selectRef} className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center rounded-lg gap-2 bg-[#E6EFF8] py-1  px-2">
              <img src="icons/energy.svg" alt="energy" className="w-4 h-4"/>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isSelectOpen}
                onClick={() => setIsSelectOpen((v) => !v)}
                className="bg-transparent text-black font-bold text-sm border border-transparent rounded-md py-2 pl-1 pr-6 focus:outline-none relative min-w-[70px] text-right"
              >
                {t(`btn${selectedCount || 1}`)}
                <svg
                  className={`w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 transition-transform ${isSelectOpen ? "rotate-180" : "rotate-0"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z"/>
                </svg>
              </button>
              {isSelectOpen && (
                <ul
                >
                </ul>
              )}
            </div>

            <style jsx>{`
              input[type="number"]::-webkit-inner-spin-button,
              input[type="number"]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
              input[type="number"],
              input[type="text"].no-spin {
                -moz-appearance: textfield;
              }
            `}</style>
          </div>
        </div>

        <div className="flex mt-4 text-lg font-medium justify-between ">
          <div className="flex flex-col gap-1 items-center space-x-1 mb-2">
            <div className="flex items-center space-x-1">
              <span className="text-xs font-normal text-[#6E7277]">{t("payText")}</span>
              {/* <span
                  className=" text-xs text-[#6E7277] font-bold mr-2 line-through"
                  id="origin_price"
                  style={{color: "#474747",}}
              >
              {savedTrx > 0 ? `${(savedTrx + newTrxAmount).toFixed(2)} TRX` : null}
            </span> */}
              <span
                  className="text-xs text-[#2E77DA]"
                  id="final_price"
                  style={{ fontWeight: "500" }}
              >
              {newTrxAmount.toFixed(2)} TRX
            </span>
            </div>
            {/* <div className="flex items-center space-x-1">
              <span className="text-xs font-normal text-[#6E7277]">{t("saveText")}</span>
              <span
                  className="text-xs font-bold mr-2 text-[#2E77DA]"
                  id="origin_price"
              >
                {savedTrx > 0 ? `${savedTrx.toFixed(2)} TRX` : null}
              </span>
            </div> */}
          </div>
          <div
            className="text-xs text-center text-[#6E7277]"
            dangerouslySetInnerHTML={{ __html: t("expireTip") }}
          ></div>
        </div>

        <div className="flex space-x-4 mt-4">
          <button
              onClick={connectWallet}
              className={`purchase-energy-btn w-full py-3 rounded-lg transition-all flex justify-center items-center
            ${
                  isConnecting
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={isConnecting} // кнопка не активна во время загрузки
          >
            {isConnecting ? (
                t("loadingExchange")
            ) : (
                t("purchaseBtn")
            )}
          </button>
        </div>

        <div className="text-center space-y-2 py-2 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 p-0 rounded-full"  style={{ background: "#74eb69",}}/>
              <div className="font-normal text-[#4F4A4A] text-[16px] text-center leading-[25px]">
                  {t("last_purchase_label")}:
              </div>
            </div>
            <div className="font-bold text-[#4F4A4A] text-[16px] text-center leading-[25px]">
                {t("last_purchase_text")}
            </div>
          </div>
        </div>
      </div>
  );
};
export default EnergySection;
