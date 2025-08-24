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
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const { t } = useTranslation("common");

  if (!post) {
    return <div>{t("blog.postNotFound", { defaultValue: "Post not found" })}</div>;
  }
  const imageUrl = post.imageUrl.startsWith("/") ? post.imageUrl : `/${post.imageUrl}`;
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt.slice(0, 160)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt.slice(0, 160)} />
        <meta property="og:image" content={post.imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <LanguageHeader/>
      <div className="w-full max-w-3xl mx-auto px-4 xl:px-0 py-8 mb-20">
        <article>
          <div className="w-full mt-20 h-[180px]  sm:h-full flex-shrink-0 animate-fade-in overflow-hidden rounded-b-0 rounded-t-2xl sm:rounded-l-2xl sm:rounded-r-none">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          </div>
          <h1 className="text-3xl text-black font-bold mb-4">{post.title}</h1>
          <div className="flex gap-4 text-gray-500 text-sm mb-6">
            <time>{post.date}</time>
            <span>{post.readTime}</span>
          </div>
          <div className="prose max-w-none text-black">
            <p>{post.excerpt}</p>
            {post.subheadings?.map((subheading, idx) => (
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
          {t("blog.backToBlog", { defaultValue: "Back to Blog" })}
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
    } 

    return {
      paths,
      fallback: false, // 404 for invalid slugs
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    // Read English translation to map slug to ID
    const enFilePath = path.join(process.cwd(), "public", "locales", "en", "common.json");
    let enPosts: BlogPost[] = [];

    try {
      const enJsonData = await fs.readFile(enFilePath, "utf-8");
      const enData = JSON.parse(enJsonData);
      enPosts = enData?.blog?.posts || [];
      console.log("Fetched English posts for getStaticProps:", enPosts); // Debug
    } catch (error) {
      console.error(`Error reading or parsing ${enFilePath}:`, error);
    }

    if (!Array.isArray(enPosts)) {
      console.error("English posts is not an array:", enPosts);
      return { notFound: true };
    }

    // Find post by slug
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
          subheadings: post.subheadings || [],
        },
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return { notFound: true };
  }
};