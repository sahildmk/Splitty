import type { Prisma, Transaction } from "@prisma/client";
import type { Context } from "@server-context";
// import { prisma } from "../client";

//#region Transactions

export async function GetAllTransactions(
  context: Context
): Promise<Transaction[]> {
  return await context.prisma.transaction.findMany({
    where: { userId: { equals: context.session?.user?.id } },
  });
}

export async function AddTransactions(
  context: Context,
  transactions: Prisma.TransactionCreateManyInput[]
): Promise<void> {
  transactions;

  await context.prisma.transaction.createMany({ data: transactions });
}

//#endregion Transactions
