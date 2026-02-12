import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { subscriptionService } from "../api/service";

export function useBuySubscriptionMutation(): UseMutationResult<
  {},
  AxiosError<{}>,
  {}
> {
  return useMutation({
    mutationFn: () => subscriptionService.buySubscription(),
  });
}
