import type { Composer } from "@/entities/composer/model";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { LoginRequest } from "../model";
import { authService } from "../api/service";

export function useLoginMutation(): UseMutationResult<
  Composer,
  AxiosError<{}>,
  LoginRequest
> {
  return useMutation({
    mutationFn: (body: LoginRequest) => authService.login(body),
  });
}
