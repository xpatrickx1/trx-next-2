// pages/thank-you.js
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import LanguageHeader from "../components/LanguageHeader";
import { useTheme } from '../components/ThemeContext';

const gradientImages = [
  { top: '-420px', left: '-438px', rotate: '0deg', z: '-z-10', scale: 1.5 },
  { top: '260px', right: '-430px', rotate: '-20deg', scale: 1.5 },
];

export default function ThankYou() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const gradientSrc =
    theme === 'red' ? '/icons/bgGradient.png' : '/icons/bgGradientGreen.svg';

  const heading = t("thankYou.heading", "Thank you for your submission!");
  const [firstTwoWords, ...rest] = heading.split(" ");
  const firstPart = firstTwoWords + " " + rest.shift();
  const remainingText = rest.join(" ");

  return (
    <>
      <Head>
        <title>{t("thankYou.title", "Thank You")}</title>
      </Head>
      <div className="main-wrapper overflow-hidden relative h-screen">
        <LanguageHeader/>
        <div className="flex flex-row justify-center content-center h-full  w-full px-4" style={{maxWidth: "425px", margin: "0 auto",}}>
      
          <div className="w-full rounded-xl bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg mb-3 p-8" style={{height: "fit-content", margin: "auto "}}>
            <h1 className="text-3xl text-center font-bold mb-4"> <span className={`${
                theme === 'green' ? 'text-theme-green' : 'text-theme-primary'
              }`}>{firstPart}</span> {remainingText}</h1>
            <p className="mb-6 text-center opacity-60 max-w-md">
              {t("thankYou.description", "We have received your request and will get back to you shortly.")}
            </p>
            <Link href="/" className="bg-white text-black font-bold mt-5 py-2 px-4 rounded hover:bg-gray-200 block" style={{margin: "0 auto", width: "fit-content",}}>
              {t("thankYou.back", "Back to Home")}
            </Link>
          </div>
        </div>
     
      <div className="absolute inset-0" style={{maxWidth: "425px", margin: "0 auto", zIndex: "-1"}}>
      {gradientImages.map((pos, index) => (
        <div
        key={index}
        className="absolute w-[730px] h-[790px]"
        style={{
          top: `${pos.top}`, 
            left: `${pos.left}`, 
            right: `${pos.right}`, 
            zIndex: `${pos.z}`, 
            transform: `rotate(${pos.rotate})`,
        }}
      >
        <img
          key={index}
          src={gradientSrc}
          alt={`Gradient ${index}`}
          style={{ 
            width: "730px", 
            height: "790px", 
            }}
          className="w-full h-full bg-spin"
        />
        </div>
      ))}
    </div>
    </div>
    </>
  );
}
