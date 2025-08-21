import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export const Blog = (): JSX.Element => {
    const articleData = [
        {
        id: "item-1",
        date: "17 August",
        readTime: "3 min.",
        title: "TRON (TRX): A Gateway to Web3 Adoption",
        description:
          "TRON (TRX) has positioned itself as one of the most influential blockchain networks in the world...",
        readMoreText: "Read article...",
        imageUrl: "icons/blog1.png",
      },
      {
        id: "item-2",
        date: "04 August",
        readTime: "5 min.",
        title: "Why TRX is More Than Just Another Cryptocurrency",
        description:
          "TRON (TRX) has positioned itself as one of the most influential blockchain networks in the world...",
        readMoreText: "Read article...",
        imageUrl: "icons/blog2.png",
      },
      {
        id: "item-3",
        date: "29 July",
        readTime: "7 min.",
        title: "The Future of TRON and TRX in the Crypto Market",
        description:
          "TRON (TRX) has positioned itself as one of the most influential blockchain networks in the world...",
        readMoreText: "Read article...",
        imageUrl: "icons/blog3.png",
      }
    ];

  return (
    <section className="w-full pt-16">
        <div className="blog-bg container mx-auto px-4 md:px-6 bg-[#ffffff] max-w-[1615px] pt-16 pb-28">
          <h2 className="font-bold text-[#252525] text-4xl text-center tracking-[0] leading-[59.1px] mb-12">
            Our Blog
          </h2>
          
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-8 mb-12">
          {articleData.map((article) => (
            <Card className="w-full max-w-[411px] h-[534px] bg-[#f3f3f3e6] rounded-2xl border-0 overflow-hidden" key={article.id}>
                <div className="relative">
                    <img
                        className="w-full h-[206px] object-cover"
                        alt="Rectangle"
                        src={article.imageUrl}
                    />
                </div>
        
                <CardContent className="flex flex-col gap-6 p-4 xl:p-14 pt-9">
                <div className="flex flex-col gap-9">
                    <div className="flex items-center justify-between">
                    <div className="opacity-50 font-normal text-[#4e4a4a] text-base text-center tracking-[0] leading-[25px] whitespace-nowrap">
                        {article.date}
                    </div>
                    <div className="opacity-50 font-normal text-[#4e4a4a] text-base text-center tracking-[0] leading-[25px] whitespace-nowrap">
                        {article.readTime}
                    </div>
                    </div>
        
                    <div className="flex flex-col gap-3">
                    <h3 className="w-[292.05px] font-bold text-[#252525] text-[21px] tracking-[0] leading-[normal]">
                        {article.title}
                    </h3>
                    <p className="font-normal text-[#252525] text-base tracking-[0] leading-6">
                        {article.description}
                    </p>
                    </div>
                </div>
        
                <a
                    href="#"
                    className="font-normal text-[#2e77da] text-base tracking-[0] leading-[25px] hover:underline"
                >
                    {article.readMoreText}
                </a>
                </CardContent>
            </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              className="w-[410px] h-[68px] rounded-xl border border-solid border-[#2e77da] bg-transparent hover:bg-[#2e77da] font-normal text-[#2e77da] text-lg tracking-[0.36px] leading-[47.7px] hover:text-white"
            >
                EXPLORE MORE IN BLOG
            </Button>
          </div>
        </div>
      </section>
  );
};
