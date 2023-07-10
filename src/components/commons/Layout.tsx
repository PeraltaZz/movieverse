import { ReactNode } from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};
