import { useLoginMutation } from "./useLoginMutation";
import { useLogoutMutation } from "./useLogoutMutation";
import { useMeQuery } from "./useMeQuery";
import { useMySongsInfinityQuery } from "./useMySongsInfinityQuery";
import { useRegisterMutation } from "./useRegisterMutation";
import { useUpdateProfileMutation } from "./useUpdateProfileMutation";

export const authHooks = {
  useMeQuery,
  useMySongsInfinityQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
};
