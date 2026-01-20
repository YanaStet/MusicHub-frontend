import { sharedHooks } from "@/shared/hooks";

export const SubscriptionPageLazy = sharedHooks.useLazyWithRetry(() =>
  import("./Subscription.page").then((module) => ({
    default: module.SubscriptionPage,
  })),
);
