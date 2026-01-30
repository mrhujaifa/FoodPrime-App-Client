import { email, z } from "zod";
export const userSignUpSchema = z.object({
  name: z.string().min(5, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  address: z.string().min(5, "Please provide a fuller address"),
});

export const userSignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type UserRegistrationInput = z.infer<typeof userSignUpSchema>;
