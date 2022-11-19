import Modal, { ModalContext } from "@/components/shared/modal";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Splitty</title>
        <meta name="description" content="Split things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-6xl font-bold pb-14">Splitty</h1>
        <Link href={"/transactions"}>
          <div className="text-xl font-bold hover:cursor-pointer hover:scale-105 transition-all dark:text-slate-700 dark:bg-slate-200 px-5 py-3 rounded-md">
            View Transactions
          </div>
        </Link>
      </main>
    </div>
  );
};

export default Home;
