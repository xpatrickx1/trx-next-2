import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../components/ui/card";

const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

const posts = [
  {
    date: "17 August",
    readTime: "3 min.",
    title: "TRON (TRX): A Gateway to Web3 Adoption",
    excerpt:
      "TRON (TRX) has positioned itself as one of the most influential blockchain networks in the world TRON (TRX) has positioned itself as one of the most influential blockchain networks in the world",
    imageUrl: "icons/blog1.png",
  },
  {
    date: "04 August",
    readTime: "5 min.",
    title: "Why TRX is More Than Just Another Cryptocurrency",
    excerpt:
      "TRON (TRX) has positioned itself as one of the most influential blockchain networks in the world...",
    imageUrl: "icons/blog2.png",
  },
  {
    date: "29 July",
    readTime: "7 min.",
    title: "The Future of TRON and TRX in the Crypto Market",
    excerpt:
      "TRON (TRX) has positioned itself as one of the most influential blockchain networks in the world...",
    imageUrl: "icons/blog3.png",
  },
  {
    date: "17 August",
    readTime: "3 min.",
    title: "TRON (TRX): A Gateway to Web3 Adoption",
    excerpt:
      "TRON (TRX) has positioned itself as one of the most influential blockchain networks in the world...",
    imageUrl: "icons/blog4.png",
  },
  {
    date: "04 August",
    readTime: "5 min.",
    title: "Why TRX is More Than Just Another Cryptocurrency",
    excerpt:
      "TRON (TRX) has positioned itself as one of the most influential blockchain networks in the world...",
    imageUrl: "icons/blog5.png",
  },
  {
    date: "29 July",
    readTime: "7 min.",
    title: "The Future of TRON and TRX in the Crypto Market",
    excerpt:
      "TRON (TRX) has positioned itself as one of the most influential blockchain networks in the world...",
    imageUrl: "icons/blog6.png",
  },
];

export const BlogArticle = (): React.ReactElement => {
  const { t } = useTranslation();
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedPost(null);
    }
  };
  return (
    <>
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 px-4 xl:px-0  py-4 pb-16 mb-20">
        {posts.map((post, idx) => (
          <article key={idx} className="w-full max-w-[411px] justify-self-center">
            <Card className="bg-[#ffffffe6] rounded-2xl border-0 overflow-hidden">
              <div className="relative">
                <img
                  className="w-full h-[206px] object-cover"
                  alt={post.title}
                  src={post.imageUrl}
                />
              </div>

              <CardContent className="p-14 pt-[34px]">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-9">
                    <div className="flex items-center justify-between">
                      <time className="opacity-50 [font-family:'Public_Sans',Helvetica] font-normal text-[#4e4a4a] text-base tracking-[0] leading-[25px] whitespace-nowrap">
                        {post.date}
                      </time>
                      <span className="opacity-50 [font-family:'Public_Sans',Helvetica] font-normal text-[#4e4a4a] text-base tracking-[0] leading-[25px] whitespace-nowrap">
                        {post.readTime}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <h3 className="w-[292.05px] [font-family:'Public_Sans',Helvetica] font-bold text-[#252525] text-[21px] tracking-[0] leading-[normal]">
                        {post.title}
                      </h3>
                      <p className="[font-family:'Public_Sans',Helvetica] font-normal text-[#252525] text-base tracking-[0] leading-6">
                        {truncateText(post.excerpt, 100)} 
                      </p>
                    </div>
                  </div>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedPost(post);
                    }}
                    className="[font-family:'Public_Sans',Helvetica] font-normal text-[#2e77da] text-base tracking-[0] leading-[25px] hover:underline transition-colors"
                  >
                    {t("blog.readMore")}
                  </a>
                </div>
              </CardContent>
            </Card>
          </article>
        ))}
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
    </>
  );
};
