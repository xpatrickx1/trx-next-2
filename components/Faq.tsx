import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type FaqItem = {
  question: string;
  answer: string;
};

export const Faq = (): React.ReactElement => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const { t } = useTranslation();
  const faqItems = t("faq", { returnObjects: true }) as FaqItem[];

  const toggle = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="faq" className="w-full mx-auto py-12 px-4 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none ">
        <div className="[-webkit-text-stroke:3px_#ffffff] [font-family:'Public_Sans',Helvetica] font-black text-transparent text-[200px] md:text-[400px] lg:text-[600px] xl:text-[818.7px] text-center tracking-[8.19px] leading-none whitespace-nowrap opacity-50">
          FAQ
        </div>
      </div>
      <div className="container mx-auto relative z-10 ">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#252525]">FAQ</h2>
        <div className="space-y-3 max-w-[842px] mx-auto">
          {faqItems.map((item, idx) => {
            const isOpen = openIndexes.includes(idx);
            return (
              <div
                key={idx}
                className={`border rounded-2xl bg-white overflow-hidden shadow-sm ${
                  isOpen ? 'border-[#2e77da]' : ''
                }`}
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-7 text-left focus:outline-none select-none"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-xl text-[#252525]">{item.question}</span>
                  <span
                    className={`ml-4 transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                  >
                    <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.0184 6.66934L2.44856 0.367431L0.325472 2.57995L9.01823 10.893L17.6895 2.57995L15.5664 0.367432L9.0184 6.66934Z" fill="black"/>
                    </svg>
                  </span>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out px-6 ${
                    isOpen ? "max-h-40 opacity-100 pb-10" : "max-h-0  py-0"
                  } overflow-hidden`}
                >
                  <div className="text-[#252525] text-base opacity-80">
                    {item.answer}
                    </div>
                </div>
          </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
