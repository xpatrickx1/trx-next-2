import React from "react";
import { Card, CardContent } from "../components/ui/card";

export const HowToUse = (): React.ReactElement => {
  const exchangeSteps = [
    {
      number: "1",
      title: "Pick a Crypto",
      description: "Choose the exchange pair",
      maxWidth: "max-w-3xs",
    },
    {
      number: "2",
      title: "Enter Wallet Address",
      description: "Provide the wallet address for us to send exchanged funds",
      maxWidth: "max-w-2xs",
    },
    {
      number: "3",
      title: "Send the Deposit",
      description: "Send in the amount of crypto needed for exchange",
      maxWidth: "max-w-2xs",
    },
    {
      number: "4",
      title: "Receive Funds",
      description: "Get exchanged cryptocurrency",
      maxWidth: "max-w-xs",
    },
  ];

  return (
    <section id="howTo" className="w-full bg-[#252525] py-20 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-[1273px]">
        <h2 className="text-center md:text-left mb-8 md:mb-12 font-bold text-2xl md:text-3xl lg:text-4xl tracking-[0] leading-tight md:leading-[59.1px]">
          <span className="text-[#ffffff]">How to use </span>
          <span className="text-[#4491fb]">TRX Exchanger</span>
        </h2>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-[45px] w-full">
            {exchangeSteps.map((step, index) => (
              <Card
                key={index}
                className={`relative flex flex-col h-auto min-h-[153px] items-start px-4 md:px-6 lg:px-[30px] py-4 md:py-6 bg-[#373737] rounded-2xl border border-solid border-[#2e77da] transition-all duration-300 hover:shadow-lg hover:border-[#4491fb] group lg:${step.maxWidth} `}
              >
                <CardContent className="p-0 w-full">
                  <div className="absolute -top-6 lg:-right-[25px] w-12 h-12 md:w-[50px] md:h-[50px] bg-[#2e77da] rounded-2xl border-2 border-solid border-[#373737] flex items-center justify-center shadow-lg group-hover:bg-[#4491fb] transition-colors duration-300">
                    <span className="font-bold text-white text-xl md:text-[28px] tracking-[0] leading-none">
                      {step.number}
                    </span>
                  </div>

                  <div className="pt-2">
                    <div className="font-bold text-white text-lg md:text-xl lg:text-lg tracking-[0] leading-tight md:leading-[59.1px] mb-3 md:mb-4 text-center md:text-left">
                      {step.title}
                    </div>

                    <div className="opacity-70 font-normal text-white text-sm md:text-base tracking-[0] leading-tight md:leading-[22px] text-center md:text-left">
                      {step.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
