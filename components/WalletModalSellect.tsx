import { FC } from "react";
import { useTranslation } from "react-i18next";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className=" rounded-lg p-5 relative z-10"
        style={{ backgroundColor: "#000000c7" }}
      >
        <div className="gradient-border">
          <div className="wallet-modal-content">
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              {t("chooseWallet")}
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <a id="trust" className="wallet-item">
                <img src="icons/trust.png" alt="" />
                <span>Trust wallet</span>
              </a>
              <a id="walletconnect" className="wallet-item">
                <img src="icons/Walletconnect.png" alt="" />
                <span>Walletconnect</span>
              </a>
              <a id="tronlink" className="wallet-item" href="#" target="_blank">
                <img src="icons/tronlink.png" alt="" />
                <span>TronLink</span>
              </a>
              <a
                id="tokenpocket"
                className="wallet-item"
                href="#"
                target="_blank"
              >
                <img src="icons/tokenpocket.png" alt="" />
                <span>TokenPocket</span>
              </a>
              <a id="okx" className="wallet-item" href="#" target="_blank">
                <img src="icons/okx.png" alt="" />
                <span>OKX</span>
              </a>
              <a id="imtoken" className="wallet-item" href="#" target="_blank">
                <img src="icons/imtoken.png" alt="" />
                <span>imToken</span>
              </a>
            </div>
            <button className="wallet-close-btn mt-4" onClick={onClose}>
              <span>{t("closeButtonText")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
