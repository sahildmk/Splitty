import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { transactionsRouter } from "./transactions";

export const appRouter = router({
  transactions: transactionsRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
