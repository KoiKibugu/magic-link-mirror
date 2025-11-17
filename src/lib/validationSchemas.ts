import { z } from "zod";

export const taskSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z.string()
    .trim()
    .max(2000, "Description must be less than 2000 characters")
    .optional(),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .optional()
    .or(z.literal("")),
  priority: z.enum(["low", "medium", "high"]),
  status: z.string().min(1, "Status is required"),
  department_id: z.string().uuid("Invalid department ID"),
  assigned_to: z.string().uuid("Invalid user ID").nullable(),
  due_date: z.string().nullable(),
  created_by: z.string().uuid("Invalid user ID"),
});

export const ticketSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z.string()
    .trim()
    .max(2000, "Description must be less than 2000 characters")
    .optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  department_id: z.string().uuid("Invalid department ID"),
  created_by: z.string().uuid("Invalid user ID"),
  assigned_to: z.string().uuid("Invalid user ID").nullable(),
});

export const authSchema = z.object({
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters"),
  fullName: z.string()
    .trim()
    .min(1, "Full name is required")
    .max(100, "Full name must be less than 100 characters")
    .optional(),
});
