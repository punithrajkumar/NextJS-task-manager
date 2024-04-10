import Navbar from "@/components/navbar/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Navbar>
      <Head>
        <title>Task Manager</title>
      </Head>
      <Component {...pageProps} />
    </Navbar>
  );
}
