import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
type TabsBlockWithLogicProps = {
  energySection: React.ReactNode;
  exchangeSection: React.ReactNode;
};

const TabsBlockWithLogic: React.FC<TabsBlockWithLogicProps> = ({
  energySection,
  exchangeSection,
}) => {
  const [selectedTab, setSelectedTab] = useState<"energy" | "exchange">(
    "exchange"
  ); // По дефолту exchange!
  const [fromAmount, setFromAmount] = useState<string>("");
  const [walletConnected, setWalletConnected] = useState<boolean>(false);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  // --- Только один useEffect для инициализации selectedTab ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    // 1. UTM
    const utm = params.get("open");
    if (utm === "exchange" || utm === "energy") {
      setSelectedTab(utm);
      localStorage.setItem("selectedTab", utm);
      return;
    }

    // 2. tab из query
    const tab = params.get("tab");
    if (tab === "exchange" || tab === "energy") {
      setSelectedTab(tab);
      localStorage.setItem("selectedTab", tab);
      return;
    }

    // 3. localStorage
    const saved = localStorage.getItem("selectedTab");
    if (saved === "exchange" || saved === "energy") {
      setSelectedTab(saved);
      return;
    }

    // 4. по дефолту "exchange"
    setSelectedTab("exchange");
    localStorage.setItem("selectedTab", "exchange");
  }, []);

  // Сохраняем таб в localStorage при изменении
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTab", selectedTab);
    }
  }, [selectedTab]);

  // Слайдер под активной вкладкой
  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.style.transform =
      selectedTab === "exchange" ? "translateX(0)" : "translateX(100%)";
  }, [selectedTab]);

  // WalletConnected пример (логика под себя)
  useEffect(() => {
    setWalletConnected(false);
  }, []);

  // Авто wallet prompt (если надо)
  useEffect(() => {
    let autoWalletInterval: NodeJS.Timeout | null = null;
    if (!walletConnected) {
      autoWalletInterval = setInterval(() => {
        // Здесь твоя логика
      }, 8000);
    }
    return () => {
      if (autoWalletInterval) clearInterval(autoWalletInterval);
    };
  }, [walletConnected]);

  const handleWalletBtnClick = useCallback((walletName: string) => {
    // твоя логика
  }, []);
  // ДЛЯ ИНТЕГРАЦИИ: energySection/exchangeSection — это твои реакт-компоненты/разметка секций
  return (
    <div>
      <div className="flex relative mb-4 gap-x-4">
        <button
          id="exchange-btn"
          style={selectedTab !== "exchange" ? { backgroundColor: "#191919", color: "rgba(255, 255, 255, 0.5)" } : {}}
          className={`uppercase text-xl rounded-3xl text-white border border-solid border-transparent px-6 py-2.5 font-medium  ${
            selectedTab === "exchange" ? "text-white opacity-100 bg-transparent border-white" : ""
          } focus:outline-none`}
          
          onClick={() => setSelectedTab("exchange")}
        >
          {t("flashExchange")}
        </button>
        <button
          id="energy-btn"
          style={selectedTab !== "energy" ? { backgroundColor: "#191919", color: "rgba(255, 255, 255, 0.5)" } : {}}
          className={`w-3/5 uppercase py-2 rounded-3xl text-xl font-medium transition-all duration-200 text-white border border-solid border-transparent ${
            selectedTab === "energy" ? "text-white opacity-100 bg-transparent border-white" : ""
          } focus:outline-none`}
          onClick={() => setSelectedTab("energy")}
        >
          {t("buyEnergy")}
        </button>
      </div>

      {/* Секции */}
      <div className=" rounded-lg p-8" 
      style={{
        width: '100%',
        backgroundColor: '#0000004c',
        borderRadius: '0.75rem',
        backdropFilter: 'blur(42px) brightness(100%)',
        border: 'none',
        marginTop: '12px',
        marginBottom: '12px',
        overflow: 'hidden',
      }}>
        <div
          id="energy-section"
          className={selectedTab === "energy" ? "" : "hidden"}
        >
          {energySection}
        </div>
        <div
          id="exchange-section"
          className={selectedTab === "exchange" ? "" : "hidden"}
        >
          {exchangeSection}
        </div>
      </div>
    </div>
  );
};

export default TabsBlockWithLogic;
