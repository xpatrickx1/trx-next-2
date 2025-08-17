import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// В компоненте:

const NOTICE_KEY = "noticeBannerHidden";

export const NoticeBanner: React.FC = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isHidden = localStorage.getItem(NOTICE_KEY) === "true";
      setHidden(isHidden);
    }
  }, []);

  const handleHide = () => {
    setHidden(true);
    localStorage.setItem(NOTICE_KEY, "true");
  };

  if (hidden) return null;

  return (
    <section className="gradient-border mb-4" id="notice-banner">
      <div
        className="rounded-lg p-4 relative overflow-hidden"
        style={{ backgroundColor: "#1f1f1f" }}
      >
        <div className="light-sweep-blue"></div>
        <div className="stepsContainer">
          <h2> {t("onestep")}</h2>

          <div className="step">
            <div className="stepContent">
              <div className="title">⚡ {t("twostep")}</div>
              <div className="text">{t("fourstep")}</div>
            </div>
          </div>

          <div className="step">
            <div className="stepContent">
              <div className="title">⚡ {t("threestep")}</div>
              <div className="text">{t("fivestep")}</div>
            </div>
          </div>

          <div className="walletBox">
            <div className="walletIcons">
              <img src="/icons/wallet1.svg" alt="wallet1" width="24" />
              <img src="/icons/wallet2.svg" alt="wallet2" width="24" />
              <img src="/icons/wallet3.svg" alt="wallet3" width="24" />
              <img src="/icons/wallet4.svg" alt="wallet4" width="24" />
              <span style={{ fontSize: "12px" }}>
                {t("wallets_available")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeBanner;
