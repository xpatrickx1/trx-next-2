"use client";

import { useTranslation } from "react-i18next";
import Image from 'next/image'
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/router";

interface NavItem {
  label: string;
  id: string;
  active: boolean;
}

export default function Footer () {
  const { i18n, t } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const router = useRouter();
  const [navigationItems, setNavigationItems] = useState<NavItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
	useEffect(() => {
	setNavigationItems([
		{ label: t("menu.USDT"), id: "USDT", active: false },
		{ label: t("menu.TRX"), id: "TRX", active: false },
	]);
	}, [t, i18n.language]);

  const handleScroll = (id: string) => {
		if (window.location.pathname !== "/") {
		  router.push(`/#${id}`);
		  setTimeout(() => {
			const element = document.getElementById(id);
			if (element) {
			  element.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		  }, 100);
		} else {
		  const element = document.getElementById(id);
		  if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		  }
		}
		setIsMenuOpen(false);
	  };

    useEffect(() => {
      const isBlogPage = router.pathname === "/blog";
      setNavigationItems((prevItems) =>
        prevItems.map((item) => ({
        ...item,
        active: isBlogPage ? false : item.id === "exchange" && router.pathname === "/"
        })
      ))
      }, [router.pathname]);

      const languages = [
        { code: 'en', name: 'ENG' },
        { code: 'de', name: 'DE' },
        { code: 'fr', name: 'FR' },
        { code: 'ru', name: 'RUS' },
        { code: 'es', name: 'ES' },
        { code: 'pt', name: 'PT' },
      ];

      const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
      const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("i18nextLng", lng);
      };
  const updateActiveItem = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setNavigationItems((prevItems) =>
              prevItems.map((item) => ({
                ...item,
                active: item.id === entry.target.id,
              }))
            );
          }
        });
      },
      { threshold: 0.5 } 
    );

    navigationItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      navigationItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [navigationItems]);

  useEffect(() => {
    const cleanup = updateActiveItem();
    return cleanup;
  }, [updateActiveItem]);

  return (
    <footer className="w-full bg-[#131313] py-[33px] px-6 lg:px-0">
      <div className="max-w-7xl mx-auto flex items-center flex-col md:flex-row">
        <div className="flex items-center gap-2 mr-8 text-[#868686]">
          <span className="rounded-[50%] bg-[#74EB69] p-[5px]"></span>
          Latest Block: 75390285
        </div>

       {/* Custom language selector */}
       <div className="relative my-6 md:my-0 language-selector h-auto bg-[#0d0d0d96] rounded-md border border-[#FFFBFB14] text-white transition-opacity" style={{ width: '95px' }}>
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="w-full opacity-50 justify-center gap-2 text-black px-6 py-2 duration-200 flex items-center justify-between"
            aria-haspopup="listbox"
            aria-expanded={isLanguageOpen}
          >
            <span className="text-md text-white font-medium">{currentLanguage.code.toUpperCase()}</span>
            <svg
              className={`w-4 h-4 text-white transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isLanguageOpen && (
            <ul
              role="listbox"
              className="absolute right-0 bottom-full mt-1 p-2 w-24 bg-[#0D0D0D96] border border-[#FFFBFB14] rounded-md shadow-lg z-20 overflow-hidden"
            >
              {languages.map((lang) => (
                <li
                  role="option"
                  aria-selected={i18n.language === lang.code}
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsLanguageOpen(false);
                  }}
                  className={`opacity-50 px-3 py-2 text-sm cursor-pointer outline-none hover:text-blue-600 transition-colors duration-150 ${
                    i18n.language === lang.code ? 'bg-black-50 text-blue-600 font-medium' : 'text-white-700'
                  }`}
                >
                  {lang.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button
          className="h-auto mr-4 bg-[#1f2027b2] text-[#868686] transition-colors bg-transparent ml-8"
        >
          {t("connect_wallet")}
        </Button>

        <div className="flex gap-4 items-center relative md:ml-auto ml-0">
          <button onClick={() => router.push('/')} aria-label="Go to home" className="flex items-center">
            <Image src="/icons/logo.svg" width={160} height={40} alt="Logo" style={{ maxHeight: '40px' }} />
          </button>
          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-[#58585866] text-[#19a3ff] text-sm">
            v.4.20
          </div>
        </div>
      </div>
    </footer>
  );
};