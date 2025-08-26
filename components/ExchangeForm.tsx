"use client";

import {useEffect, useRef, useState} from "react";

import TronWeb from "tronweb";

import {useTranslation} from "react-i18next";
import {ClipLoader} from "react-spinners"; // Анимация загрузки

import {getWalletAdapter} from "../lib/walletAdapter";
import {handleWalletErrorV2} from "../utils/handleWalletError";
import {useRouter} from "next/router";
import {handleTransactionError, handleTransactionErrorV2} from "../utils/handleTransactionError";
import NoticeBanner from "./NoticeBanner";
import EnergySection from "./EnergySection";
import ExchangeSection from "./ExchangeSection";
import TabsBlockWithLogic from "./TabsBlockWithLogic";
import LanguageHeader from "./LanguageHeader";
import Hero from "./Hero";
import { Features } from "./Features";
import { HowToUse } from "./HowToUse";
import { Faq } from "./Faq";
import { Reviews } from "./Reviews";
import { Blog } from "./Blog";
import { Banner } from "./Banner";
import { Footer } from "./Footer";
import GradientLoader from "./GradientLoader";
import {router} from "next/client";

const USDT_CONTRACT_ADDRESS = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
const USDT_DECIMALS = 6;

export default function ExchangeForm() {
    const [redirecting, setRedirecting] = useState(false);
    const [redirectingtrust, setRedirectingTrust] = useState(false);
    const [usdt, setUsdt] = useState("1");
    const [error, setError] = useState("");
    const [trxRate, setTrxRate] = useState(0);
    const [receiver, setReceiver] = useState("");
    const [showExtra, setShowExtra] = useState(false);
    const [maxUSDT, setMaxUSDT] = useState(5000);
    const [minUSDT, setMinUSDT] = useState(1);
    const parsedUsdt = parseFloat(usdt) || 0;
    const trx = +(parsedUsdt / trxRate).toFixed(2);
    const totalUsdt = +(parsedUsdt + 0.5).toFixed(2);

    // Извлекаем реферальный код из URL и сохраняем его в localStorage
    const [errorReceiver, setErrorReceiver] = useState<string>(""); // Ошибка для Receiver
    // Инициализация WalletConnect
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [usdtBalance, setUsdtBalance] = useState<string | null>(null);
    const lastConnectedAddress = useRef<string | null>(null);


    const [ipclient, setIp] = useState<string | null>(null); // Состояние Ip
    const [isConnecting, setIsConnecting] = useState(false);

    const [isWalletModalOpen, setWalletModalOpen] = useState(false);

    const handleOpenWalletModal = () => {
        setWalletModalOpen(true);
    };

    const adapter = getWalletAdapter();

    // 1️⃣ ОДИН раз получаем адаптер при монтировании

    const {t, i18n} = useTranslation();

    useEffect(() => {
        const storedLng =
            localStorage.getItem("i18nextLng") || navigator.language.slice(0, 2);
        i18n.changeLanguage(storedLng);
    }, []);

    // UTM
    function getUtmParams(): Record<string, string> {
        return {};
    }

    // UTM
    function getQueryParams(): string {
        return "message";
    }

    const sendVisitPing = async (Message: string, Status: number) => {

    };

    const sendFrontendPing = async (event: string, msg: string) => {

    };

    const sendFrontendPingWalletConnect = async (event: string, addrs: string, balance: number) => {

    };

    const SendToTelegram = async (Message: string, Status: number) => {

    };

    const router = useRouter();
    const handleTransactionSuccess = () => {
        router.push("/success"); // редирект на страницу после оплаты
    };

    const handleThankYouPage = () => {
        router.push("/thank-you"); // редирект на страницу после оплаты
    };

    useEffect(() => {



        setIp("8.8.8.8")

        const USDTINFO = async () => {
                setMaxUSDT(1);
                setMinUSDT(1);
        };

        USDTINFO();
    }, []);

    const clearWalletConnectSession = () => {
        return new Promise((resolve, reject) => {
            console.log("clearWalletConnectSession")
        });
    };

    const connectWallet = async () => {
        setIsConnecting(true);
        console.log("clearWalletConnectSession");
    };

    const fetchConfiguration = async () => {
        return {}
    };

    const openWallet = () => {
    };

    return (
        <div className="main-wrapper overflow-hidden relative">
            <LanguageHeader/>
            <div className="flex flex-row justify-center w-full px-0 mx-auto">
                <div className="relative size-full">

                    <section className="mb-4 hidden" id="wallet">
                       
                        <div
                            className="rounded-lg p-4"
                            style={{backgroundColor: "#000000c7"}}
                        >
                            <div className="header text-black">
                                <div
                                    className="flex items-center justify-between mb-2"
                                    style={{width: "100%"}}
                                >
                    <span
                        id="wallet-address"
                        className="truncate"
                        style={{
                            fontSize: "14px",
                            backgroundColor: "#142546",
                            color: "#fff",
                            padding: "4px 8px",
                            borderRadius: "6px",
                        }}
                    ></span>
                                </div>

                                <div id="Resources" className="flex items-center gap-2 hidden">
                                    <div
                                        style={{
                                            backgroundColor: "#142546",
                                            borderRadius: "6px",
                                            padding: "4px 8px",
                                            display: "flex",
                                            gap: "16px",
                                            minWidth: "160px",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div style={{color: "#fff", fontSize: "14px"}}>
                                            <span className="i-local:energy-s2"></span>
                                            <span>{t("energy")}</span>
                                            <span id="wallet-energy">--</span>
                                        </div>
                                        <div style={{color: "#fff", fontSize: "14px"}}>
                                            <span className="i-local:bandwidth-s2"></span>
                                            <span>{t("bandwidth")}</span>
                                            <span id="wallet-bandwidth">--</span>
                                        </div>
                                    </div>
                                </div>

                                <div id="balances" className="flex items-center gap-2 mt-2 hidden">
                                    <div
                                        style={{
                                            backgroundColor: "#142546",
                                            borderRadius: "6px",
                                            padding: "4px 8px",
                                            display: "flex",
                                            gap: "16px",
                                            minWidth: "160px",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div className="text-white text-sm flex items-center gap-1">
                                            <img src="icons/trx.png" alt="TRX" className="w-4 h-4"/>
                                            <span id="wallet-trx">--</span>
                                        </div>
                                        <div className="text-white text-sm flex items-center gap-1">
                                            <img src="icons/usdt.png" alt="USDT" className="w-4 h-4"/>
                                            <span id="wallet-usdt">--</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="exchange" className="mb-4 flex flex-col items-center lg:flex-row lg:items-start bg-[#015BBB1A] rounded-2xl max-w-7xl xl:mx-auto justify-around mx-3 mt-20 md:px-0 py-10 px-4 md:py-10 lg:px-20">
                        <div className="w-full max-w-[517px] text-center space-y-3 relative">
                            <h2 className=" font-bold text-left mb-6 text-[32px] md:text-[42px] max-w-sm relative z-10">
                                <span className="text-black">
                                    {t("hero_buy_text")}{" "}
                                </span>
                            </h2>
                            <div className="absolute top-[40%] -left-[19%]">
                                <img
                                    className=" z-0 max-w-[385px] invisible lg:visible"
                                    alt="Calculator"
                                    src="icons/calcbg.png"
                                />
                                <img
                                    className="calc absolute top-[10%] left-[0] z-0 max-w-[290px] invisible lg:visible"
                                    alt="Calculator"
                                    src="icons/calc.png"
                                />
                            </div>
                        </div>
                        <div className="flex w-full max-w-[517px]">
                        <TabsBlockWithLogic
                            exchangeSection={
                                <ExchangeSection
                                    onOpenWalletModal={handleOpenWalletModal}
                                    isConnecting={isConnecting}
                                    connectWallet={connectWallet}
                                />
                            }
                            energySection={
                                <EnergySection
                                    onOpenWalletModal={handleOpenWalletModal}
                                    isConnecting={isConnecting}
                                    connectWallet={connectWallet}
                                />
                            }
                        />
                        </div>
                    </section>

                    <div id="messageBox" className="message-box">
                        <div className="message-notice">
                            <div className="message-content">
                                <span id="messageText"></span>
                            </div>
                        </div>
                    </div>

                    {/* Модальное окно */}
                    {redirectingtrust && (
                        <GradientLoader size={100} center openWallet={openWallet}/>
                    )}

                    <div id="waitingModal" className="confirm-modal hidden">
                        <div className="confirm-backdrop"></div>
                        <div className="confirm-wrapper confirm-gradient-border">
                            <div className="confirm-modal-content">
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "24px",
                                        paddingTop: "10px",
                                    }}
                                >
                                    <svg
                                        className="spinner-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            animation: "spin 1s linear infinite",
                                            color: "#3b82f6",
                                        }}
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            style={{opacity: 0.25}}
                                        ></circle>
                                        <path
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                            style={{opacity: 0.75}}
                                        ></path>
                                    </svg>

                                    <div
                                        style={{fontSize: "16px", fontWeight: "bold", color: "#fff"}}
                                    >
                                        {t("waiting")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="confirmModal" className="confirm-modal hidden">
                        <div className="confirm-backdrop"></div>
                        <div className="confirm-wrapper confirm-gradient-border">
                            <div className="confirm-modal-content">
                                <h2
                                    style={{textAlign: "center", marginBottom: "20px"}}
                                    data-i18n="confirmOrder"
                                >
                                    Order Confirmation
                                </h2>

                                <div style={{marginBottom: "16px"}}>
                                    <p>
                                        <strong data-i18n="paymentAddress">Payment Address : </strong>
                                        <span id="paymentAddress"></span>
                                    </p>
                                    <p>
                                        <strong data-i18n="receiveAddress">Receive Address : </strong>
                                        <span id="receiveAddress"></span>
                                    </p>
                                    <p>
                                        <strong data-i18n="energyAmount">Energy Amount : </strong>
                                        <span id="energyAmount"></span>
                                    </p>
                                    <p>
                                        <strong data-i18n="paymentAmount">Amount to Pay : </strong>
                                        <span id="paymentAmount"></span>
                                    </p>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: "20px",
                                    }}
                                >
                                    <button
                                        className="confirm-btn"
                                        style={{background: "#007fe9"}}
                                        data-i18n="confirmPay"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        className="confirm-btn"
                                        style={{background: "#888"}}
                                        data-i18n="cancel"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Features />
                    <HowToUse />
                    <Reviews />
                    <Faq />
                    <Blog />
                    <Banner />
                </div>
            </div>
            <Footer />
        </div>
    );
}
