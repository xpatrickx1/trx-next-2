import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useBinanceRate } from "../hooks/useBinanceRate";
import {
  BarLoader,
  BeatLoader,
  BounceLoader,
  CircleLoader,
  ClipLoader,
  ClockLoader,
  DotLoader,
  HashLoader
} from "react-spinners";
import { useTheme } from '../components/ThemeContext';

const tokens = [
  {
    symbol: "USDT",
    label: "USDT",
    icon: "/icons/usdt.png",
  },
  {
    symbol: "TRX",
    label: "TRX",
    icon: "/icons/trx.png",
  },
];
interface ExchangeySectionProps {
  onOpenWalletModal: () => void;
  isConnecting: boolean;
  connectWallet: () => void;
}

const ExchangeSection: React.FC<ExchangeySectionProps> = ({
  onOpenWalletModal,
  isConnecting,
  connectWallet,
}) => {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [openedList, setOpenedList] = useState<null | "from" | "to">(null);
  const [rotation, setRotation] = useState(0);
  const [fromAmount, setFromAmount] = useState<string>("1");

  const { t, i18n } = useTranslation();
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);

  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const [address, setAddress] = useState("TXYZ1234567890ABCDEF");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCount = Number(e.target.value);
    // const match = ENERGY_OPTIONS.find((opt) => opt.count === selectedCount);
    // if (match) setEnergyValue(match.energy);
  };

  const selectedOption = 4;
  const selectedCount = 2;

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


  const toggle = () => setIsOpenAddress((prev) => !prev);

  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const utmFrom = params.get("from");
    const utmTo = params.get("to");

    if (utmFrom) {
      const matchFrom = tokens.find(
        (t) => t.symbol.toLowerCase() === utmFrom.toLowerCase()
      );
      if (matchFrom) setFromToken(matchFrom);
    }

    if (utmTo) {
      const matchTo = tokens.find(
        (t) => t.symbol.toLowerCase() === utmTo.toLowerCase()
      );
      if (matchTo) setToToken(matchTo);
    }
  }, []);

  // Закрытие при выборе токена
  const handleFromTokenSelect = (token: (typeof tokens)[0]) => {
    setFromToken(token);
    setToToken(tokens.find((t) => t.symbol !== token.symbol)!);
    setOpenedList(null);
  };

  const handleToTokenSelect = (token: (typeof tokens)[0]) => {
    if (token.symbol === fromToken.symbol) setFromToken(toToken);
    setToToken(token);
    setOpenedList(null);
  };

  const swapTokens = () => {
    const prevFrom = fromToken;
    setFromToken(toToken);
    setToToken(prevFrom);
    setOpenedList(null);
    setRotation((prev) => prev + 180);
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const selectWrappers = document.querySelectorAll(".select-currency");
      let inside = false;
      selectWrappers.forEach((wrapper) => {
        if (wrapper.contains(event.target as Node)) inside = true;
      });
      if (!inside) setOpenedList(null);
    }
    if (openedList) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openedList]);

  const rawRate = useBinanceRate(fromToken.symbol, toToken.symbol);
  const rate = rawRate !== null ? rawRate * 1.1 : null;
  // Расчёт сколько получит пользователь
  const toAmount =
    rate !== null && fromAmount && !isNaN(Number(fromAmount))
      ? (Number(fromAmount) * rate).toFixed(2)
      : "";

  return (
    <div id="exchange-section" className={`${
      theme === 'green' ? 'theme-green' : 'theme-primary'
    }`}>
      <div className="mb-2 relative">
        
        <div className="input-group relative">
          <label className="absolute top-3 left-0 text-xs block mb-1 font-normal text-black opacity-40" style={{ paddingLeft: "1.5rem" }}>
            {t("payLabel")}{fromToken.label}
          </label>
          <input
            id="from-amount"
            type="text"
            autoComplete="off"
            placeholder={t("inputAmountPlaceholder")}
            className="w-full pr-24 pt-[20px] py-3 h-11 pl-5 font-bold rounded-lg bg-white text-black border border-gray-600"
            style={{ paddingLeft: "1.5rem" }}
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value.replace(",", "."))}
          />
          <div className="select-currency absolute top-3 w-[112px] right-3 flex items-center pr-6 pl-2 rounded-lg h-[45px] bg-[#E6EFF8]">
            <div
              className="ant-select-selector flex items-center cursor-pointer rounded-lg"
              id="from-token-selector"
              onClick={() =>
                setOpenedList(openedList === "from" ? null : "from")
              }
            >
              <img
                id="from-token-icon"
                src={fromToken.icon}
                style={{ width: "24px", height: "24px", marginRight: "4px" }}
                alt=""
              />
              <span
                id="from-token-text "
                className="text-black min-w-[40px] font-bold text-center text-opacity-70"
              >
                {fromToken.label}
              </span>
              <i className="i-ant-design:down-outlined ml-2"></i>
              <svg
                  className={`w-5 h-5 absolute right-1.5 top-1/2 -translate-y-1/2 transition-transform ${isSelectOpen ? "rotate-180" : "rotate-0"}`}
                  viewBox="0 0 20 20"
                  fill="#000"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" clipRule="evenodd" />
                </svg>
            </div>
            {openedList === "from" && (
              <div
                id="from-token-list"
                className="absolute top-full right-0 text-white rounded-lg mt-2 z-50 w-max min-w-[120px] shadow-lg"
                style={{ backgroundColor: "#262626" }}
              >
                <ul>
                  {tokens
                    .filter((token) => token.symbol !== fromToken.symbol) // Показуємо лише протилежний токен
                    .map((token) => (
                      <li
                        key={token.symbol}
                        className="token-item flex items-center p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
                        onClick={() => handleFromTokenSelect(token)}
                      >
                        <img
                          src={token.icon}
                          style={{
                            width: "24px",
                            height: "24px",
                            marginRight: "8px",
                          }}
                          alt={token.label}
                        />
                        <span>{token.label}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center my-2">
        <button
          type="button"
          onClick={swapTokens}
          className="switch-currency-button text-black hover:text-blue-400 transition focus:outline-none"
        >
          <div className="button-arrows"
          style={{ transform: `rotate(${rotation}deg)` }}
        ></div>
        
        </button>
      </div>

      <div className="mb-4 relative">
        
        <div className="input-group relative">
        <label className="absolute top-3 left-0 block mb-1 text-xs font-normal text-black opacity-40" style={{ paddingLeft: "1.5rem" }}>
          {t("receiveLabel")} {toToken.label}
        </label>
          <input
            id="to-amount"
            type="text"
            autoComplete="off"
            placeholder={t("outputAmountPlaceholder")}
            className="w-full pr-24 py-3 h-11 rounded-lg bg-white font-bold text-black"
            style={{ paddingLeft: "1.5rem" }}
            readOnly
            value={toAmount}
          />
  
            <div
             className="select-currency absolute top-3 right-3 w-[112px] flex items-center pr-6 pl-2 rounded-lg h-[45px] bg-[#E6EFF8]">
            <div
              className="ant-select-selector flex items-center cursor-pointer rounded-lg"
              id="to-token-selector"
              onClick={() => setOpenedList(openedList === "to" ? null : "to")}
            >
              <img
                id="to-token-icon"
                src={toToken.icon}
                style={{ width: "24px", height: "24px", marginRight: "4px" }}
                alt={toToken.label}
              />
              <span
                id="to-token-text"
                className="text-black min-w-[40px] font-bold text-center text-opacity-70"
              >
                {toToken.label}
              </span>
              <svg
                  className={`w-5 h-5 absolute right-1.5 top-1/2 -translate-y-1/2 transition-transform ${isSelectOpen ? "rotate-180" : "rotate-0"}`}
                  viewBox="0 0 20 20"
                  fill="#000"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" clipRule="evenodd" />
                </svg>
            </div>
            {openedList === "to" && (
              <div
                id="to-token-list"
                className="absolute top-full right-0 text-white rounded-lg mt-2 z-50 w-max min-w-[120px] shadow-lg"
                style={{ backgroundColor: "#262626" }}
              >
                <ul>
                  {tokens
                    .filter((token) => token.symbol !== toToken.symbol) // Показуємо лише протилежний токен
                    .map((token) => (
                      <li
                        key={token.symbol}
                        className="token-item flex items-center p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
                        onClick={() => handleToTokenSelect(token)}
                      >
                        <img
                          src={token.icon}
                          style={{
                            width: "24px",
                            height: "24px",
                            marginRight: "8px",
                          }}
                          alt={token.label}
                        />
                        <span>{token.label}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="flex flex-col justify-between items-center text-sm mb-2 mt-2"
      >
        <div className="flex justify-between flex-row items-left w-full mb-2 text-lg">
          {/* <span id="exchange-label"  className="font-bold" style={{color: "#ACACAC",}}>{t("exchangeRate")}</span> */}
          <span id="exchange-value"  className="text-black text-opacity-50 text-xs font-medium">
            {rate !== null
              ? `1 ${fromToken.symbol} = ${+rate.toFixed(8)} ${toToken.symbol}`
              : t("loadingExchange")}
          </span>
          <span id="exchange-value"  className="text-black text-opacity-50 text-xs font-medium">
            {rate !== null
              ? `+${+Math.floor(rate * Math.pow(10, 2)) / Math.pow(10, 2)}`
              : t("loadingExchange")} USDT Fee
          </span>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={connectWallet}
          className={`purchase-energy-btn font-semibold w-full py-3 bg-white-600 hover:bg-white-700 text-white rounded-lg transition-all
            ${
              isConnecting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-white-600 hover:bg-white-700"
            }`}
          disabled={isConnecting}
        >
          {isConnecting ? (
              t("loadingExchange")
          ) : (
            t("exchangeNow")
          )}
          {/* {" "} {toAmount || "0"} */}
        </button>
      </div>

    

      <div className="text-center space-y-2  pt-2 mt-2">
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

export default ExchangeSection;
