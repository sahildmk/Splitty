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
import {
  WestpacTransaction,
  WestpacHeaders,
  GetSavedTransactions,
} from "@/lib/transactions";
import { useQuery } from "@tanstack/react-query";

const Home: NextPage = () => {
  const [transactions, setTransactions] = useState<WestpacTransaction[]>([]);
  const { isLoading, error, data } = useQuery(
    ["transactions"],
    GetSavedTransactions
  );

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

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
                HandleFileOnChange(e, setTransactions);
              }}
            />
          </form>
        </div>

        {data?.map((transaction, index) => (
          <div
            key={index}
            className="flex border border-solid border-white my-4 px-3 py-4 hover:scale-[1.03] transition-all rounded-md hover:cursor-pointer max-w-xl"
          >
            <div>{transaction.Date.toString()}</div>
            <div className="ml-5">{transaction.Description}</div>
            <div className="ml-auto">
              $ <span className="text-red-500">{transaction.DebitAmount}</span>
              <span className="text-green-500">{transaction.CreditAmount}</span>
            </div>
          </div>
        ))}
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;

function HandleFileOnChange(
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
