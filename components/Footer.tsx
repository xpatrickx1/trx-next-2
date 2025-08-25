"use client";

import { ChevronDownIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/router";

interface NavItem {
  label: string;
  id: string;
  active: boolean;
}

export const Footer = (): React.ReactElement => {
  const { i18n, t } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const router = useRouter();
  const [navigationItems, setNavigationItems] = useState<NavItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
	useEffect(() => {
	setNavigationItems([
		{ label: t("menu.exchange"), id: "exchange", active: false },
		{ label: t("menu.howto"), id: "howTo", active: false },
		{ label: t("menu.reviews"), id: "reviews", active: false },
		{ label: t("menu.faq"), id: "faq", active: false },
		{ label: t("menu.blog"), id: "blog", active: false },
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
        { code: 'en', name: 'English' },
        { code: 'de', name: 'Deutsch' },
        { code: 'fr', name: 'Français' },
        { code: 'ru', name: 'Русский' },
        { code: 'es', name: 'Español' },
        { code: 'pt', name: 'Português' }
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
    <footer className="w-full bg-[#252525] py-[52px]">
      <div className="max-w-[1392px] mx-auto px-6 flex items-center justify-between flex-col md:flex-row">
        <button onClick={() => router.push('/')} aria-label="Go to home" className="flex items-center">
          <img src="/icons/logo-light.png" alt="Logo" style={{maxHeight: "40px",}} />
        </button>
        <div className="flex items-center gap-12 flex-col md:flex-row">
          <nav className="flex items-center gap-[31px] mt-6 md:mt-0 flex-col md:flex-row">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`h-auto p-0 font-normal text-base tracking-[0] leading-normal whitespace-nowrap ${
                  item.active
                    ? "text-[#2e77da] hover:text-[#2e77da]"
                    : "text-[#c1c1c1] opacity-50 hover:text-[#c1c1c1] hover:opacity-75"
                }`}
                onClick={() => handleScroll(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="relative language-selector" style={{ width: "60px" }}>
					<button
						onClick={() => setIsLanguageOpen(!isLanguageOpen)}
						className="w-full text-[#C1C1C1] px-3 py-1 pr-2  duration-200 flex items-center justify-between"
						aria-haspopup="listbox"
						aria-expanded={isLanguageOpen}
					>
						<span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
						<svg
							className={`w-4 h-4 text-[#C1C1C1] transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
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
							className="absolute right-0 bottom-full mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden"
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
									className={`px-3 py-2 text-sm  cursor-pointer outline-none hover:text-blue-600 transition-colors duration-150 ${
										i18n.language === lang.code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
									}`}
								>
									{lang.name}
								</li>
							))}
						</ul>
					)}
				</div>
        </div>
      </div>
    </footer>
  );
};