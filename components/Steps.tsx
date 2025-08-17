import { useTranslation } from "react-i18next";
import { useTheme } from '../components/ThemeContext';

const Steps = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className="w-full bg-black bg-opacity-30 rounded-xl backdrop-blur-lg mb-3 p-6 space-y-6">
      <h2 className="font-bold text-2xl text-center">
        <span className={`${
                theme === 'green' ? 'text-theme-green' : 'text-theme-primary'
              }`}>2</span>
        <span className="text-white"> {t("onestep")}</span>
      </h2>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-black rounded-full" style={{width: "45px", height: "45px",}}>
            <div className="font-normal text-white text-2xl text-center tracking-wide leading-6">
              1
            </div>
          </div>
          <div>
            <div className="font-bold text-sm leading-[25px]" style={{color: "#919191"}}>
              {t("twostep")}
            </div>
            <div className="font-bold text-white text-[17.4px] leading-[25px]">
              {t("connectWallet")}
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-black rounded-full" style={{width: "45px", height: "45px",}}>
            <div className="font-normal text-white text-2xl text-center tracking-wide leading-6">
              2
            </div>
          </div>
          <div>
            <div className="font-bold text-sm leading-[25px]" style={{color: "#919191"}}>
              {t("threestep")}
            </div>
            <div className="font-bold text-white text-[17.4px] leading-[25px] max-w-[220px]">
              {t("fivestep")}
            </div>
          </div>
        </div>
      </div>

      {/* Wallet box */}
      <div className="flex items-center justify-between bg-black rounded-xl py-4 px-4">
        <div className="text-white text-sm opacity-70">
          {t("wallets_available")}
        </div>
        <div className="flex items-center space-x-[-8px]">
          <img src="/icons/wallet2.svg" alt="wallet2" width={32} style={{marginRight: "-10px",}} />
          <img src="/icons/wallet1.svg" alt="wallet1" width={32} style={{marginRight: "-10px",}} />
          <img src="/icons/wallet3.svg" alt="wallet3" width={32} style={{marginRight: "-10px",}} />
          <img src="/icons/wallet4.svg" alt="wallet4" width={32} />
          {/* <span className="text-white text-[12px] ml-2 whitespace-nowrap">
            {t("walletHint")}
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default Steps