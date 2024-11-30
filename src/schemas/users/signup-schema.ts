import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 3 characters long"),
});

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
}
