import type { Composer } from "@/entities/composer/model";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { RegisterRequest } from "../model";
import { authService } from "../api/service";
import type { AxiosError } from "axios";

export function useRegisterMutation(): UseMutationResult<
  Composer,
  AxiosError<Error>,
  RegisterRequest
> {
  return useMutation({
    mutationFn: (body: RegisterRequest) => authService.register(body),
  });
}
