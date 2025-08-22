import React from "react";
import { useTranslation } from "react-i18next";

type FeaturesItem = {
  text: string;
};

export const Features = (): React.ReactElement => {
  const { t } = useTranslation();

  const features = t("features", { returnObjects: true }) as FeaturesItem[];

  return (
    <div className="w-full px-6 mx-auto mt-12 md:mt-16 py-12 md:py-24 md:my-3">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 md:gap-4 group cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <img
              className="flex-[0_0_auto] max-w-[133px] md:max-w-[100px] sm:max-w-[80px] transition-transform duration-300 hover:scale-105"
              alt={`Feature ${index + 1}`}
              src={`/icons/Features${index + 1}.svg`}
            />
            <div className="flex-1 min-w-0">
              <p className="text-black text-md max-w-[190px] font-medium leading-tight opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                {feature.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
