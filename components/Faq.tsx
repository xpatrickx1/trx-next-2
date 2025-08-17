import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from '../components/ThemeContext';

type FaqItem = {
  question: string;
  answer: string;
};

const Faq = () => {
  
  const { theme } = useTheme();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { t } = useTranslation();

  const faqItems = t("faq", { returnObjects: true }) as FaqItem[];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full bg-[#0000004c] rounded-xl backdrop-blur-[42px] backdrop-brightness-[100%] border-none mb-[12px] p-8 space-y-4" 
    style={{
      width: '100%',
      backgroundColor: '#0000004c',
      borderRadius: '0.75rem',
      backdropFilter: 'blur(42px) brightness(100%)',
      border: 'none',
      marginTop: '12px',
      marginBottom: '12px',
      overflow: 'hidden',
    }}>
      <h2 className="font-bold text-2xl mb-4">
        <span className={`${
                theme === 'green' ? 'text-theme-green' : 'text-theme-primary'
              }`}>FAQ</span>
      </h2>

      <div className="space-y-2">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="pb-2">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left flex items-center justify-between py-2 text-white text-base font-medium focus:outline-none"
                
              >
                <span style={{
                  maxWidth: '250px',
                }}>{item.question}</span>
                <span
                  className={`transition-transform duration-300 transform relative border border-white rounded-full flex items-center justify-center opacity-50`}
                  style={{
                    width: '32px',
                    height: '32px',
                    
                  }}
                >
                  <span className="absolute w-3 h-0.5 bg-white"></span>
                  <span className="absolute w-0.5 h-3 bg-white transition-transform duration-300 ease-in-out" style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }} />
                </span>
              </button>
              <div className="overflow-hidden">
                <div
                  className={`text-white opacity-60 text-sm font-normal leading-5 ${
                    isOpen ? "opening" : "closing"
                  }`}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq