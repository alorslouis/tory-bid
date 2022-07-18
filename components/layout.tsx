import { ReactNode, Suspense } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { NextSeo } from "next-seo";

export default function Layout({
  children,
  title,
}: {
  children?: ReactNode;
  title?: string | string[] | undefined;
}) {
  return (
    <>
      <Head>
        <title>toryBids{title ? " - " + title : null}</title>
        <meta name="description" content="Follow the Tory Leader bids here" />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:title" content="Follow the Tory Leader bids here" />
        <meta property="og:type" content="website" />
        {/* <meta
          property="og:image"
          content="http://localhost:3000/number10Bids.png" */}
        {/* /> */}
        {/* <meta
          property="og:url"
          content="https://www.imdb.com/title/tt0117500/"
        /> */}
      </Head>
      <NextSeo
        // description="This example uses more of the available config options."
        // canonical="https://www.canonical.ie/"
        openGraph={{
          url: "https://torybid.vercel.app",
          title: "Tory Leadership Bids",
          // description: "Open Graph Description",
          images: [
            {
              url: "https://torybid.vercel.app/number10Bids.png",
              width: 1200,
              height: 630,
              alt: "Og Image Alt",
              type: "image/png",
            },
          ],
          site_name: "toryBid",
        }}
        // twitter={{
        //   handle: "@handle",
        //   site: "@site",
        //   cardType: "summary_large_image",
        // }}
      />

      <header>
        <Link href="/">
          <h1 className="text-4xl lg:text-8xl font-extrabold p-4 cursor-pointer mx-auto text-center">
            toryBids
          </h1>
        </Link>
      </header>
      <main className="p-2 md:p-4 container mx-auto min-h-screen">
        {children}
      </main>
      <footer className="sticky bottom-0 flex bg-white p-2 text-center text-sm align-middle justify-evenly">
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 align-middle"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}

        <a href="https://order-order.com" className="p-4 align-middle">
          leader data: Guido Fawkes
        </a>
        <a href="https://www.parliament.uk/" className="p-4 align-middle">
          member data: parliament.uk
        </a>

        <a
          href="https://github.com/alorslouis/tory-bid"
          className="p-4 align-middle"
        >
          GitHub
        </a>
      </footer>
    </>
  );
}
