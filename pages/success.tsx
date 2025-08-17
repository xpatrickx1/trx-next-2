import { useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Success.module.css";

export default function SuccessPage() {
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const timer = setTimeout(() => {
          window.location.href = "/";
        }, 5000);
        return () => clearTimeout(timer);
      } catch (err) {
        window.location.href = "/";
      }
    };
    checkAccess();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>✅</div>
        <h1 className={styles.title}></h1>
        <p className={styles.text}></p>
        <Link href="/">
          <button className={styles.button}></button>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const referer = req.headers.referer || "";
  const domen = process.env.NEXT_PUBLIC_DOMEN;
  if (!referer.startsWith(domen)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
