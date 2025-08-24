import React from "react";
import { useTranslation } from "react-i18next";

export const Banner = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <div className="w-full px-6 mx-auto py-6  bg-[#e8edff]">
      <div className="flex items-center justify-center gap-10 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
        <div
          className="flex items-center gap-3 md:gap-4 group cursor-pointer transition-all duration-300 hover:scale-105"
        >
          {/* <img
            className="flex-[0_0_auto] max-w-[133px] md:max-w-[100px] sm:max-w-[80px] transition-transform duration-300 hover:scale-105"
            alt=""
            src={`/icons/Features${index + 1}.svg`}
          /> */}
          <div className="flex-1">
            <p className="text-black flex justify-center text-xl items-center flex-wrap text-md font-medium leading-tight opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              <span className="flex-1 text-[#2e77da] min-w-0">{t("banner.percent")} </span>
              <span className="font-bold px-2">{t("banner.commission")}</span>
              {t("banner.text")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
