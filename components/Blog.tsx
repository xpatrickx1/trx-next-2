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
    <section className="w-full pt-4 mt-20 bg-[#ffffff]">
        <div id="blog" className="blog-bg w-full container mx-auto px-4 md:px-6  max-w-[1615px] pt-16 pb-28">
          <h2 className="font-bold text-[#252525] text-4xl text-center tracking-[0] leading-[59.1px] mb-12">
            {t("section_title_blog")}
          </h2>
          
          <div className="flex flex-wrap lg:flex-nowrap justify-center gap-[20px] mb-12">
          {posts.slice(1, 4).map((article) => (
            
            <Card className="w-full flex flex-col max-w-[411px]  bg-[#f3f3f3e6] rounded-2xl border-0 overflow-hidden" key={article.id}>
                <div className="relative">
                    <img
                        className="w-full h-[206px] object-cover"
                        alt="Rectangle"
                        src={article.imageUrl}
                    />
                </div>
        
                <CardContent className="flex flex-col justify-between gap-6 p-4 xl:p-14 pt-9 flex-1">
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
                      className="font-normal text-[#2e77da] text-base tracking-[0] leading-[25px] hover:underline transition-colors"
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
              {t("explore_more")}
            </Button>
          </Link>
          </div>
        </div>
      </section>
  );
};
