import { sharedHooks } from "@/shared/hooks";

export const ProfilePageLazy = sharedHooks.useLazyWithRetry(() =>
  import("./Profile.page").then((module) => ({ default: module.ProfilePage })),
);
