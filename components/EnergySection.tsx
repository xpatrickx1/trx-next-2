import React, { useState, useEffect } from "react";
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

  // Цены и экономия
  const oldTrxAmount = +(energyValue * OLD_TRX_PER_ENERGY);
  const newTrxAmount = +(energyValue * NEW_TRX_PER_ENERGY);
  const savedTrx = oldTrxAmount - newTrxAmount;

  const { theme } = useTheme();

  return (
      <div id="energy-section" className="rounded-lg">
        <div className="mt-0">
          <div className="flex font-normal justify-between mb-4 flex-col">
            <label className="font-medium">{t("buyCount")}</label>
            <span className="text-gray-400 text-sm text-orange">{t("tip")}</span>
          </div>
          <div className={`grid grid-cols-4 gap-4 ${
              theme === 'green' ? 'theme-green' : 'theme-primary'
          }`}>
            {ENERGY_OPTIONS.map((opt) => (
                <button
                    key={opt.count}
                    type="button"
                    className={`purchase-btn px-3 py-3 border font-normal border-black rounded text-white hover:bg-black-700 focus:outline-none
                ${
                        energyValue === opt.energy
                            ? "style_for_energy"
                            : "bg-transparent border-gray-500"
                    }`}
                    onClick={() => setEnergyValue(opt.energy)}
                >
                  {t(`btn${opt.count}`)}
                </button>
            ))}
          </div>
          <input
              type="hidden"
              id="energy_count"
              name="energy_count"
              value={energyValue}
          />
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mt-5">
            <label className="font-normal opacity-60 text-white ml-2 mb-1 uppercase">{t("getEnergy")}</label>
          </div>
          <div className="relative w-full">

            <input
                type="text"
                id="energy_display"
                className="w-full py-3 h-11 pr-4 rounded-lg bg-black text-white border border-gray-600 no-spin"
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
            <i className="i-local:energy-s2 absolute left-1 top-1/2 transform -translate-y-1/2 text-xl"></i>
          </div>
        </div>
        <div
            className="text-xs text-center my-2 mb-8"
            dangerouslySetInnerHTML={{ __html: t("expireTip") }}
        ></div>


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

        <div className="mt-4 text-lg font-medium">
          <div className="flex flex-col gap-1 mt-6 items-center space-x-1">
            <div className="flex items-center space-x-1">
              <span className="text-base font-normal">{t("payText")}</span>
              <span
                  className=" text-base font-bold mr-2 line-through"
                  id="origin_price"
                  style={{color: "#474747",}}
              >
              {savedTrx > 0 ? `${(savedTrx + newTrxAmount).toFixed(2)} TRX` : null}
            </span>
              <span
                  className="text-base font-bold"
                  id="final_price"
                  style={{ color: "#fff", fontWeight: "900" }}
              >
            {newTrxAmount.toFixed(2)} TRX
          </span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-base font-normal">{t("saveText")}</span>
              <span
                  className={`text-base font-bold mr-2 ${
                      theme === 'green' ? 'text-theme-green' : 'text-theme-primary'
                  }`}
                  id="origin_price"
              >
              {savedTrx > 0 ? `${savedTrx.toFixed(2)} TRX` : null}
            </span>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 px-5 py-2 mt-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 p-0 rounded-full"  style={{ background: "#74eb69",}}/>
              <div className="font-normal text-[#ababab] text-[17.4px] text-center leading-[25px]">
                  {t("last_purchase_label")}:
              </div>
            </div>
            <div className="font-bold text-[#ababab] text-[17.4px] text-center leading-[25px]">
                {t("last_purchase_text")}
            </div>
          </div>
        </div>
      </div>
  );
};
export default EnergySection;
