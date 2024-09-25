"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux"; // Import redux provider
import store from "./store/store"; // Import your redux store
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Guess Number test</title>
        <meta
          name="description"
          content="This is a description of the page for SEO purposes"
        />
      </Head>
      <body className={inter.className}>
        {/* Wrap with Redux Provider */}
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
