import React from "react";

export const Features = (): React.ReactElement => {
  const features = [
    {
      icon: "/icons/Features1.svg",
      text: "Unlimited, non-custodial cryptocurrency platform",
    },
    {
      icon: "/icons/Features2.svg",
      text: "No account creation or sign-up necessary",
    },
    {
      icon: "/icons/Features3.svg",
      text: "Protecting your privacy comes first for us",
    },
  ];

  return (
    <div className="w-full mt-12 md:mt-16 py-12 md:py-24 md:my-3 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 md:gap-4 group cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <img
              className="flex-[0_0_auto] max-w-[133px] md:max-w-[100px] sm:max-w-[80px] transition-transform duration-300 hover:scale-105"
              alt="Rating stars"
              src={feature.icon}
            />
            <div className="flex-1 min-w-0">
              <p className="text-black text-md max-w-[190px] font-medium leading-tight opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                {feature.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
