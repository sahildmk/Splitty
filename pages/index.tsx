import type { NextPage } from "next";
import Head from "next/head";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ParseCSV from "@/utils/csv-parser";

import { useQuery } from "@tanstack/react-query";
import Transaction from "@/components/transaction/transaction";
import { GetSavedTransactions } from "@/lib/api/transactions";
import { WestpacTransaction, WestpacHeaders } from "@/lib/api/transactions";

const Home: NextPage = () => {
  const [transactions, setTransactions] = useState<WestpacTransaction[]>([]);
  const { isLoading, error, data } = useQuery(
    ["transactions"],
    GetSavedTransactions
  );

  if (isLoading) return <>Loading...</>;

  return (
    <div>
      <Head>
        <title>Splitty</title>
        <meta name="description" content="Split things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-10">
        <h1 className="text-4xl font-bold">Splitty</h1>
        <div className="my-5">
          <h1 className="text-2xl font-bold">Import file:</h1>
          <form>
            <input
              type={"file"}
              className="text-white mt-3"
              id="file"
              name="filename"
              onChange={(e) => {
                HandleUploadFile(e, setTransactions);
              }}
            />
          </form>
        </div>

        {data?.map((transaction, index) => (
          <Transaction key={index} transaction={transaction} />
        ))}
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;

function HandleUploadFile(
  e: ChangeEvent<HTMLInputElement>,
  setTransactions: Dispatch<SetStateAction<WestpacTransaction[]>>
) {
  if (e.target.files) {
    ParseCSV<WestpacTransaction>(
      e.target.files[0],
      WestpacHeaders,
      (error: any, result: WestpacTransaction[]) => {
        if (error) console.error(error);

        console.log(result);

        setTransactions((transactions) => [
          ...transactions,
          ...result.splice(1),
        ]);
      }
    );
  }
}
