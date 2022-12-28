import { z } from "zod";
import * as TransactionRespoitory from "@db/transactions/transactionsRepository";

import { router, protectedProcedure } from "../trpc";
import type { Prisma, Transaction } from "@prisma/client";
import type { Context } from "../context";

export const transactionsRouter = router({
  getAllTransactions: protectedProcedure.query(async ({ ctx }) => {
    return await TransactionRespoitory.GetAllTransactions(ctx);
  }),

  getAllTransactionsByDate: protectedProcedure.query(async ({ ctx }) => {
    return await GetAllTransactionsByDate(ctx);
  }),

  uploadTransactions: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.optional(z.number()),
          userId: z.string(),
          date: z.date(),
          description: z.string(),
          debitAmount: z.optional(z.number()),
          creditAmount: z.optional(z.number()),
          isSplitTransaction: z.boolean(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      const transactions = input satisfies Prisma.TransactionCreateManyInput[];

      await TransactionRespoitory.AddTransactions(ctx, transactions);

      return GetAllTransactionsByDate(ctx);
    }),
});

export type TransactionsByDateResult = { [key: string]: Transaction[] };

async function GetAllTransactionsByDate(ctx: Context) {
  const transactions = await TransactionRespoitory.GetAllTransactions(ctx);

  return GroupTransactionsByDate(transactions);
}

export function GroupTransactionsByDate(
  transactions: Transaction[]
): TransactionsByDateResult {
  const collection: TransactionsByDateResult = {};

  // Collect transactions by date
  for (const idx in transactions) {
    const trx = transactions[idx];

    if (!trx) continue;

    const key = trx.date.toUTCString();

    if (!collection[key]) {
      collection[key] = [trx];
    } else {
      collection[key]?.push(trx);
    }
  }

  return collection;
}
