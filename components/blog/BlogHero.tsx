import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../components/ui/card";

export const BlogHero = (): JSX.Element => {
  const { t } = useTranslation();
  const articleData = {
    date: "04 August",
    readTime: "5 min.",
    title: "Why TRX is More Than Just Another Cryptocurrency",
    description:
      "TRON (TRX) has positioned itself as one of the most influential blockchain networks in the world...",
    imageUrl: "icons/blogHero.png",
    readMoreText: "Read article...",
  };

  return (
    <section className="w-full animate-fade-in overflow-hidden mx-auto px-4 xl:px-0">
        <div className="w-full animate-fade-in  mb-6 flex flex-wrap blog-bg blog-bg-hero bg-[#015BBB1A] rounded-2xl max-w-7xl mx-auto mt-20 py-10 px-4 xl:px-0 md:py-14">
            <div className="mx-auto flex flex-col gap-[25px]">
                <h2 className="font-bold  text-left text-[#252525] text-[35px] md:text-[42px] leading-[normal]">
                    Learn About Crypto with TRX Prime
                </h2>
                <Card className="bg-[#ffffffe6] backdrop-blur-[7px] backdrop-brightness-[100%] border-0 rounded-2xl overflow-hidden">
                    <CardContent className="p-0 h-72">
                    <div className="flex h-full flex-col md:flex-row">
                        <div className="xl:max-w-[478px] max-h-[200px] xl:max-h-auto flex-shrink-0 animate-fade-in overflow-hidden rounded-2xl rounded-b xl:rounded-0">
                            <img
                                className="w-full h-full object-cover"
                                alt="Rectangle"
                                src={articleData.imageUrl}
                            />
                        </div>

                        <div className="flex-1 p-[34px_34px_34px_62px] animate-fade-in">
                        <div className="flex flex-col h-full max-w-[405px]">
                            <div className="flex flex-col gap-6 flex-1">
                            <div className="flex flex-col gap-9">
                                <div className="flex items-center justify-between">
                                <div className="opacity-50 [font-family:'Public_Sans',Helvetica] font-normal text-[#4e4a4a] text-base text-center tracking-[0] leading-[25px] whitespace-nowrap">
                                    {articleData.date}
                                </div>
                                <div className="opacity-50 [font-family:'Public_Sans',Helvetica] font-normal text-[#4e4a4a] text-base text-center tracking-[0] leading-[25px] whitespace-nowrap">
                                    {articleData.readTime}
                                </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                <h3 className="[font-family:'Public_Sans',Helvetica] font-bold text-[#252525] text-[21px] tracking-[0] leading-[normal] max-w-[292px]">
                                    {articleData.title}
                                </h3>
                                <p className="[font-family:'Public_Sans',Helvetica] font-normal text-[#252525] text-base tracking-[0] leading-6">
                                    {articleData.description}
                                </p>
                                </div>
                            </div>
                            </div>

                            <div className="[font-family:'Public_Sans',Helvetica] font-normal text-[#2e77da] text-base tracking-[0] leading-[25px] cursor-pointer hover:underline transition-colors">
                            {articleData.readMoreText}
                            </div>
                        </div>
                        </div>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>
  );
};
