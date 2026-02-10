import z from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Enter correct email." }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters." }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
