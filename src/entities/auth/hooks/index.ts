import { useLoginMutation } from "./useLoginMutation";
import { useLogoutMutation } from "./useLogoutMutation";
import { useMeQuery } from "./useMeQuery";
import { useMySongsInfinityQuery } from "./useMySongsInfinityQuery";
import { useRegisterMutation } from "./useRegisterMutation";

export const authHooks = {
  useMeQuery,
  useMySongsInfinityQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
};
