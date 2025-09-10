import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

type FaqItem = {
  question: string;
  answer: string;
};

export default function Faq () {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const { t, i18n } = useTranslation();
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  
  useEffect(() => {
    const items = t("faq", { returnObjects: true }) as FaqItem[] || [];
    setFaqItems(items);
  }, [t, i18n.language]);

  const toggle = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="faq" className="xl:mx-auto md:mx-3 max-w-7xl md:rounded-lg">
      <div className="mx-auto max-w-7xl mx-4 md:rounded-lg pt-12 bp-18 sm:pb-20 backdrop-blur-[7px] backdrop-brightness-[100%] bg-transparent sm:[background:linear-gradient(62.12deg,rgba(0,0,0,0.7)_49.21%,rgba(25,163,255,0.7)_126.89%)]">
        <div className="container mx-auto relative z-10 pb-10 px-8">
          <h2 className="text-xl sm:text-3xl font-normal text-center mb-8 text-[#ffffff]">
            {t("faq_title") || "Staking FAQs"}
          </h2>
          <div className="faq-list relative z-[3] space-y-3 max-w-[842px] mx-auto">
            {
              faqItems.map((item, idx) => {
              const isOpen = openIndexes.includes(idx);
              return (
                <div
                  key={idx}
                  className={` rounded-2xl backdrop-blur-[10px] overflow-hidden shadow-sm ${
                    isOpen ? "bg-black/60" : "bg-black/50"
                  }`}
                >
                  <button
                    className="w-full flex justify-between items-center bg-black/50  px-6 md:px-10 py-8 text-left focus:outline-none select-none"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                  >
                    <span 
                      className="relative self-stretch font-normal text-[#565656]  text-sm sm:text-[21px] leading-6">
                        {item.question}
                    </span>
                    <span
                      className={`ml-4 transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    >
                      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0184 6.975L2.44856 0.673095L0.325472 2.88561L9.01823 11.1986L17.6895 2.88561L15.5664 0.673096L9.0184 6.975Z" fill="#FFF7F7"/>
                      </svg>

                    </span>
                  </button>
                  <div
                    className={`px-6 md:px-10 transition-all bg-black/50 duration-500 ease-in-out px-6 ${
                      isOpen ? "max-h-40 opacity-100 pb-10" : "max-h-0  py-0"
                    } overflow-hidden`}
                  >
                    <div className="text-white text-sm sm:text-base">
                      {item.answer}
                      </div>
                  </div>
                </div>
              );
            })
          }
          </div>
        </div>
      </div>
    </section>
  );
};
