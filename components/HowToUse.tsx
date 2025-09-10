import React from "react";
import { useTranslation } from "react-i18next";

type ExchangeItem = {
  title: string;
  description: string;
};

export default function HowToUse () {
  const { t } = useTranslation();
  const steps = t("exchangeSteps", { returnObjects: true }) as ExchangeItem[];
  const exchangeSteps = steps.map((step, index) => ({
    number: (index + 1).toString(),
    title: step.title,
    description: step.description,
    maxWidth: ["max-w-3xs", "max-w-2xs", "max-w-2xs", "max-w-xs"][index],
  }));

  return (
    <section id="howTo" className="relative mx-auto xl:mx-auto md:mx-3 max-w-7xl md:mt-4 md:rounded-lg pt-8 sm:pt-12 pb-12 sm:pb-20 backdrop-blur-[14.2px] backdrop-brightness-[100%] bg-[radial-gradient(51.86%_173.38%_at_97%_5.83%,rgba(25,163,255,0.6)_14.9%,rgba(0,0,0,0.6)_52.88%)] relative">

      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl max-w-[637px] mx-auto font-normal text-center mb-14 text-[#ffffff]">
          <span className="text-[#ffffff]">{t("section_title_how_to_1")}</span>
        </h2>
        
        <div className="flex justify-center max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between w-full gap-12 sm:gap-6">
            {exchangeSteps.map((step, index) => (
              <div key={index} className="relative w-full items-center lg:w-[280.37px] h-auto lg:h-[255.13px] flex flex-col lg:block">
                <div className="w-full max-w-[284px] h-auto lg:h-[132px] flex flex-col lg:block gap-4 lg:gap-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[50px]  lg:h-[50px] mx-auto sm:mx-0 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300 mb-4 lg:mb-0">
                    <span className="font-bold text-[78.7px] tracking-[0] leading-[normal] 
                                    text-transparent bg-gradient-to-r from-[#006AFA] to-[#19A3FF] 
                                    bg-clip-text [-webkit-background-clip:text]">
                      {step.number}
                    </span>
                  </div>

                  <div className="pt-0 lg:pt-2">
                    <div className="font-bold mt-0 lg:mt-4 text-white text-md sm:text-base tracking-[0] leading-tight lg:leading-[24px] mb-3 lg:mb-4 text-center lg:text-left">
                      {step.title}
                    </div>

                    <div className="opacity-70 text-sm text-white tracking-[0] leading-tight lg:leading-[22px] text-center lg:text-left">
                      {step.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
        <a href="#staking"
              className="relative mb-6 sm:mb-10 max-w-[296px] purchase-energy-btn text-sm sm:text-base lg:text-[19px] mt-14 sm:mt-16 lg:mt-20 w-full sm:max-w-[283px] rounded-[5px] sm:max-h-[60px] mx-auto py-3 sm:py-6 transition-all flex justify-center items-center"
          >
            {t("start_staking")}
            <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(103.92deg, #058AAF  25.12%, #004663 79.05%)",
                    borderRadius: "5px", 
                    padding: "1px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                ></div>
          </a>
      </div>
      
    </section>
  );
};
