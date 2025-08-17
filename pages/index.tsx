import Head from "next/head";

import dynamic from "next/dynamic";
// pages/index.tsx
const ExchangeForm = dynamic(() => import("../components/ExchangeForm"), {
  ssr: false,
});

export default function Home() {

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width, initial-scale=1.0"
        />
        <title data-i18n="pageTitle">
          USDT to TRX Conversion &amp; TRON Energy Purchase | Fast,
          Secure, Reliable
        </title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css"
          
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/tronweb@4.4.0/dist/TronWeb.min.js"></script>
      </Head>
      <ExchangeForm />
    </>
  );
}
