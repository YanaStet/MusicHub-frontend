import { usePaginatedNoteQuery } from "./usePaginatedNoteQuery";
import { useNoteInfinityQuery } from "./useNoteInfinityQuery";
import { useNoteByIdQuery } from "./useNoteByIdQuery";
import { useCreateNoteMutation } from "./useCreateNoteMutation";
import { useDeleteNoteMutation } from "./useDeleteNoteMutation";
import { useNoteByComposerIdQuery } from "./useNoteByComposerIdQuery";
import { useUpdateNoteMutation } from "./useUpdateNoteMutation";
import { useViewNoteMutation } from "./useViewNoteMutation";
import { useLikeNoteMutation } from "./useLikeNoteMutation";
import { useDownloadNoteMutation } from "./useDownloadNoteMutation";

export const noteHooks = {
  usePaginatedNoteQuery,
  useNoteInfinityQuery,
  useNoteByIdQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useNoteByComposerIdQuery,
  useUpdateNoteMutation,
  useViewNoteMutation,
  useLikeNoteMutation,
  useDownloadNoteMutation,
};
