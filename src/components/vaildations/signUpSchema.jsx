
import { z } from 'zod';

const signUpSchema = z.object({
  firstName: z.string()
    .min(2, { message: "First name is required" })
    .max(20, { message: "First name cannot exceed 20 characters" }),
  
  lastName: z.string()
    .min(2, { message: "Last name is required" })
    .max(20, { message: "Last name cannot exceed 20 characters" }),
    
    email: z.string()
    .min(1, { message: "Email address is required" })
    .email({ message: "Invalid email address format" }),

  password: z.string()
  .min(8, { message: "Password must be at least 8 characters long" }),
  
  confirmPassword: z.string()
  .min(1, { message: "Confirm Password is required" }),
}).refine((input) => input.password === input.confirmPassword, {
  message: "Password and confirm password do not match",
  path: ["confirmPassword"],
});

export default signUpSchema;