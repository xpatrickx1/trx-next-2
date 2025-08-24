import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Link from "next/link";
import { truncateText } from "../utils/truncateText";
import { BlogPost } from "../types/BlogPost";

export const Blog = (): React.ReactElement => {
  const { t } = useTranslation();
  const posts = t("blog.posts", { returnObjects: true }) as BlogPost[];
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedPost(null);
    }
  };

  return (
    <section className="w-full pt-16">
        <div className="blog-bg container mx-auto px-4 md:px-6 bg-[#ffffff] max-w-[1615px] pt-16 pb-28">
          <h2 className="font-bold text-[#252525] text-4xl text-center tracking-[0] leading-[59.1px] mb-12">
            Our Blog
          </h2>
          
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-8 mb-12">
          {posts.slice(1, 4).map((article) => (
            
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
                      {truncateText(article.excerpt, 100)} 
                    </p>
                    </div>
                </div>
        
                <Link
                    href={`/blog/${article.slug}`}
                    className="[font-family:'Public_Sans',Helvetica] font-normal text-[#2e77da] text-base tracking-[0] leading-[25px] hover:underline transition-colors"
                    aria-label={`Read more about ${article.title}`}
                  >
                    {t("blog.readMore")}
                </Link>
                </CardContent>
            </Card>
            ))}
          </div>

          <div className="flex justify-center">
          <Link href="/blog" className="w-full max-w-[410px]">
            <Button
              variant="outline"
              className="w-full h-[68px] rounded-xl border border-solid border-[#2e77da] bg-transparent hover:bg-[#2e77da] font-normal text-[#2e77da] text-lg tracking-[0.36px] leading-[47.7px] hover:text-white"
            >
              EXPLORE MORE IN BLOG
            </Button>
          </Link>
          </div>
        </div>
        {selectedPost && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={handleBackdropClick}
        >
          <div
            className="relative bg-white w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-4 md:p-10"
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
              <h3 className="text-xl md:text-3xl text-black font-bold mb-4">
                {selectedPost.title}
              </h3>
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
