import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import LanguageHeader from "../components/LanguageHeader";
import { Footer } from "../components/Footer";

export default function ThankYou() {
  const { t } = useTranslation();
  const heading = t("thankYou.heading", "Thank you for your submission!");
  const [firstTwoWords, ...rest] = heading.split(" ");
  const firstPart = firstTwoWords + " " + rest.shift();
  const remainingText = rest.join(" ");

  return (
    <>
      <Head>
        <title>{t("thankYou.title", "Thank You")}</title>
      </Head>
      <div className="main-wrapper overflow-hidden relative min-h-screen flex flex-col">
        <LanguageHeader/>
        <div className="flex-1 flex flex-col justify-center items-center py-8">
          <div className="lg:w-[50%] flex flex-col justify-between max-w-full py-16 px-8 md:px-12 md:rounded-lg backdrop-blur-[7px] backdrop-brightness-[100%] bg-[linear-gradient(27deg,rgba(0,0,0,0.6)_32%,rgba(25,163,255,0.6)_100%)]">
            <div className="mx-auto flex flex-col gap-4 sm:gap-5 lg:gap-6 ">
                <h1 className="text-3xl text-white text-center font-bold mb-4"> <span className="text-[#2f78d9]">{firstPart}</span> {remainingText}</h1>
                <p className="mb-6 text-white mx-auto text-center opacity-60 max-w-md">
                  {t("thankYou.description", "We have received your request and will get back to you shortly.")}
                </p>
                <Link href="/" className="max-w-[623px] mx-auto purchase-energy-btn w-full p-3  text-[16px]  rounded-md transition-all flex justify-center items-center" style={{margin: "0 auto", width: "fit-content",}}>
                  {t("thankYou.back", "Back to Home")}
                </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}