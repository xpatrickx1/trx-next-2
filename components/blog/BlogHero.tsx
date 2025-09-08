import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Card, CardContent } from "../../components/ui/card";
import { truncateText } from "../../utils/truncateText";
import { BlogPost } from "../../types/BlogPost";

export const BlogHero = (): React.ReactElement => {
  const { t } = useTranslation();
  const posts = t("blog.posts", { returnObjects: true }) as BlogPost[];
  const firstPost = posts[0] || {
    slug: "",
    date: "N/A",
    readTime: "N/A",
    title: "No post available",
    excerpt: "No description available",
    imageUrl: "icons/placeholder.png",
  };
  
  return (
    <section className="w-full animate-fade-in pt-[10rem] overflow-hidden mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl mt-4 rounded-lg pt-8 sm:pt-12 pb-12 sm:pb-20 backdrop-blur-[14.2px] backdrop-brightness-[100%] bg-[radial-gradient(51.86%_173.38%_at_97%_5.83%,rgba(25,163,255,0.6)_14.9%,rgba(0,0,0,0.6)_52.88%)] rounded-lg relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col gap-4 sm:gap-5 lg:gap-6">
        <nav className="w-full max-w-7xl mx-auto text-sm sm:text-base text-white mb-4 sm:mb-2" aria-label="Breadcrumb">
          <ol className="list-none flex flex-wrap gap-1 sm:gap-1">
            <li>
              <Link href="/" className="hover:text-[#2e77da] text-xs transition-colors">
                {t("breadcrumbs.home")}
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className=" text-white">
              <Link href="/blog" className="hover:text-[#2e77da] text-xs transition-colors">
                {t("breadcrumbs.blog")}
              </Link>
            </li>
          </ol>
        </nav>
          <h2 className="font-bold text-left text-white text-[28px] sm:text-[34px] lg:text-[42px] leading-tight">
            {t("blog.heading")}
          </h2>
          <Card className="border-0 shadow-none rounded-2xl overflow-hidden">
            <CardContent className="p-0 h-auto">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="w-full sm:max-w-[300px] lg:max-w-[478px] h-full overflow-hidden rounded-b-0 rounded-t-2xl sm:rounded-l-2xl sm:rounded-r-none">
                  <img
                    className="w-full h-full object-cover"
                    alt={firstPost.title}
                    src={firstPost.imageUrl}
                  />
                </div>
                <div className="flex-1 p-4 sm:p-6 lg:p-[34px_34px_34px_62px] animate-fade-in">
                  <div className="flex flex-col h-full max-w-full sm:max-w-[405px]">
                    <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 flex-1">
                      <div className="flex flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <div className="opacity-50 font-normal text-white text-sm sm:text-base text-left tracking-[0] leading-6">
                          {firstPost.date}
                        </div>
                        <div className="opacity-50 font-normal text-white text-sm sm:text-base text-right tracking-[0] leading-6">
                          {firstPost.readTime}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <Link
                          href={`/blog/${firstPost.slug}`}
                          className="font-bold text-white text-[21px] tracking-[0] leading-[normal]"
                          aria-label={`Read more about ${firstPost.title}`}
                        >
                            {firstPost.title}
                        </Link>
                        <p className="font-normal text-white text-sm sm:text-base tracking-[0] leading-5 sm:leading-6">
                        {truncateText(firstPost.excerpt, 100)} 
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${firstPost.slug}`}
                      className="font-normal text-white text-base tracking-[0] leading-[25px] hover:underline transition-colors"
                      aria-label={`Read more about ${firstPost.title}`}
                    >
                      {t("blog.readMore")}
                    </Link>
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