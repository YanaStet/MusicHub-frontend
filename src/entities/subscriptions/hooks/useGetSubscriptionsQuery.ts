import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { SUBSCRIPTION_CONSTANTS, type SubscriptionResponse } from "../model";
import { subscriptionService } from "../api/service";
import { AxiosError } from "axios";

export function useSubscriptionsQuery<TData = SubscriptionResponse>(
  options?: Partial<UseQueryOptions<SubscriptionResponse, AxiosError, TData>>,
): UseQueryResult<TData> {
  return useQuery<SubscriptionResponse, AxiosError, TData>({
    queryKey: [SUBSCRIPTION_CONSTANTS.GET_ALL_SUBSCRIPTIONS],
    queryFn: () => subscriptionService.getSubscription(),
    ...options,
  });
}
