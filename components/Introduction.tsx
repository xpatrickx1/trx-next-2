import React from "react";
import { useTranslation, Trans } from "react-i18next";
import Image from 'next/image';
import { Chart } from "./Chart";
import { Card, CardContent } from "./ui/card";

type FeeItem = {
  fee_left: string;
  fee_right: string;
};

export default function Introduction () {
  const { t } = useTranslation();
  const FeeItems = t("fees_list", { returnObjects: true }) as FeeItem[];

  const tokenCards = [
    {
      icon: "/icons/stusdt.svg",
      name: "stUSDT",
      address: "TThzxNRLrW...d9udCWEdZ3",
      addIcon: "/icons/addw.svg",
      copyIcon: "/icons/copy.svg",
    },
    {
      icon: "/icons/cusdt.svg",
      name: "USDT",
      address: "TR7NHqjeKQ...otSzgjLj6t",
      addIcon: "/icons/addw.svg",
      copyIcon: "/icons/copy.svg",
    },
    {
      icon: "/icons/tusd2.svg",
      name: "TUSDT",
      address: "TUpMhErZL2...okS4GjC1F4",
      addIcon: "/icons/addw.svg",
      copyIcon: "/icons/copy.svg",
    },
  ];

  const apyData = [
    { label: t("last_7_days"), value: "3.62%", color: "#18a0fb" },
    { label: t("last_30_days"), value: "4.44%", color: "#18a0fb" },
    { label: t("since_inception"), value: "3.83%", color: "#18a0fb" },
  ];
  

  return (
    <div className="flex flex-wrap md:mx-3">
      <div className="flex flex-col px-8 md:px-6 lg:px-8 lg:flex-row mx-auto w-full max-w-7xl gap-12 sm:gap-8 lg:gap-12">
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="relative mb-6 w-fit mt-[-1.00px] font-normal text-white text-md sm:text-lg tracking-[0] leading-[normal]">
              {t("introduction")}
          </div>

          <div className="flex flex-col w-full items-start gap-[25px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms] sm:[--animation-delay:1600ms]">
              <p className="relative w-full mt-[-1.00px] [font-family:'Public_Sans',Helvetica] font-light text-[#828282] text-sm sm:text-md sm:text-base tracking-[0] leading-5 sm:leading-6">
                  {t("introduction_text_1")}
              </p>

              <p className="relative w-full [font-family:'Public_Sans',Helvetica] font-light text-[#828282] text-sm sm:text-base tracking-[0] leading-5 sm:leading-6">
                  <Trans
                    i18nKey="introduction_text_2"
                    components={{
                      highlight1: <span className="text-[#19A3FF]" />,
                    }}
                  />
              </p>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/2">
          <div className="relative mb-6 w-fit mt-[-1.00px] font-normal text-white text-md sm:text-lg tracking-[0] leading-[normal]">
            {t("fees")}
          </div>
          <div className="flex flex-col w-full items-start gap-3 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1000ms] sm:[--animation-delay:2000ms]">
            {FeeItems.map((param, index) => (
              <div
                key={index}
                className="w-full bg-[#00000099] border-none border rounded-lg backdrop-blur-[7px] backdrop-brightness-[100%]"
              >
                <div className="relative flex flex-col sm:flex-row h-[64px] sm:h-[60px] items-left sm:items-center justify-between px-6 sm:px-5 py-2.5 rounded-[5px] overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(103.92deg, #004663 25.12%, #058AAF 79.05%)",
                    borderRadius: "5px", 
                    padding: "1px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                ></div>
                  <div className="relative w-fit opacity-50 [font-family:'Space_Grotesk',Helvetica] font-light text-sm sm:text-md sm:text-base text-white tracking-[0] leading-[normal]">
                    {param.fee_left}
                  </div>

                  <div className="relative w-fit font-normal text-white text-base text-md sm:text-lg tracking-[0] leading-[normal]">
                    {param.fee_right}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 items-center justify-center mt-4 sm:mt-2 font-normal text-[#1da5ff] text-md sm:text-base tracking-[0] leading-[normal] cursor-pointer hover:text-[#3ab0ff] transition-colors">
          <Image src="icons/freport.svg" width={16} height={16} alt="USDT" className="w-4 h-4"/>Finance Reports
          </div>
        </div>
      </div>

      {/* Token Cards */}
      <div className="flex flex-col px-8 md:px-8 lg:px-8 lg:flex-row mx-auto w-full my-10 items-center gap-3 sm:gap-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1200ms] sm:[--animation-delay:2200ms]">
        {tokenCards.map((token, index) => (
          <Card
            key={index}
            className="w-full sm:flex-1 rounded-[10px] bg-[#1F1F1F] sm:bg-[#14141499] border-none backdrop-blur-[7px] backdrop-brightness-[100%]"
          >
            <CardContent className="flex flex-col items-start gap-3 pl-4 sm:pl-[54px] pr-4 sm:pr-9 pt-4 sm:pt-[30px] pb-6 sm:pb-10">
              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                <Image
                  className="relative w-6 h-5"
                  alt={token.name}
                  src={token.icon}
                  width={24}
                  height={24}
                />

                <div className="inline-flex items-center gap-4 sm:gap-6 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Space_Mono',Helvetica] font-normal text-white text-sm sm:text-base tracking-[0] leading-[normal]">
                    {token.name}
                  </div>

                  <Image
                    className="relative w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity"
                    alt="Add"
                    src={token.addIcon}
                    width={24}
                    height={24}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] opacity-40 [font-family:'Space_Grotesk',Helvetica] font-light text-white text-xs sm:text-sm tracking-[0] leading-[normal] underline cursor-pointer hover:opacity-60 transition-opacity">
                  {token.address}
                </div>

                <Image
                  className="relative w-[17px] h-[17px] cursor-pointer hover:opacity-70 transition-opacity"
                  alt="Copy"
                  src={token.copyIcon}
                  width={17}
                  height={17}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* stUSDT APY */}
      <div className="flex flex-col w-full max-w-6xl mx-auto  border-t border-t-[#FFFFFF30] pt-8 sm:pt-16">
      <div className="inline-flex items-start px-4 md:px-6 lg:px-0">
        <div className="relative pl-0 sm:pl-4 pb-6 sm:pb-8 w-fit font-normal text-white text-base sm:text-lg">
          stUSDT APY
        </div>
      </div>
        <div className="flex px-0 md:px-6 lg:px-0 flex-col-reverse lg:flex-row gap-2">
          <div className="flex flex-col sm:flex-row lg:flex-col w-full lg:w-[215px] mx-auto max-w-[296px] sm:max-w-none items-start gap-3 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms] sm:[--animation-delay:1200ms]">
            {apyData.map((item, index) => (
              <div key={index} className="days-card flex flex-col items-center w-full lg:w-full rounded-[6px] bg-[#242424A3] sm:bg-black  border-none justify-center px-10 sm:px-8 lg:px-10 py-4 sm:py-6 lg:py-7">
                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative self-stretch opacity-50  font-normal text-white text-sm">
                    {item.label}
                  </div>

                  <div
                    className="relative self-stretch font-normal  text-[30px] lg:text-[34px] tracking-[0] leading-[normal]"
                    style={{
                      color: item.color,
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full pl-4 sm:pl-0 lg:flex-1">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
};
