import Link from "next/link";
import Layout from "../components/layout";

export default function Custom404() {
  return (
    <Layout>
      <div className="container flex-auto mx-auto text-center min-h-full content-center">
        <h1>404 - Page Not Found</h1>
        <Link href="/">
          <button className="m-4 p-4 text-white bg-black rounded-xl hover:text-black hover:bg-white hover:border-solid hover:border-2 hover:border-black">
            Home
          </button>
        </Link>
      </div>
    </Layout>
  );
}
