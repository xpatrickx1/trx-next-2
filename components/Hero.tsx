import { useTranslation } from 'react-i18next';
import { useTheme } from '../components/ThemeContext';

const Hero = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <section className="mb-4">
      <div className="rounded-lg p-5">
          <div className="text-center space-y-3">
          <h2 className="font-bold text-center mb-6">
              <span className="text-white">
                  {/*hero_buy
hero_trx
hero_buy_text
hero_buy_text_bottom*/}

                  {t("hero_buy")}{" "}
              </span>
              <span className={`${
                theme === 'green' ? 'text-theme-green' : 'text-theme-primary'
              }`}>
              {t("hero_trx")}
              </span>
              <span className="text-white">
              {" "}
              <br />
                  {t("hero_buy_text")}
              </span>
          </h2>

          <p className=" font-light text-white text-[19px] text-center mb-12">
              {t("hero_buy_text_bottom")}
          </p>
          </div>
      </div>
    </section>
  )
}

export default Hero