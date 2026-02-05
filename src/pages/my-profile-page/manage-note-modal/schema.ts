import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_COVER_SIZE = 5 * 1024 * 1024;

const PDF_TYPES = ["application/pdf"];

const AUDIO_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/mp4",
  "audio/x-m4a",
];

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const createNoteSchema = z.object({
  title: z.string().min(2, { error: "Title is too short" }),
  description: z.string().optional(),

  pdf: z
    .custom<File>()
    .refine((file) => file instanceof File, {
      message: "Please, download PDF file",
    })
    .refine((file) => file && PDF_TYPES.includes(file.type), {
      message: "The format must be .pdf",
    })
    .refine((file) => file && file.size <= MAX_FILE_SIZE, {
      message: `Size cant be larger than 10MB`,
    }),

  audio: z
    .custom<File>()
    .refine((file) => file instanceof File, "Audio file is required")
    .refine((file) => file && AUDIO_TYPES.includes(file.type), {
      message: "Supported formats: .mp3, .wav, .ogg, .m4a",
    })
    .refine((file) => file && file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 10MB",
    }),

  cover: z
    .custom<File>()
    .refine((file) => file instanceof File, "Cover image is required")
    .refine((file) => file && IMAGE_TYPES.includes(file.type), {
      message: "Supported formats: .jpg, .png, .webp",
    })
    .refine((file) => file && file.size <= MAX_COVER_SIZE, {
      message: "Max image size is 5MB",
    }),
});

export type CreateNoteSchema = z.infer<typeof createNoteSchema>;
