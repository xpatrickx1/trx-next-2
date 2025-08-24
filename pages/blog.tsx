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
      <LanguageHeader/>
      <div className="bg-[#f3f3f3] w-full max-w-[1512px] flex flex-col ">
        <BlogHero/>
        <BlogArticle />
      </div>
      <Footer />
    </div>
  );
};

export default Blog