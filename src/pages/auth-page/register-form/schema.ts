import z from "zod";

export const registerSchema = z.object({
  email: z.email({ error: "Enter correct email." }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters." }),
  firstName: z.string().min(2, { error: "Too short" }),
  lastName: z.string().min(2, { error: "Too short" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
