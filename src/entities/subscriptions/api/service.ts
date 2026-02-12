import { api } from "@/shared/api/api";
import type { Subscription } from "../model";

class SubscriptionService {
  async getSubscription(): Promise<Subscription[]> {
    const data = await api.get<Subscription[]>("/subscriptions");
    return data;
  }

  async buySubscription(): Promise<{}> {
    const data = await api.post<{}, {}>("/subscriptions/purchase", {});
    return data;
  }
}

export const subscriptionService = new SubscriptionService();
