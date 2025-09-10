import React from 'react';
import { useTranslation, Trans } from 'react-i18next'; 
import Image from 'next/image';
import TabsBlockWithLogic from './TabsBlockWithLogic'; // Адаптуй шлях

const StakeSection = ({
  id,
  titleKey,
  description,
  selectedDays,
  setIsDaysOpen,
  isDaysOpen,
  handleDaysSelect,
  options,
  getPercentage,
  stakeSection,
  unstakeSection,
}) => {
  const { t } = useTranslation();

  return (
    <section
      id={id}
      className="relative mb-0 md:mb-6 flex flex-col items-left lg:items-start md:rounded-2xl max-w-7xl xl:mx-auto justify-between md:mx-3 pt-[6rem] sm:pt-[10rem]"
    >
      <div id="staking" className="flex gap-2 md:gap-10 xl:gap-20 pl-[32px] justify-start items-start md:pl-0 mb-10 flex-col md:flex-row">
        <h2 className="font-bold text-left text-[40px] md:text-[55px] max-w-fit relative z-10 whitespace-nowrap">
          <span className="text-white">{t(titleKey)}</span>
        </h2>
        <div className="w-full whitespace-pre-line sm:w-[370px] text-left font-normal text-white text-base leading-[normal]">
          <Trans
            i18nKey={description}
            components={{
              highlight1: <span className="text-[#19A3FF]" />,
            }}
          />
        </div>
      </div>

      <div className="w-full text-center relative flex flex-wrap flex-col-reverse lg:flex-row lg:flex-nowrap md:gap-6">
        <div className="lg:w-[40%] xl:w-[50%] flex flex-col justify-between max-w-full py-8 pb-20 sm:pb-8 px-8 md:px-12 md:rounded-lg backdrop-blur-[7px] backdrop-brightness-[100%] bg-[linear-gradient(27deg,rgba(0,0,0,0.6)_32%,rgba(25,163,255,0.6)_100%)]">
          <div className="flex justify-between">
            <div className="flex flex-col w-full sm:w-auto">
              <div className="flex gap-6 items-center justify-between sm:justify-start ">
                <div className="font-normal whitespace-nowrap text-base sm:text-lg text-white tracking-[0]">{t("staking_apy")}</div>
                <div className="relative days-select-container">
                  <div
                    className="day-select rounded-md bg-[#58585866] text-[#B9B9B9] hover:bg-[#A3A1A166]  py-1 px-4 w-fit text-sm  transition-all duration-300"
                    style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}
                  >
                    <button
                      onClick={() => setIsDaysOpen(!isDaysOpen)}
                      className="w-full justify-center gap-2 text-white hover:text-[#FFFFFF] px-2 py-1 flex items-center justify-between focus:outline-none"
                      aria-haspopup="listbox"
                      aria-expanded={isDaysOpen}
                    >
                      <span className="text-md whitespace-nowrap font-medium">{selectedDays} days Avg.</span>
                      <svg
                        className={`w-4 h-4 text-white transition-transform duration-200 ${isDaysOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    </button>
                  </div>
                  {isDaysOpen && (
                    <ul
                        className="day-list absolute w-full text-left left-0 top-full mt-1 w-32 bg-[#2c363e] border border-[#58585866] rounded-md shadow-lg z-20 overflow-hidden"
                    >
                        {options
                        .filter((option) => option.value !== selectedDays)
                        .map((option) => (
                            <li
                            key={option.value}
                            role="option"
                            aria-selected={selectedDays === option.value}
                            onClick={() => handleDaysSelect(option.value)}
                            className="px-6 py-2 text-sm text-[#b9b9b9] cursor-pointer hover:bg-[#6b6b6b] transition-colors duration-150"
                            >
                            {option.label}
                            </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
              <div
                className="percentage w-fit font-normal text-[78.7px] tracking-[0] leading-[normal] text-transparent bg-gradient-to-r from-[#006AFA] to-[#19A3FF] bg-clip-text [-webkit-background-clip:text]"
                style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}
              >
                {getPercentage()}
              </div>
            </div>
            <div className="absolute sm:relative top-20 sm:top-4 right-0 z-[-1] sm:opacity-100">
              <Image
                className="z-0 max-w-[385px] w-auto"
                alt="Calculator"
                src="icons/hero-card.svg"
                width={385}
                height={385}
              />
            </div>
          </div>
          <div className="w-[273px] text-left mt-20 sm:mt-auto opacity-70 font-normal text-white text-sm tracking-[0] leading-[normal">
            {t("card_text")}
          </div>
        </div>
        <div className="lg:w-[60%] xl:w-[50%] max-w-full pt-2 md:rounded-lg backdrop-blur-[7px] backdrop-brightness-[100%] bg-[radial-gradient(51.86%_173.38%_at_3.3%_5.83%,rgba(25,163,255,0.6)_14.9%,rgba(0,0,0,0.6)_52.88%)]">
          <TabsBlockWithLogic
            stakeSection={stakeSection}
            unstakeSection={unstakeSection}
          />
        </div>
      </div>
    </section>
  );
};

export default StakeSection;