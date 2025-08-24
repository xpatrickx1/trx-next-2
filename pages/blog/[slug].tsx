
import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { BlogPost } from "../../types/BlogPost";
import LanguageHeader from "../../components/LanguageHeader";
import { Footer } from "../../components/Footer";

interface BlogPostPageProps {
  post: BlogPost | null;
  translations: {
    [lng: string]: {
      blog: {
        posts: BlogPost[];
        postNotFound: string;
        backToBlog: string;
      };
    };
  };
}

export default function BlogPostPage({ post, translations }: BlogPostPageProps) {
  const { t, i18n } = useTranslation("common");
  const currentLanguage = i18n.language || "en"; // Fallback to 'en' if undefined

  const currentTranslations = translations[currentLanguage]?.blog || translations.en.blog;
  const translatedPost = post
    ? currentTranslations.posts.find((p) => p.id === post.id) || post // Fallback to English post
    : null;

  if (!translatedPost) {
    return <div>{t("blog.postNotFound", { defaultValue: currentTranslations.postNotFound })}</div>;
  }

  return (
    <>
    <Head>
      <title>{translatedPost.title}</title>
      <meta name="description" content={translatedPost.excerpt.slice(0, 160)} />
      <meta property="og:title" content={translatedPost.title} />
      <meta property="og:description" content={translatedPost.excerpt.slice(0, 160)} />
      <meta property="og:image" content={translatedPost.imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <LanguageHeader/>
    <div className="w-full max-w-3xl mx-auto px-4 xl:px-0 py-8 my-20">
      <article>
        <img
          src={translatedPost.imageUrl}
          alt={translatedPost.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl text-black font-bold mb-4">{translatedPost.title}</h1>
        <div className="flex gap-4 text-gray-500 text-sm mb-6">
          <time>{translatedPost.date}</time>
          <span>{translatedPost.readTime}</span>
        </div>
        <div className="prose max-w-none text-black">
          <p>{translatedPost.excerpt}</p>
          {translatedPost.subheadings?.map((subheading, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-semibold mt-6 mb-2">{subheading.title}</h2>
              <p>{subheading.content}</p>
              {subheading.list && (
                <ul className="list-disc pl-5 mt-2">
                  {subheading.list.map((item, listIdx) => (
                    <li key={listIdx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </article>
      <Link
        href="/blog"
        className="mt-6 inline-block text-[#2e77da] hover:underline [font-family:'Public_Sans',Helvetica] font-normal text-base"
      >
        {t("blog.backToBlog", { defaultValue: currentTranslations.backToBlog })}
      </Link>
    </div>
    <Footer />
  </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const filePath = path.join(process.cwd(), "public", "locales", "en", "common.json");
    let posts: BlogPost[] = [];

    try {
      const jsonData = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(jsonData);
      posts = data?.blog?.posts || [];
    } catch (error) {
      console.error(`Error reading or parsing ${filePath}:`, error);
    }

    if (!Array.isArray(posts)) {
      console.error("Posts is not an array in en/common.json:", posts);
      return { paths: [], fallback: false };
    }

    const paths = posts
      .filter((post) => typeof post.slug === "string" && post.slug.trim() !== "")
      .map((post) => ({
        params: { slug: post.slug },
      }));

    if (paths.length === 0) {
      console.warn("No valid slugs found in posts:", posts);
    } else {
      console.log("Generated paths:", paths); 
    }

    return {
      paths,
      fallback: false, 
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const languages = ["en", "de", "es", "fr", "pt", "ru"];
    const translations: BlogPostPageProps["translations"] = {};

    for (const lng of languages) {
      const filePath = path.join(process.cwd(), "public", "locales", lng, "common.json");
      try {
        const jsonData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(jsonData);
        translations[lng] = {
          blog: {
            posts: data?.blog?.posts || [],
            postNotFound: data?.blog?.postNotFound || "Post not found",
            backToBlog: data?.blog?.backToBlog || "Back to Blog",
          },
        };
      } catch (error) {
        console.error(`Error reading or parsing ${filePath}:`, error);
        translations[lng] = {
          blog: { posts: [], postNotFound: "Post not found", backToBlog: "Back to Blog" },
        };
      }
    }

    const enPosts = translations.en?.blog?.posts || [];
    if (!Array.isArray(enPosts)) {
      console.error("English posts is not an array:", enPosts);
      return { notFound: true };
    }

    const post = enPosts.find((p) => p.slug === params?.slug);
    if (!post || !post.id) {
      console.error(`Post not found for slug ${params?.slug} or missing ID`);
      return { notFound: true };
    }

    return {
      props: {
        post: {
          id: post.id,
          date: post.date,
          readTime: post.readTime,
          title: post.title,
          excerpt: post.excerpt,
          imageUrl: post.imageUrl,
          subheadings: post.subheadings,
        },
        translations,
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return { notFound: true };
  }
};