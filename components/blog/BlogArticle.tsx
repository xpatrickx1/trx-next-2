"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Card, CardContent } from "../../components/ui/card";
import { truncateText } from "../../utils/truncateText";
import { BlogPost } from "../../types/BlogPost";

export const BlogArticle = (): React.ReactElement => {
  const { t, ready } = useTranslation("common");
  const [englishSlugs, setEnglishSlugs] = useState<{ id: number; slug: string }[]>([]);

  useEffect(() => {
    async function fetchEnglishSlugs() {
      try {
        const response = await fetch("/locales/en/common.json");
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        const posts: BlogPost[] = data?.blog?.posts || [];
        if (Array.isArray(posts)) {
          const slugs = posts.map((post) => ({
            id: post.id,
            slug: typeof post.slug === "string" && post.slug.trim() !== "" ? post.slug : `post-${post.id}`,
          }));
          setEnglishSlugs(slugs);
        } else {
          console.error("Posts is not an array in en/common.json:", posts);
        }
      } catch (error) {
        console.error("Error loading English slugs:", error);
      }
    }
    fetchEnglishSlugs();
  }, []);

  if (!ready) {
    return <div>Loading...</div>;
  }

  const posts = t("blog.posts", { returnObjects: true }) as BlogPost[];

  if (!Array.isArray(posts)) {
    console.error("Posts is not an array:", posts);
    return (
      <div className="w-full max-w-7xl mx-auto px-4 xl:px-0 py-4 text-center">
        <p>{t("blog.noPostsAvailable", { defaultValue: "No blog posts available" })}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 px-4 xl:px-0 py-4 pb-16 mb-20">
      {posts.slice(1).map((post, idx) => {
        const englishPost = englishSlugs.find((p) => p.id === post.id);
        const slug = englishPost?.slug || `post-${post.id}`;

        return (
          <article key={idx} className="w-full max-w-[411px] justify-self-center">
            <Card className="bg-[#ffffffe6] rounded-2xl h-full border-0 overflow-hidden">
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
                  <Link
                    href={`/blog/${slug}`}
                    className="[font-family:'Public_Sans',Helvetica] font-normal text-[#2e77da] text-base tracking-[0] leading-[25px] hover:underline transition-colors"
                    aria-label={`Read more about ${post.title}`}
                  >
                    {t("blog.readMore")}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </article>
        );
      })}
    </div>
  );
};