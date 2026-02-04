import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, "Назва обов'язкова"),
  description: z.string().optional(),
  isPublic: z.boolean().default(false),

  pdf: z
    .custom<File>()
    .optional()
    .refine((file) => file instanceof File, "PDF файл обов'язковий")
    .refine((file) => file?.type === "application/pdf", "Тільки PDF формат"),

  audio: z
    .custom<File>()
    .optional()
    .refine((file) => file instanceof File, "Аудіо файл обов'язковий")
    .refine((file) => file?.type.startsWith("audio/"), "Тільки аудіо файли"),

  cover: z
    .custom<File>()
    .optional()
    .refine((file) => file instanceof File, "Обкладинка обов'язкова")
    .refine((file) => file?.type.startsWith("image/"), "Тільки зображення"),
});

export type CreateNoteSchema = z.infer<typeof createNoteSchema>;
