//forms lai validate garna parxa, before sending them to backend
// Imports the zod library for schema validation
import { z } from "zod";

// Defines the login schema with validation rules
export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

// Defines the signup schema with validation rules
export const signupSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Defines the address schema with validation rules
export const addressSchema = z.object({
    street: z.string().min(1, 'Steet is required'), // Requires a string with minimum length of 1
    city: z.string().min(1, 'City is required'), // Requires a string with minimum length of 1
    zip: z.string().min(5, 'Invalid ZIP code'), // Requires a string with minimum length of 5
});

//schema for login form validation
export const LoginFormSchema= z.object({
    email:z.email({
        message:"Please enter a valid email address",
    }),
    password:z.string().min(8,{
        message:"Password must be at least 8 characters long",
    })
})