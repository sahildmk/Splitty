import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  const [file, setFile] = useState<File | undefined>(undefined);

  return (
    <div>
      <Head>
        <title>Splitty</title>
        <meta name="description" content="Split things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold">Enter file:</h1>
        <form>
          <input
            type={"file"}
            className="text-white"
            id="file"
            name="filename"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </form>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
