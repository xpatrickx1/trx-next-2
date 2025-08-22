"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../components/ui/card";

const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

interface BlogPost {
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}

export const BlogHero = (): React.ReactElement => {
  const { t } = useTranslation();
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedPost(null);
    }
  };
  const articleData: BlogPost = {
    date: "04 August",
    readTime: "5 min.",
    title: "Why TRX is More Than Just Another Cryptocurrency",
    excerpt:
      "TRON (TRX) has positioned itself as one of the most influential blockchain networks in the world TRON (TRX) has positioned itself as one of the most influential blockchain networks in the world",
    imageUrl: "icons/blogHero.png",
  };

  return (
    <section className="w-full animate-fade-in overflow-hidden mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full animate-fade-in mb-6 flex flex-wrap blog-bg blog-bg-hero bg-[#015BBB1A] rounded-2xl max-w-7xl mx-auto mt-20 py-6 sm:py-8 lg:py-14 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex flex-col gap-4 sm:gap-5 lg:gap-6">
          <h2 className="font-bold text-left text-[#252525] text-[28px] sm:text-[34px] lg:text-[42px] leading-tight">
            {t("Learn About Crypto with TRX Prime")}
          </h2>
          <Card className="bg-[#ffffffe6] backdrop-blur-[7px] backdrop-brightness-[100%] border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-0 h-auto">
              <div className="flex flex-col sm:flex-row h-full">
              <div className="w-full sm:max-w-[300px] lg:max-w-[478px] h-[180px] sm:h-full flex-shrink-0 animate-fade-in overflow-hidden rounded-b-0 rounded-t-2xl sm:rounded-l-2xl sm:rounded-r-none">
                  <img
                    className="w-full h-full object-cover"
                    alt="Article cover"
                    src={articleData.imageUrl}
                  />
                </div>
                <div className="flex-1 p-4 sm:p-6 lg:p-[34px_34px_34px_62px] animate-fade-in">
                  <div className="flex flex-col h-full max-w-full sm:max-w-[405px]">
                    <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 flex-1">
                      <div className="flex flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <div className="opacity-50 font-['Public_Sans',Helvetica] font-normal text-[#4e4a4a] text-sm sm:text-base text-left tracking-[0] leading-6">
                          {articleData.date}
                        </div>
                        <div className="opacity-50 font-['Public_Sans',Helvetica] font-normal text-[#4e4a4a] text-sm sm:text-base text-right tracking-[0] leading-6">
                          {articleData.readTime}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <h3 className="font-['Public_Sans',Helvetica] font-bold text-[#252525] text-[18px] sm:text-[20px] lg:text-[21px] tracking-[0] leading-tight max-w-[80%] sm:max-w-[292px]">
                          {articleData.title}
                        </h3>
                        <p className="font-['Public_Sans',Helvetica] font-normal text-[#252525] text-sm sm:text-base tracking-[0] leading-5 sm:leading-6">
                        {truncateText(articleData.excerpt, 100)} 
                        </p>
                      </div>
                    </div>
                    <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedPost(articleData);
                    }}
                    className="[font-family:'Public_Sans',Helvetica] font-normal text-[#2e77da] text-base tracking-[0] leading-[25px] hover:underline transition-colors"
                  >
                    {t("blog.readMore")}
                  </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={handleBackdropClick}
        >
          <div
            className="relative bg-white w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-10"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
          >
            <button
              className="absolute top-4 right-4 w-6 h-6 cursor-pointer 
                before:content-[''] before:absolute before:top-1/2 before:left-0 
                before:w-full before:h-[2px] before:bg-gray-700 before:rotate-45 
                after:content-[''] after:absolute after:top-1/2 after:left-0 
                after:w-full after:h-[2px] after:bg-gray-700 after:-rotate-45 
                hover:before:bg-[#2E77DA] hover:after:bg-[#2E77DA]"
              aria-label="Close"
              onClick={() => setSelectedPost(null)}
            />
            <div>
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h1 className="text-3xl text-black font-bold mb-4">
                {selectedPost.title}
              </h1>
              <div className="flex gap-4 text-gray-500 text-sm mb-6">
                <time>{selectedPost.date}</time>
                <span>{selectedPost.readTime}</span>
              </div>
              <div
                className="prose max-w-none text-black"
                dangerouslySetInnerHTML={{ __html: selectedPost.excerpt }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};