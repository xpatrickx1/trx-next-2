import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from '../components/ThemeContext';

const LanguageHeader: React.FC = () => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <header
      className="flex justify-between items-center py-1 mb-3 bg-black"
      
    >
      <div className="flex flex-1 justify-between items-center space-x-3 px-3" style={{maxWidth: "425px", margin: "0 auto",}} >
      <div className={`flex items-center relative ${
                theme === 'green' ? 'theme-green' : 'theme-primary'
              }`}>
        <img src="icons/logo.png" alt="Logo" style={{maxHeight: "40px",}} />
        <i
            className="i-local:logo-lightning?mask absolute"
            style={{ width: "28px", height: "39px", left: "41px", top: "1px",}}
        ></i>
      </div>
      <div className="relative" style={{ width: "60px" }}>
        <select
          id="language-select"
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-gray-800 text-white px-3 py-1 pr-10 rounded appearance-none"
          style={{ width: "100%" }}
        >
          <option value="en">en</option>
          <option value="de">de</option>
          <option value="fr">fr</option>
          <option value="ru">ru</option>
          <option value="es">es</option>
          <option value="pt">pt</option>
        </select>
        <div
          className="pointer-events-none absolute inset-y-0 right-3 flex items-center"
          style={{ top: "4px" }}
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      </div>
    </header>
  );
};

export default LanguageHeader;
