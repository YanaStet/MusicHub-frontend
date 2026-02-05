import z from "zod";

const MAX_COVER_SIZE = 5 * 1024 * 1024;

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const editProfileSchema = z.object({
  firstName: z.string().min(2, { error: "First name is too short." }),
  lastName: z.string().min(2, { error: "Last name is too short." }),
  bio: z.string().optional(),
  avatar: z
    .custom<File>()
    .refine((file) => file instanceof File, "Cover image is required")
    .refine((file) => file && IMAGE_TYPES.includes(file.type), {
      message: "Supported formats: .jpg, .png, .webp",
    })
    .refine((file) => file && file.size <= MAX_COVER_SIZE, {
      message: "Max image size is 5MB",
    }),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
