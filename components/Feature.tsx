
import { useTranslation } from "react-i18next";
import { useTheme } from '../components/ThemeContext';

const Feature = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const features = [
    {
      icon: "/icons/Statistics.svg",
      title:  t("text_picture_seven"),
      description: t("text_picture_eut"),
    },
    {
      icon: "/icons/Cryptodron.svg",
      iconRotate: true,
      title: t("text_picture_one_two"),
      description: t("text_picture_one_three"),
    },
    {
      icon: "/icons/TeamManagement.svg",
      title: t("text_picture_one_five"),
      description: t("text_picture_one_six"),
    },
    {
      icon: "/icons/Meeting.svg",
      title: t("text_picture_one_seven"),
      description: t("text_picture_one_eut") + ' ' + t("text_picture_one_ten"),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="w-full rounded-xl bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg mb-3 p-8 space-y-4">
        <h2 className="font-bold text-2xl text-center mb-4">
          <span className="text-white uppercase">{t("text_picture_three")}{" "} </span>
          <span className={`uppercase ${
                theme === 'green' ? 'text-theme-green' : 'text-theme-primary'
              }`}>{t("text_picture_four")}</span>
          <span className="text-white uppercase whitespace-nowrap">{" "}
          {t("text_picture_five")}</span>
        </h2>

        <p className="text-sm text-white text-center leading-5 font-normal opacity-60 max-w-xs mx-auto">
          {t("text_picture_six")}
        </p>

        <div className="flex justify-center">
          <div className="w-60 h-[274px] opacity-30">
            <img
              className="w-60 h-[216px] mt-7"
              alt="P2P"
              src="/icons/P2P.svg"
            />
          </div>
        </div>
      </div>

      {features.map((feature, index) => (
        <div
          key={index}
          className="w-full rounded-xl bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg border border-transparent mb-4"
        >
          <div className="p-6">
            <div className="flex items-center gap-6">
              <div className="relative w-[90px] h-[100px] min-w-[90px]">
                <img
                  className="w-[90px] h-[90px]"
                  alt={feature.title}
                  src={feature.icon}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-2xl uppercase">
                  {feature.title === "Flexibility" ? (
                    <>
                      <span className={`${
                        theme === 'green' ? 'text-theme-green' : 'text-theme-primary'
                      }`}>Flex</span>
                      <span className="text-white">ibility</span>
                    </>
                  ) : feature.title.includes(" ") ? (
                    <>
                      <span className={`${
                        theme === 'green' ? 'text-theme-green' : 'text-theme-primary'
                      }`}>{feature.title.split(" ")[0]}</span>{" "}
                      <span className="text-white">
                        {feature.title.split(" ").slice(1).join(" ")}
                      </span>
                    </>
                  ) : (
                    <span className="text-white">{feature.title}</span>
                  )}
                </h3>
                <p className="text-sm text-white opacity-60 leading-5 whitespace-pre-line">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="rounded-xl"
          style={{
            width: '100%',
            backgroundColor: '#0000004c',
            borderRadius: '0.75rem',
            backdropFilter: 'blur(42px) brightness(100%)',
            border: 'none',
            marginTop: '12px',
            marginBottom: '100px',
            overflow: 'hidden',
          }}>
            <div className="p-6 pt-0 space-y-4" />
              <div className="relative">
                <h2 className="font-bold text-2xl text-center mb-8 uppercase">
                  <span className={`${
                      theme === 'green' ? 'text-theme-green' : 'text-theme-primary'
                    }`}>{t("referral_referral")}</span>
                  <span className="text-white"> {t("referral_program")}</span>
                </h2>
                <p className=" font-light text-white text-center" style={{maxWidth: "80%", margin: "0 auto",}}>
                  {t("referral_text")}
                </p>
              </div>
            <div className={`font-bold ml-auto mt-3 -mb-2 ${
                      theme === 'green' ? 'text-theme-green' : 'text-theme-primary'
                    }`}
              style={{
                fontSize: "185px",
                lineHeight: "135px",
                width: "fit-content",
                marginRight: "-26px",
                marginLeft: "auto",
              }}
            >8%</div>
          </div>
    </div>
  );
};

export default Feature