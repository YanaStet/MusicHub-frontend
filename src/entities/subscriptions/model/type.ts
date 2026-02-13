import type { PaginatedData } from "@/shared/types/common";

export type Subscription = {
  id: number;
  name: string;
  price: number;
  currency: string;
  features: {};
  description: string;
};

export type SubscriptionResponse = PaginatedData<Subscription>;
