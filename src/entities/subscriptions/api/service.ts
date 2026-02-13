import { api } from "@/shared/api/api";
import type { SubscriptionResponse } from "../model";

class SubscriptionService {
  async getSubscription(): Promise<SubscriptionResponse> {
    const data = await api.get<SubscriptionResponse>("/subscriptions");
    return data;
  }

  async buySubscription(): Promise<{}> {
    const data = await api.post<{}, {}>("/subscriptions/purchase", {});
    return data;
  }
}

export const subscriptionService = new SubscriptionService();
