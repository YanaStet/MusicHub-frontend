import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { authService } from "../api/service";

export function useLogoutMutation(): UseMutationResult<{}, AxiosError<{}>, {}> {
  return useMutation({
    mutationFn: () => authService.logout(),
  });
}
