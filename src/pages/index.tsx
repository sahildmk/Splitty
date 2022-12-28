import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Button from "../components/shared/button";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Splitty</title>
        <meta name="description" content="Split things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen flex-col items-center justify-center">
        <h1 className="pb-14 text-6xl font-bold">Splitty</h1>
        {/* <Link href={"/transactions"}>
          <div className="rounded-md px-5 py-3 text-xl font-bold transition-all hover:scale-105 hover:cursor-pointer dark:bg-slate-200 dark:text-slate-700">
            Login
          </div>
        </Link> */}
        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <Button
        text={sessionData ? "Sign out" : "Sign in"}
        type="Default"
        style="Solid"
        onClick={sessionData ? () => signOut() : () => signIn()}
      />
    </div>
  );
};
