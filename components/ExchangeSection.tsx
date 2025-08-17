import React, { useEffect, useState } from "react";
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
    if (token.symbol === toToken.symbol) setToToken(fromToken);
    setFromToken(token);
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
    setRotation((prev) => prev + 360);
  };

  // --- Новый useEffect для закрытия при клике вне списка ---
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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
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
      <div className="mb-4 relative">
        <label className="block mb-1 font-normal text-white opacity-60 uppercase" style={{ paddingLeft: "0.7rem" }}>
          {t("payLabel")}
        </label>
        <div className="input-group relative">
          <input
            id="from-amount"
            type="text"
            autoComplete="off"
            placeholder={t("inputAmountPlaceholder")}
            className="w-full pr-24 py-3 h-11 rounded-lg bg-black text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#007fe9]"
            style={{ paddingLeft: "1.5rem" }}
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value.replace(",", "."))}
          />
          <div
            className="select-currency absolute top-1 right-0 flex items-center pr-4 rounded-lg"
            style={{ height: "90%" }}
          >
            <div
              className="ant-select-selector flex items-center cursor-pointer"
              id="from-token-selector"
              onClick={() =>
                setOpenedList(openedList === "from" ? null : "from")
              }
            >
              <span
                id="from-token-text "
                className="text-white min-w-[40px] text-center text-opacity-70"
              >
                {fromToken.label}
              </span>
              <i className="i-ant-design:down-outlined ml-2"></i>
              <img
                id="from-token-icon"
                src={fromToken.icon}
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
                alt=""
              />
            </div>
            {openedList === "from" && (
              <div
                id="from-token-list"
                className="absolute top-full right-0 text-white rounded-lg mt-2 z-50 w-max min-w-[120px] shadow-lg"
                style={{ backgroundColor: "#142546" }}
              >
                <ul>
                  {tokens.map((token) => (
                    <li
                      key={token.symbol}
                      className={`token-item flex items-center p-2 hover:bg-gray-700 cursor-pointer
                      ${
                        token.symbol === fromToken.symbol
                          ? "opacity-60 pointer-events-none"
                          : ""
                      }
                      ${
                        token.symbol === toToken.symbol
                          ? "opacity-60 pointer-events-none"
                          : ""
                      }
                    `}
                      onClick={() => handleFromTokenSelect(token)}
                    >
                      <img
                        src={token.icon}
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: "8px",
                        }}
                        alt=""
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
          className="switch-currency-button text-white hover:text-blue-400 transition focus:outline-none"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <i
            className="i-local:reverse-currency?mask"
            style={{ width: "31px", height: "31px" }}
          ></i>
        </button>
      </div>

      <div className="mb-4 relative -mt-5">
        <label className="block mb-1 font-normal text-white opacity-60 uppercase" style={{ paddingLeft: "0.7rem" }}>
          {t("receiveLabel")}
        </label>
        <div className="input-group relative">
          <input
            id="to-amount"
            type="text"
            autoComplete="off"
            placeholder={t("outputAmountPlaceholder")}
            className="w-full pr-24 py-3 h-11 rounded-lg bg-black text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#007fe9]"
            style={{ paddingLeft: "1.5rem" }}
            readOnly
            value={toAmount}
          />
          <div
            className="select-currency absolute top-1 right-0 flex items-center pr-4 rounded-lg z-20"
            style={{ height: "90%" }}
          >
            <div
              className="ant-select-selector flex items-center cursor-pointer"
              id="to-token-selector"
              onClick={() => setOpenedList(openedList === "to" ? null : "to")}
            >
              <span
                id="to-token-text"
                className="text-white min-w-[40px] text-center text-opacity-70"
              >
                {toToken.label}
              </span>
              <i className="i-ant-design:down-outlined ml-2"></i>
              <img
                id="to-token-icon"
                src={toToken.icon}
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
                alt=""
              />

            </div>
            {openedList === "to" && (
              <div
                id="to-token-list"
                className="absolute top-full right-0 text-white rounded-lg mt-2 z-50 w-max min-w-[120px] shadow-lg"
                style={{ backgroundColor: "#142546" }}
              >
                <ul>
                  {tokens.map((token) => (
                    <li
                      key={token.symbol}
                      className={`token-item flex items-center p-2 hover:bg-gray-700 cursor-pointer
                      ${
                        token.symbol === toToken.symbol
                          ? "opacity-60 pointer-events-none"
                          : ""
                      }
                      ${
                        token.symbol === fromToken.symbol
                          ? "opacity-60 pointer-events-none"
                          : ""
                      }
                    `}
                      onClick={() => handleToTokenSelect(token)}
                    >
                      <img
                        src={token.icon}
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: "8px",
                        }}
                        alt=""
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

      <div className="mt-[27px] mb-[44px]">
      <button
        className="flex items-center justify-between w-full mx-8 my-4 mt-5"
        onClick={toggle}
        style={{
          maxWidth: "270px",
        }}
      >
        <div className="opacity-60 font-normal text-white text-sm"
        >
          {t("show_receiver_address")}
        </div>
        <div className="w-[14.28px] h-[14.28px] transition-transform duration-300">
          <img
            className={`w-3.5 h-2 transform transition-transform duration-300 ${
              isOpenAddress ? "rotate-180" : ""
            }`}
            alt="Toggle arrow"
            src="/icons/down.svg"
          />
        </div>
      </button>

      <div
        className={`transition-all duration-500 overflow-hidden ${
          isOpenAddress ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
          <input
              type="text"
              autoComplete="off"
              placeholder={t("pre_receiver_address")}
              className="w-full pr-24 py-3 h-11 rounded-lg bg-black text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#007fe9] "
              style={{ paddingLeft: "1.5rem" }}
          />
      </div>
    </div>



      <div className="flex justify-center mt-6">
        <button
          onClick={connectWallet}
          className={`purchase-energy-btn font-bold w-full py-3 bg-white-600 hover:bg-white-700 text-black text-white rounded-lg transition-all
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
          {" "} {toAmount || "0"}
        </button>
      </div>

      <div
        className="flex flex-col justify-between items-center text-sm mb-2 mt-10"
        style={{
          padding: "8px 16px",
          borderRadius: "8px",
        }}
      >
        <div className="flex justify-between flex-col items-center w-full mb-2 text-lg">
          <span id="exchange-label"  className="font-bold" style={{color: "#ACACAC",}}>{t("exchangeRate")}</span>
          <span id="exchange-value"  className="text-white font-bold">
            {rate !== null
              ? `1 ${fromToken.symbol} ≈ ${+rate.toFixed(8)} ${toToken.symbol}`
              : t("loadingExchange")}
          </span>
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

export default ExchangeSection;
