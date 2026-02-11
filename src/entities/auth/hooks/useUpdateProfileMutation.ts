import type { Composer } from "@/entities/composer/model";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { authService } from "../api/service";
import type { AxiosError } from "axios";
import type { UpdateProfileRequest } from "../model";

export function useUpdateProfileMutation(): UseMutationResult<
  Composer,
  AxiosError<Error>,
  UpdateProfileRequest
> {
  return useMutation({
    mutationFn: (body: UpdateProfileRequest) => authService.updateProfile(body),
  });
}
