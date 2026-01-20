import { sharedHooks } from "@/shared/hooks";

export const AuthPageLazy = sharedHooks.useLazyWithRetry(() =>
  import("./Auth.page").then((module) => ({ default: module.AuthPage })),
);
