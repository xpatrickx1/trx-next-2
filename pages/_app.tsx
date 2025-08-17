import "../styles/style.css";
import "../lib/i18n";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
const GA_ID = process.env.NEXT_PUBLIC_GTM_ID;

import { ThemeProvider } from '../components/ThemeContext';

function MyApp({ Component, pageProps }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (
      pageProps.initialLanguage &&
      i18n.language !== pageProps.initialLanguage
    ) {
      i18n.changeLanguage(pageProps.initialLanguage);
      localStorage.setItem("i18nextLng", pageProps.initialLanguage);
    }
  }, [pageProps.initialLanguage, i18n]);

  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GA_ID}');
      `;
    document.head.appendChild(script);
  }, [router.pathname]);

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
