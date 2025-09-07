import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { useRouter } from 'next/router';
import { useClickOutside } from '../utils/useClickOutside';

interface NavItem {
  label: string;
  id: string;
  active: boolean;
}

interface LanguageHeaderProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const LanguageHeader: React.FC<LanguageHeaderProps> = ({ activeSection, setActiveSection }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };
  console.log(activeSection);
  const [navigationItems, setNavigationItems] = useState<NavItem[]>([
    { label: t('menu.USDT'), id: 'USDT', active: activeSection === 'USDT' },
    { label: t('menu.TRX'), id: 'TRX', active: activeSection === 'TRX' },
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  useEffect(() => {
    setNavigationItems([
      { label: t('menu.USDT'), id: 'USDT', active: activeSection === 'USDT' },
      { label: t('menu.TRX'), id: 'TRX', active: activeSection === 'TRX' },
    ]);
  }, [activeSection, t]);

  const handleScroll = (id: string) => {
    if (window.location.pathname !== '/') {
      router.push(`/#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setActiveSection(id); // Оновлюємо активну секцію через пропс
    setIsMenuOpen(false);
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
            setActiveSection(entry.target.id); // Оновлюємо через пропс
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
  }, [navigationItems, setActiveSection]);

  useEffect(() => {
    const cleanup = updateActiveItem();
    return cleanup;
  }, [updateActiveItem]);

  useEffect(() => {
    const isBlogPage = router.pathname === '/blog';
    setNavigationItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        active: isBlogPage ? false : item.id === 'exchange' && router.pathname === '/',
      }))
    );
  }, [router.pathname]);

  useClickOutside('.language-selector', setIsLanguageOpen);

  const languages = [
    { code: 'en', name: 'ENG' },
    { code: 'de', name: 'DE' },
    { code: 'fr', name: 'FR' },
    { code: 'ru', name: 'RUS' },
    { code: 'es', name: 'ES' },
    { code: 'pt', name: 'PT' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <header className="flex w-full items-center justify-between px-2 py-2 mb-[15px] fixed top-0 z-50 bg-transparent">
      <div className="flex flex-1 justify-between items-center mx-auto max-w-7xl">
        <div className="flex gap-4 items-center relative">
          <button onClick={() => router.push('/')} aria-label="Go to home" className="flex items-center">
            <img src="/icons/logo.svg" alt="Logo" style={{ maxHeight: '40px' }} />
          </button>
          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-[#58585866] text-[#19a3ff] text-sm">
            v.4.20
          </div>
        </div>

        <div className="hidden md:inline-flex items-center gap-12 relative flex-[0_0_auto] mx-auto">
          <nav className="flex items-center gap-[31px]">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`h-auto p-0 font-normal text-base tracking-[0] transition-all duration-300 leading-normal whitespace-nowrap focus:outline-none ${
                  item.active
                    ? 'text-white hover:text-white'
                    : 'text-white opacity-50 hover:text-white hover:opacity-40'
                }`}
                onClick={() => handleScroll(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* Burger button visible on mobile/tablet */}
        <button
          className="md:hidden ml-auto mr-3 inline-flex items-center justify-center px-[6px] py-[8px] border border-[#FFFFFF] rounded-[5px]"
          aria-label="Open navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <div className="flex flex-col gap-1">
            <div className={`w-[18px] h-0.5 bg-white rounded-[20px] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></div>
            <div className={`w-[18px] h-0.5 bg-white rounded-[20px] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-[18px] h-0.5 bg-white rounded-[20px] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}></div>
          </div>
        </button>

        <Button
          variant="outline"
          className="h-auto hidden md:flex mr-4 bg-[#1f2027b2] border-white backdrop-blur-[7px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(7px)_brightness(100%)] text-white hover:text-black hover:bg-[#ffffff] hover:border-[#1F2027B2] transition-all duration-300"
        >
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_687_557)">
			<path d="M4.78955 4.9512C2.53238 4.9512 0.72029 6.89394 0.937012 9.19437C1.12643 11.2067 2.89146 12.6923 4.89697 12.6924H6.07959C6.36325 12.6924 6.593 12.4623 6.59326 12.1787C6.59326 11.8949 6.36342 11.6641 6.07959 11.6641H4.896C3.37365 11.6639 2.05347 10.5186 1.95264 9.01761C1.84191 7.36224 3.15715 5.97971 4.78857 5.97952H9.4585C10.9818 5.97952 12.3011 7.12562 12.4019 8.62698C12.5126 10.2824 11.1976 11.6641 9.56592 11.6641H8.27686C7.993 11.6641 7.76221 11.8949 7.76221 12.1787C7.76247 12.4624 7.99317 12.6924 8.27686 12.6924H9.4585C11.4642 12.6924 13.2301 11.2068 13.4194 9.19437C13.6354 6.89415 11.8237 4.95146 9.56689 4.9512H4.78955Z" fill="currentColor" stroke="currentColor" strokeWidth="0.4"/>
			<path d="M14.022 8.30771C13.7382 8.30771 13.5085 8.5377 13.5083 8.82139C13.5083 9.10524 13.7381 9.33603 14.022 9.33603H15.2046C16.727 9.33621 18.0472 10.4814 18.1479 11.9825C18.2587 13.6379 16.9434 15.0204 15.312 15.0206H10.6421C9.11886 15.0206 7.79952 13.8745 7.69873 12.3731C7.588 10.7177 8.90303 9.33603 10.5347 9.33603H11.8247C12.1083 9.33577 12.3384 9.10508 12.3384 8.82139C12.3382 8.53786 12.1082 8.30798 11.8247 8.30771H10.6421C8.63642 8.30771 6.87062 9.79325 6.68213 11.8058L6.66748 12.0206C6.57969 14.2257 8.3484 16.0488 10.5347 16.0489H15.2046C17.2103 16.0489 18.9762 14.5633 19.1655 12.5509C19.3815 10.2507 17.5698 8.30798 15.313 8.30771H14.022Z" fill="currentColor" stroke="currentColor" strokeWidth="0.4"/>
			</g>
			<defs>
			<clipPath id="clip0_687_557">
			<rect width="20.0856" height="20.0856" fill="white" transform="matrix(-1 0 0 1 20.0933 0.457188)"/>
			</clipPath>
			</defs>
		  </svg>
          {t("connect_wallet")}
        </Button>

        {/* Custom language selector */}
        <div className="relative hidden md:flex language-selector h-auto bg-[#0d0d0d96] rounded-md border border-[#FFFBFB14] text-white transition-opacity" style={{ width: '95px' }}>
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
              className="absolute right-0 top-full mt-1 p-2 w-24 bg-[#0D0D0D96] border border-[#FFFBFB14] rounded-md shadow-lg z-20 overflow-hidden"
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
      </div>

      {/* Mobile dropdown menu (nav items only) */}
        <div
          className={`fixed inset-x-0 top-14 z-40 flex flex-col items-center gap-4 bg-black text-white transition-all duration-500 overflow-hidden ${
            isMenuOpen ? "max-h-[calc(100vh-56px)] h-full" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col items-center p-6 gap-4">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`justify-center h-auto p-0 text-lg font-medium ${
                  item.active ? 'text-[#2e77da]' : 'text-white opacity-70'
                }`}
                onClick={() => handleScroll(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </nav>
          
		  <Button
          variant="outline"
          className="h-auto mx-auto mb-8 bg-[#1f2027b2] border-white backdrop-blur-[7px] backdrop-brightness-[100%] text-white hover:text-black hover:bg-[#ffffff] hover:border-[#1F2027B2] transition-all duration-300"
        >
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_687_557)">
            <path d="M4.78955 4.9512C2.53238 4.9512 0.72029 6.89394 0.937012 9.19437C1.12643 11.2067 2.89146 12.6923 4.89697 12.6924H6.07959C6.36325 12.6924 6.593 12.4623 6.59326 12.1787C6.59326 11.8949 6.36342 11.6641 6.07959 11.6641H4.896C3.37365 11.6639 2.05347 10.5186 1.95264 9.01761C1.84191 7.36224 3.15715 5.97971 4.78857 5.97952H9.4585C10.9818 5.97952 12.3011 7.12562 12.4019 8.62698C12.5126 10.2824 11.1976 11.6641 9.56592 11.6641H8.27686C7.993 11.6641 7.76221 11.8949 7.76221 12.1787C7.76247 12.4624 7.99317 12.6924 8.27686 12.6924H9.4585C11.4642 12.6924 13.2301 11.2068 13.4194 9.19437C13.6354 6.89415 11.8237 4.95146 9.56689 4.9512H4.78955Z" fill="currentColor" stroke="currentColor" strokeWidth="0.4"/>
            <path d="M14.022 8.30771C13.7382 8.30771 13.5085 8.5377 13.5083 8.82139C13.5083 9.10524 13.7381 9.33603 14.022 9.33603H15.2046C16.727 9.33621 18.0472 10.4814 18.1479 11.9825C18.2587 13.6379 16.9434 15.0204 15.312 15.0206H10.6421C9.11886 15.0206 7.79952 13.8745 7.69873 12.3731C7.588 10.7177 8.90303 9.33603 10.5347 9.33603H11.8247C12.1083 9.33577 12.3384 9.10508 12.3384 8.82139C12.3382 8.53786 12.1082 8.30798 11.8247 8.30771H10.6421C8.63642 8.30771 6.87062 9.79325 6.68213 11.8058L6.66748 12.0206C6.57969 14.2257 8.3484 16.0488 10.5347 16.0489H15.2046C17.2103 16.0489 18.9762 14.5633 19.1655 12.5509C19.3815 10.2507 17.5698 8.30798 15.313 8.30771H14.022Z" fill="currentColor" stroke="currentColor" strokeWidth="0.4"/>
            </g>
            <defs>
            <clipPath id="clip0_687_557">
            <rect width="20.0856" height="20.0856" fill="white" transform="matrix(-1 0 0 1 20.0933 0.457188)"/>
            </clipPath>
            </defs>
          </svg>

          Connect Wallet
        </Button>
        <div className="relative language-selector mb-8 h-auto bg-[#0d0d0d96] rounded-md border border-[#FFFBFB14] text-white transition-all duration-300" style={{ width: '95px' }}>
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
              className="absolute right-0 top-full mt-1 p-2 w-24 bg-[#0D0D0D96] border border-[#FFFBFB14] rounded-md shadow-lg z-20 overflow-hidden"
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
        </div>
      {/* )} */}
    </header>
  );
};

export default LanguageHeader;