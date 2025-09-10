import React from "react";
import { useTranslation } from "react-i18next";
import Image from 'next/image'
import { Card, CardContent } from "../components/ui/card";
import Link from "next/link";
import { truncateText } from "../utils/truncateText";
import { BlogPost } from "../types/BlogPost";

export default function Blog () {
  const { t } = useTranslation();
  const posts = t("blog.posts", { returnObjects: true }) as BlogPost[];

  return (
    <section className="w-full max-w-7xl px-6 xl:px-0 xl:mx-auto">
        <div id="blog" className="blog-bg w-full container mx-auto  pb-16">
          <div className="flex align-center justify-center sm:bg-black/90 rounded-lg sm:my-6 sm:py-6 pt-4 ">
            <h2 className="font-normal text-white text-base sm:text-3xl text-center tracking-[0] leading-[59.1px] ">
              {t("section_title_blog")}
            </h2>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap justify-center gap-[20px] mb-12">
          {posts.slice(0, 3).map((article, index) => (
            
            <Card className=" w-full flex flex-col max-w-[411px]  bg-[#f3f3f3e6] rounded-[8px] border-0 overflow-hidden" key={article.id}>
                <div className="relative">
                  <Image
                    src={article.imageUrl}
                    width={500}
                    height={500}
                    alt="Picture post"
                  />
                </div>
        
                <CardContent className={`flex flex-col justify-between gap-6 p-4 xl:p-14 pt-9 flex-1
                            ${
                              index === 0
                                ? "bg-[radial-gradient(51.86%_153.38%_at_117%_75.83%,rgba(25,163,255,0.6)_10.9%,rgba(0,0,0,0.9)_92.88%)]"
                                : index === 1
                                ? "bg-[linear-gradient(312.12deg,rgba(0,0,0,0.9)_49.21%,rgba(25,163,255,0.7)_126.89%)]"
                                : index === 2
                                ? "bg-[linear-gradient(60.12deg,rgba(0,0,0,0.9)_59.21%,rgba(25,163,255,0.7)_146.89%)]"
                                : ""
                            }`}>
                  <div className="flex flex-col gap-9">
                    <div className="flex items-center justify-between">
                      <div className="opacity-50 font-normal text-[#C0C0C0] text-base text-center tracking-[0] leading-[25px] whitespace-nowrap">
                          {article.date}
                      </div>
                      <div className="opacity-50 font-normal text-[#C0C0C0] text-base text-center tracking-[0] leading-[25px] whitespace-nowrap">
                          {article.readTime}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <Link
                        href={`/blog/${article.slug}`}
                        target="_blank"
                        className="w-[292.05px] font-bold text-white text-[21px] tracking-[0] leading-[normal]"
                        aria-label={`Read more about ${article.title}`}
                      >
                          {article.title}
                      </Link>
                      <p className="font-normal text-[#A6A6A6] text-base tracking-[0] leading-6">
                        {truncateText(article.excerpt, 100)} 
                      </p>
                    </div>
                  </div>
                </CardContent>
          </Card>
        ))}
          </div>

        </div>
      </section>
  );
};
