import z from "zod";

export const editNoteSchema = z.object({
  title: z.string().min(2, { error: "Title is too short" }),
  description: z.string().optional(),
});

export type EditNoteSchema = z.infer<typeof editNoteSchema>;
