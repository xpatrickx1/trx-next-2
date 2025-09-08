import React from "react";
import dynamic from "next/dynamic";
import LanguageHeader from "../components/LanguageHeader";

const BlogHero = dynamic(() => import("../components/blog/BlogHero"), {
  ssr: false,
});

const BlogArticle = dynamic(() => import("../components/blog/BlogArticle"), {
  ssr: false,
});

const Footer = dynamic(() => import("../components/Footer"), {
  ssr: false,
});


export const Blog = (): React.ReactElement => {
  return (
    <div
      className="flex flex-col items-center w-full"
    >
      <LanguageHeader/>
      <div className="w-full max-w-[1512px] flex flex-col ">
        <BlogHero/>
        <BlogArticle />
      </div>
      <Footer />
    </div>
  );
};

export default Blog