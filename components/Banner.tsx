'use client';

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export const Banner = (): React.ReactElement => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsClosed(true);
    }, 300); // Час анімації закриття
  };

  if (isClosed) return null;

  return (
    <div className={`
      fixed bottom-0 left-0 right-0 px-6 py-1 bg-[#e8edff] z-50
      transition-transform duration-300 ease-out
      ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      shadow-lg
    `}>
      <div className="flex items-center justify-center gap-4 md:gap-10 lg:gap-12 max-w-7xl mx-auto relative">
        <button
          onClick={handleClose}
          className="absolute -top-9 right-0 rounded-tl-md rounded-tr-md p-1 hover:scale-105 transition-colors duration-200"
          aria-label="Close banner"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex items-center gap-1 md:gap-4 group cursor-pointer transition-all duration-300 hover:scale-105">
          <Image
            className="flex-[0_0_auto] max-w-[133px] md:max-w-[100px] scale-105 sm:max-w-[80px] transition-transform duration-300 hover:scale-105"
            alt="Ticket icon"
            src="/icons/ticket.svg"
            width={133}
            height={80}
          />
          <div className="flex-1">
            <p className="text-black flex justify-center text-xl items-center flex-wrap text-md font-medium leading-tight opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              <span className="px-2">{t("banner.get_your")}</span>
              <span className="font-bold text-[#2E77DA] px-1">{t("banner.percent")}</span>
              <span className="font-bold text-[#2E77DA] lowercase px-1">
                {t("banner.commission")}
              </span>
              {t("banner.text")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};