import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Image from 'next/image';
import {BeatLoader, CircleLoader, ClipLoader, DotLoader} from "react-spinners";
import {router} from "next/client";
import { useBinanceRate } from '../hooks/useBinanceRate';

const ENERGY_OPTIONS = [
  { count: 25, energy: 100 }, 
  { count: 50, energy: 200 },
  { count: 75, energy: 500 },
  { count: 100, energy: 1000 },
];

const APY_RATE = 16.71;

interface UnifiedStakeSectionProps {
  onOpenWalletModal: () => void;
  isConnecting: boolean;
  connectWallet: () => void;
  sectionType: 'USDT' | 'TRX' | 'sUSDT' | 'sTRX';
}

const UnifiedStakeSection: React.FC<UnifiedStakeSectionProps> = ({
  onOpenWalletModal,
  isConnecting,
  connectWallet,
  sectionType,
}) => {

  const handleTransactionSuccess = () => {
    router.push("/success");
  };

 

  // Отримуємо курс TRX/USDT
  const trxRate = useBinanceRate("TRX", "USDT");
  
  // Окремий стан для кожної секції
  const [energyValue, setEnergyValue] = useState<number>(100);
  const [isButtonActive, setIsButtonActive] = useState<number | null>(25);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
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
      else if (!isNaN(Number(utmEnergy)) && Number(utmEnergy) >= 10) {
        setEnergyValue(Number(utmEnergy));
      }
    }
  }, []);

  // Обработка ручного ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(0, Number(e.target.value.replace(/\D/g, "")));
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

  const refStakedAmount = useRef(null);

  useEffect(() => {
    const el = refStakedAmount.current;
    if (!el) return;

    let fontSize = 21;
    el.style.fontSize = fontSize + "px";

    while (el.scrollWidth > el.clientWidth && fontSize > 10) {
      fontSize--;
      el.style.fontSize = fontSize + "px";
    }
  }, [energyValue]);

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

  const inputAmount = energyValue;
  
  let stakedAmount = 0;
  let rewardAmount = 0;
  let rewardAmountUsd = 0;
  let ratioText = "";
  
  if (sectionType === 'USDT') {
    stakedAmount = inputAmount;
    rewardAmount = (inputAmount + inputAmount * APY_RATE) / 100;
    rewardAmountUsd = rewardAmount;
    ratioText = "1 USDT = 1 sUSDT";
  } else if (sectionType === 'sUSDT') {
    stakedAmount = inputAmount * 0.999; 
    rewardAmount = 0;
    rewardAmountUsd = 0;
    ratioText = "1 sUSDT = 0.9 USDT";
  } else if (sectionType === 'TRX') {
    const trxToUsdtRate = 0.3345;
    stakedAmount = inputAmount * trxToUsdtRate;
    rewardAmount = (stakedAmount + stakedAmount * APY_RATE) / 100;
    rewardAmountUsd = rewardAmount;
    ratioText = "1 TRX = 1 sTRX";
  } else if (sectionType === 'sTRX') {
    const trxToUsdtRate = 0.3345;
    stakedAmount = inputAmount * 0.999;
    rewardAmount = 0;
    rewardAmountUsd = 0;
    ratioText = "1 sTRX = 0.9 TRX";
  }

  return (
      <div id={`${sectionType.toLowerCase()}-section`} className="rounded-lg pb-20 sm:pb-8 px-8 md:px-12">
        <div className="relative">
          
          <div className={`flex gap-6 sm:gap-3 flex-wrap ${(sectionType === 'sUSDT' || sectionType === 'sTRX') ? 'sm:flex-nowrap' : 'sm:flex-nowrap'}`}>
            <div className={`flex flex-1 flex-col ${(sectionType === 'sUSDT' || sectionType === 'sTRX') ? 'w-full' : 'w-full w-[60%]'}`}>
            <div className="flex justify-between items-center ">
              <label className="font-normal text-left text-sm text-white opacity-60 mb-2">
                {sectionType === 'USDT' ? t("getEnergy") : t("getEnergy")}
              </label>
            </div>
            <div className={`flex items-center relative rounded-md px-5 w-full bg-[#1F2027] border transition-all duration-300 ${isInputFocused ? 'border-[#0780D0]' : 'border-[#1F2027]'}`}>
              {/* Input value */}
              <input
                  type="text"
                  id={`${sectionType.toLowerCase()}_display`}
                  className={`py-3 text-white bg-transparent ${(sectionType === 'sUSDT' || sectionType === 'sTRX') ? 'w-[70%]' : 'w-[50%]'}`}
                  style={{
                    MozAppearance: "textfield" as any,
                  }}
                  placeholder={t("energyPlaceholder")}
                  value={energyValue}
                  min={10}
                  onChange={handleInputChange}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
              />
              <div className="flex items-center justify-end gap-3 relative flex-1 grow">
                <div className="relative whitespace-nowrap w-fit max-w-[88px] xl:max-w-[110px] opacity-30 text-white text-[21px] leading-[normal]"
                 ref={refStakedAmount}
                 style={{
                  fontFamily: "Space Grotesk",
                  fontSize: "clamp(10px, 4vw, 21px)",
                  whiteSpace: "nowrap",
                }}>
                  ≈ ${stakedAmount.toFixed(2)}
                </div>

                <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] opacity-70 [font-family:'Space_Grotesk',Helvetica] font-normal text-white text-lg text-center tracking-[0] leading-[normal]">
                    {sectionType}
                  </div>

                  <Image src={`icons/${sectionType.toLowerCase()}.svg`} width={20} height={20} alt={sectionType} className="w-5 h-5"/>
                </div>
              </div>
            </div>
            </div>
            {/* Reward секція тільки для стейкінгу */}
            {(sectionType === 'USDT' || sectionType === 'TRX') && (
              <div className="flex flex-col w-full sm:w-[190px]">
                <div className="flex justify-start sm:justify-between items-center ">
                  <div className="font-normal text-left text-sm text-white opacity-60 mb-2">
                    {t("reward")} {sectionType} APY
                  </div>
                </div>
                <div className="w-full max-w-[190px] h-[60px] border border-[#060606] justify-start gap-8 rounded-md px-4 py-0 bg-[#060606] flex items-center relative">
                  <div className="relative w-fit [font-family:'Space_Grotesk',Helvetica] font-normal text-[#3ab0ff] text-[21px] tracking-[0] leading-[normal]">
                    {APY_RATE}
                  </div>

                  <div className="justify-end gap-3 flex items-center relative">
                    <div className="inline-flex items-center gap-3 relative flex-[0_0_auto] ml-[-6.00px]">
                      <div className="relative w-fit mt-[-1.00px] opacity-30 [font-family:'Space_Grotesk',Helvetica] font-light text-white text-[21px] tracking-[0] leading-[normal]">
                        ≈ ${rewardAmountUsd.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="right-2 flex items-center rounded-lg gap-2 py-6 sm:py-3 flex-wrap sm:flex-nowrap">
          {ENERGY_OPTIONS.map((opt) => (
            <button
              key={opt.count}
              type="button"
              onClick={() => setIsButtonActive(opt.count)}
              className={`w-[48%] sm:w-[25%] flex-grow items-center justify-center gap-2 whitespace-nowrap [font-family:'Space_Grotesk',Helvetica] rounded-md text-base leading-normal font-medium border   hover:text-accent-foreground px-4 py-1 h-9 sm:flex-1 text-white  hover:opacity-100 transition-opacity transition-all duration-300 ${
                isButtonActive === opt.count
                  ? "border-[#0780D0] bg-[#077FCF8A] text-[#077FCF8A]  opacity-100 text-white "
                  : "border-[#1F2027] bg-[#1f2027] opacity-65"
              }`}
            >
              {`${opt.count}%`}
            </button>
          ))}
        </div>

        <div className="flex mt-1 mb-10 text-lg font-medium justify-end gap-16 sm:gap-20 sm:gap-4 ">
          <div className="opacity-30 font-normal text-white text-sm tracking-[0.84px] leading-[normal]">
            Ratio:
          </div>

          <div className="opacity-30 font-normal text-white text-sm leading-[normal]">
            {ratioText}
          </div>
        </div>

        <div className="flex space-x-4 mt-4 pb-2">
          <button
              onClick={connectWallet}
              className={`max-w-[623px] relative mx-auto purchase-energy-btn w-full py-3 md:py-[18px] text-[16px] sm:text-[21px] rounded-md transition-all flex justify-center items-center
            ${
                  isConnecting
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={isConnecting}
          >
            <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(103.92deg, #058AAF  25.12%, #004663 79.05%)",
                    borderRadius: "5px", 
                    padding: "1px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                ></div>
            {isConnecting ? (
                t("loadingExchange")
            ) : (
                t("connect_wallet")
            )}
          </button>
        </div>
      </div>
  );
};

export default UnifiedStakeSection;
