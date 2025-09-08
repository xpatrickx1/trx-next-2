import Head from "next/head";
import dynamic from "next/dynamic";
// pages/index.tsx
  const ExchangeForm = dynamic(() => import("../components/ExchangeForm"), {
    ssr: false,
  });
  const Introduction = dynamic(() => import("../components/Introduction"), {
    ssr: false,
  });
  const Faq = dynamic(() => import("../components/Faq"), {
    ssr: false,
  });
  const HowToUse = dynamic(() => import("../components/HowToUse"), {
    ssr: false,
  });
  const Blog = dynamic(() => import("../components/Blog"), {
    ssr: false,
  });
  const Footer = dynamic(() => import("../components/Footer"), {
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

      <section className="introduction md:mx-3 xl:mx-auto z-[2] relative mx-auto max-w-7xl mx-4 md:mb-6 md:rounded-lg pt-12 pb-20 sm:px-8 backdrop-blur-[7px] backdrop-brightness-[100%] [background:radial-gradient(51.86%_173.38%_at_96.7%_5.83%,rgba(25,163,255,0.6)_14.9%,rgba(0,0,0,0.6)_52.88%)]">
          <Introduction />
          <div id="chart" style={{ width: '100%', height: '100%' }}></div>
      </section>
      <Faq />
      <HowToUse />
      <Blog />
      <Footer />
    </>
  );
}
