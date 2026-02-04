import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  isPublic: z.boolean().default(false),

  pdf: z
    .custom<File>()
    .optional()
    .refine((file) => file instanceof File, "PDF file is required.")
    .refine((file) => file?.type === "application/pdf", "Only pdf format"),

  audio: z
    .custom<File>()
    .optional()
    .refine((file) => file instanceof File, "Audio file is required.")
    .refine((file) => file?.type.startsWith("audio/"), "Only audio files"),

  cover: z
    .custom<File>()
    .optional()
    .refine((file) => file instanceof File, "Cover is required.")
    .refine((file) => file?.type.startsWith("image/"), "Only images"),
});

export type CreateNoteSchema = z.infer<typeof createNoteSchema>;
