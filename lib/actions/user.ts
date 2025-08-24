"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

// Types for user operations
export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  image?: string;
  callbackURL?: string;
};

export type UserResult<T = User> =
  | { success: true; data: T }
  | { success: false; error: string };

// Validation schema for user creation
const createUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  image: z.string().url("Please enter a valid image URL").optional(),
  callbackURL: z.string().url("Please enter a valid callback URL").optional(),
});

/**
 * Create a new user with email and password
 */
export async function createUser(input: CreateUserInput): Promise<UserResult> {
  try {
    // Validate input
    const validatedInput = createUserSchema.parse(input);

    const requestHeaders = await headers();

    const userData = await auth.api.signUpEmail({
      body: {
        name: validatedInput.name,
        email: validatedInput.email,
        password: validatedInput.password,
        image: validatedInput.image,
        callbackURL: validatedInput.callbackURL,
      },
      headers: requestHeaders as unknown as Headers,
    });

    if (!userData) {
      throw new Error("Failed to create user");
    }

    return {
      success: true,
      data: ((userData as any)?.user || userData) as unknown as User,
    };
  } catch (error) {
    console.error("Failed to create user:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return {
        success: false,
        error: firstError?.message || "Validation failed",
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create user",
    };
  }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<UserResult> {
  try {
    const requestHeaders = await headers();

    const session = await auth.api.getSession({
      headers: requestHeaders as unknown as Headers,
    });

    if (!session?.session || !session?.user) {
      return {
        success: false,
        error: "No authenticated user found",
      };
    }

    return {
      success: true,
      data: session.user as User,
    };
  } catch (error) {
    console.error("Failed to get current user:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get current user",
    };
  }
}

/**
 * Check if user exists by email
 */
export async function getUserByEmail(email: string): Promise<UserResult> {
  try {
    // Note: This is a placeholder - Better Auth might not have a direct getUserByEmail method
    // This would typically be implemented by querying the database directly
    // or using a search API if available

    console.log(`Checking if user exists with email: ${email}`);

    // TODO: Implement when Better Auth provides a user lookup method
    // For now, return a placeholder response
    return {
      success: false,
      error: "User lookup not implemented - Better Auth API method needed",
    };
  } catch (error) {
    console.error("Failed to get user by email:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get user by email",
    };
  }
}

// TODO: Implement additional user management functions when Better Auth API methods are available:
// - updateUser(userId: string, updates: Partial<User>)
// - deleteUser(userId: string)
// - changePassword(userId: string, currentPassword: string, newPassword: string)
// - resetPassword(email: string)
// - verifyEmail(token: string)
