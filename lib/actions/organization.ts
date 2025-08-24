"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Types for organization operations
export type Organization = {
  id: string;
  name: string;
  slug?: string;
};

export type CreateOrganizationInput = {
  name: string;
  slug?: string;
};

export type OrganizationResult<T = Organization> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Create a new organization
 */
export async function createOrganization(
  input: CreateOrganizationInput,
): Promise<OrganizationResult> {
  try {
    const requestHeaders = await headers();

    // Check authentication
    const session = await auth.api.getSession({
      headers: requestHeaders as unknown as Headers,
    });

    if (!session?.session) {
      return {
        success: false,
        error: "Authentication required. Please sign in first.",
      };
    }

    const organization = await auth.api.createOrganization({
      body: {
        name: input.name,
        slug: input.slug || input.name.toLowerCase().replace(/\s+/g, "-"),
      },
      headers: requestHeaders as unknown as Headers,
    });

    if (!organization?.id) {
      throw new Error("Failed to create organization");
    }

    return {
      success: true,
      data: organization as Organization,
    };
  } catch (error) {
    console.error("Failed to create organization:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create organization",
    };
  }
}

// TODO: Implement getOrganization when Better Auth API method is available
// TODO: Implement updateOrganization when Better Auth API method is available
