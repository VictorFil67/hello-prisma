import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().optional(),
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
  title: z.string(),
  bio: z.string().optional(),
  content: z.string(),
});

export type SignupType = z.infer<typeof signupSchema>;
