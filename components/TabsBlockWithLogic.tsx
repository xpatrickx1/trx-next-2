import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
type TabsBlockWithLogicProps = {
  energySection: React.ReactNode;
  exchangeSection: React.ReactNode;
};

const TabsBlockWithLogic: React.FC<TabsBlockWithLogicProps> = ({
  stakeSection,
  unstakeSection,
}) => {
  const [selectedTab, setSelectedTab] = useState<"energy" | "exchange">(
    "exchange"
  ); // По дефолту exchange!
  const [fromAmount, setFromAmount] = useState<string>("");
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });

  const tabsRef = useRef<HTMLDivElement | null>(null);
  const energyBtnRef = useRef<HTMLButtonElement | null>(null);
  const exchangeBtnRef = useRef<HTMLButtonElement | null>(null);
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
    let raf = 0;
  
    const recalc = () => {
      const activeEl =
        selectedTab === "exchange" ? exchangeBtnRef.current : energyBtnRef.current;
  
      const trackEl = tabsRef.current;
      if (!activeEl || !trackEl) return; 
  
      const btnRect = activeEl.getBoundingClientRect();
      const trackRect = trackEl.getBoundingClientRect();
  
      if (btnRect.width > 0 && trackRect.width > 0) {
        setSliderStyle({
          width: btnRect.width,
          left: btnRect.left - trackRect.left, // позиція відносно треку
        });
      }
    };
  
    const update = () => {
      // дочекатися, поки DOM стабілізується
      raf = requestAnimationFrame(recalc);
    };
  
    setTimeout(update, 0);
    window.addEventListener("resize", update);
  
    return () => {
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
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
    <div className="w-full">
      <div ref={tabsRef} className="flex relative mb-4 gap-x-4 w-full border-b px-8 md:px-12 border-b-[#FFFFFF1A]">
        <button
          ref={exchangeBtnRef}
          id="exchange-btn"
          className={`py-4 text-sm md:text-lg font-normal transition-all text-white px-2 duration-200  ${
            selectedTab === "exchange" ? "text-white font-bold" : "opacity-70"
          } focus:outline-none`}
          
          onClick={() => setSelectedTab("exchange")}
        >
          {t("flashExchange")}
        </button>
        <button
          ref={energyBtnRef}
          id="energy-btn"
          className={`py-4 text-sm md:text-lg font-normal transition-all text-white px-2 duration-200  ${
            selectedTab === "energy" ? "text-white font-bold" : "opacity-70"
          } focus:outline-none`}
          onClick={() => setSelectedTab("energy")}
        >
          {t("buyEnergy")}
        </button>
        <div
          className="slied-line absolute bottom-0 h-1 bg-[#189FFA] transition-all duration-300"
          style={{ width: sliderStyle.width, left: sliderStyle.left }}
        />
      </div>

      {/* Секции */}
      <div className="w-full" 
      style={{
        width: '100%',
        backgroundColor: 'transparent',
        borderRadius: '0.75rem',
        // backdropFilter: 'blur(42px) brightness(100%)',
        border: 'none',
        marginTop: '21px',
        marginBottom: '0',
        overflow: 'hidden',
      }}>
        <div
          id="energy-section"
          className={selectedTab === "energy" ? "" : "hidden"}
        >
          {unstakeSection}
        </div>
        <div
          id="exchange-section"
          className={selectedTab === "exchange" ? "" : "hidden"}
        >
          {stakeSection}
        </div>
      </div>
    </div>
  );
};

export default TabsBlockWithLogic;
