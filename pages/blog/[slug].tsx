import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import Link from "next/link";
import { BlogPost } from "../../types/BlogPost";

const posts = [
  {
    "slug": "why-trx-is-more-than-just-another-cryptocurrency",
    "date": "04 August",
    "readTime": "5 min.",
    "title": "Why TRX is More Than Just Another Cryptocurrency",
    "excerpt": "In the fast-paced world of digital assets, new cryptocurrencies emerge almost daily. Many of them come with promises of innovation, speed, or profitability, but only a few manage to prove their real value over time. TRON’s native token, TRX, often gets underestimated as “just another coin,” yet in reality, it represents much more than that. With its strong ecosystem, technical advantages, and real-world applications, TRX has carved out a unique position in the blockchain industry.",
    "imageUrl": "icons/blogHero.png",
    "subheadings": [
      {
        "title": "A Powerful Blockchain Infrastructure",
        "content": "At the heart of TRX lies the TRON blockchain, a high-performance network designed for decentralized applications (dApps) and smart contracts. Unlike many blockchains that struggle with scalability and transaction fees, TRON offers extremely low fees and can handle up to 2,000 transactions per second. This makes it not just a currency, but a foundation for developers to build fast and cost-efficient applications. This infrastructure is particularly important for gaming, NFTs, and DeFi platforms, where high transaction costs can discourage users. By removing these barriers, TRX contributes to making blockchain technology more accessible and practical."
      },
      {
        "title": "Beyond Simple Payments",
        "content": "While many cryptocurrencies are primarily seen as speculative assets or payment tools, TRX’s use cases go much further. On the TRON network, TRX is used to:",
        "list": [
            "Pay for transaction fees (bandwidth and energy).",
            "Participate in governance by voting for Super Representatives.",
            "Support stablecoins such as USDT on TRON (TRC20), which has become one of the most widely used versions of Tether thanks to its low transfer costs."
          ]
      },
      {
        "title": "A Leader in Stablecoin Transfers",
        "content": "One of TRX’s most significant contributions to the crypto world is its role in stablecoin adoption. The TRON network has become the largest host of Tether (USDT), facilitating billions of dollars in daily transactions. For many users across Asia, Africa, and Latin America, TRC20-USDT is the preferred method of moving funds because it is faster and cheaper than Ethereum or Bitcoin-based alternatives. This real-world adoption highlights why TRX isn’t just another cryptocurrency. It acts as the bridge that powers these stablecoin transactions, further cementing its relevance in global finance."
      },
      {
        "title": "Community and Governance",
        "content": "TRON also empowers its community through a delegated proof-of-stake (DPoS) system. Holders of TRX can vote for Super Representatives, who validate transactions and secure the network. This gives every user a voice in shaping the ecosystem, making TRON more democratic and decentralized compared to traditional financial systems."
      },
      {
        "title": "Global Partnerships and Expansion",
        "content": "Another reason TRX stands out is TRON’s strategic partnerships. The network has collaborated with BitTorrent, Opera, and various blockchain projects, continuously expanding its ecosystem. Such collaborations prove that TRX is not only about transactions—it’s about building an open, decentralized internet."
      },
      {
        "title": "Conclusion",
        "content": "TRX is far more than just another cryptocurrency lost in the sea of digital tokens. It represents speed, scalability, utility, and adoption. With its role in powering stablecoin transfers, supporting developers, and enabling governance, TRX is shaping the future of decentralized finance and applications. As blockchain adoption grows worldwide, TRX’s value goes beyond market speculation. It is becoming a cornerstone of digital finance, offering people across the globe faster, cheaper, and more reliable ways to interact with the blockchain economy."
      }
    ]
  },
  {
    "slug": "tron-gateway-to-web3-adoption",
    "date": "17 August",
    "readTime": "3 min.",
    "title": "TRON (TRX): A Gateway to Web3 Adoption",
    "excerpt": "TRON (TRX) has positioned itself as one of the most influential blockchain networks in the world...",
    "imageUrl": "icons/blog1.png"
  },
]
interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const { t } = useTranslation();
  if (!post) {
    return <div>{t("blog.postNotFound", { defaultValue: "Post not found" })}</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt.slice(0, 160)} />
        <meta property="og:title" content={post.title} />
        {/* <meta property="og:description" content={post.excerpt.slice(0, 160)} /> */}
        <meta property="og:image" content={post.imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="w-full max-w-3xl mx-auto px-4 xl:px-0 py-8">
        <article>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
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
                <p>{subheading.content.text}</p>
                {subheading.content.list && (
                  <ul className="list-disc pl-5 mt-2">
                    {subheading.content.list.map((item, listIdx) => (
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
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false, // якщо немає — 404
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = posts.find((p) => p.slug === params?.slug);

  return {
    props: {
      post: post || null,
    },
  };
};
