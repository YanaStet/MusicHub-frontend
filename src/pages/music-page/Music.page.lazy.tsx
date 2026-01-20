import { sharedHooks } from "@/shared/hooks";

export const MusicPageLazy = sharedHooks.useLazyWithRetry(() =>
  import("./Music.page").then((module) => ({ default: module.MusicPage })),
);
