import { usePaginatedNoteQuery } from "./usePaginatedNoteQuery";
import { useNoteInfinityQuery } from "./useNoteInfinityQuery";
import { useNoteByIdQuery } from "./useNoteByIdQuery";
import { useCreateNoteMutation } from "./useCreateNoteMutation";
import { useDeleteNoteMutation } from "./useDeleteNoteMutation";
import { useNoteByComposerIdQuery } from "./useNoteByComposerIdQuery";

export const noteHooks = {
  usePaginatedNoteQuery,
  useNoteInfinityQuery,
  useNoteByIdQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useNoteByComposerIdQuery,
};
