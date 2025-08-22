import React from "react";''
import LanguageHeader from "../components/LanguageHeader";
import { BlogHero } from "../components/blog/BlogHero";
import { BlogArticle } from "../components/blog/BlogArticle";
import { Footer } from "../components/Footer";

export const Blog = (): React.ReactElement => {
  return (
    <div
      className="bg-[#f3f3f3] flex flex-col items-center w-full"
    >
      <div className="bg-[#f3f3f3] w-full max-w-[1512px] flex flex-col">
        <LanguageHeader/>
        <BlogHero/>
        <BlogArticle />
        <Footer />
      </div>
    </div>
  );
};

export default Blog