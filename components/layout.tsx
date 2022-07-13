import { ReactNode, Suspense } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <>
      <Head>
        <title>toryBids</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 container m-auto">
        <Link href="/">
          <h1 className="text-8xl font-extrabold p-4">toryBids</h1>
        </Link>
        {children}
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
        <a href="https://order-order.com">GuidoFawkes</a>
        <a href="https://github.com/alorslouis">github</a>
      </footer>
    </>
  );
}