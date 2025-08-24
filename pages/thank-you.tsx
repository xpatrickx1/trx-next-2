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
          <div className="w-full flex flex-row justify-center content-center animate-fade-in flex-wrap bg-[#015BBB1A] rounded-2xl max-w-7xl mx-auto py-6 sm:py-8 lg:py-14 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex flex-col gap-4 sm:gap-5 lg:gap-6 ">
              <div className="bg-[#ffffffe6] p-16 backdrop-blur-[7px] backdrop-brightness-[100%] border-0 rounded-2xl overflow-hidden">
                <h1 className="text-3xl text-black text-center font-bold mb-4"> <span className="text-[#2f78d9]">{firstPart}</span> {remainingText}</h1>
                <p className="mb-6 text-black text-center opacity-60 max-w-md">
                  {t("thankYou.description", "We have received your request and will get back to you shortly.")}
                </p>
                <Link href="/" className="bg-white text-black transition-all font-bold mt-5 py-2 px-4 rounded hover:bg-gray-200 block" style={{margin: "0 auto", width: "fit-content",}}>
                  {t("thankYou.back", "Back to Home")}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}