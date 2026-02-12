import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { SUBSCRIPTION_CONSTANTS, type Subscription } from "../model";
import { subscriptionService } from "../api/service";
import { AxiosError } from "axios";

export function useSubscriptionsQuery<TData = Subscription[]>(
  options?: Partial<UseQueryOptions<Subscription[], AxiosError, TData>>,
): UseQueryResult<TData> {
  return useQuery<Subscription[], AxiosError, TData>({
    queryKey: [SUBSCRIPTION_CONSTANTS.GET_ALL_SUBSCRIPTIONS],
    queryFn: () => subscriptionService.getSubscription(),
    ...options,
  });
}
