import { WalletConnectAdapter } from "@tronweb3/tronwallet-adapter-walletconnect";



let adapter: WalletConnectAdapter | null = null;

export const getWalletAdapter = () => {
    return adapter;
};