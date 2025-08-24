import { z } from "zod";

// Better Auth supported roles
export const organizationRoles = ["admin", "member", "owner"] as const;

export const memberSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(organizationRoles).describe("User role in the organization"),
});

export const organizationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(
      /^[\w\s-]+$/,
      "Name can only contain letters, numbers, spaces, and hyphens",
    ),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(50, "Slug cannot exceed 50 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    )
    .optional(),
});

export const teamSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(
      /^[\w\s-]+$/,
      "Name can only contain letters, numbers, spaces, and hyphens",
    ),
});

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Please enter a valid email address"),
});

export const organizationSetupSchema = z.object({
  user: userSchema,
  organization: organizationSchema,
  team: teamSchema,
  members: z
    .array(memberSchema)
    .min(1, "Add at least one member")
    .max(20, "Maximum 20 members can be invited at once"),
});

export type OrganizationSetupInput = z.infer<typeof organizationSetupSchema>;
export type MemberInput = z.infer<typeof memberSchema>;
export type OrganizationRole = z.infer<typeof memberSchema.shape.role>;
