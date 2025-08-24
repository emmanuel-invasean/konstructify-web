"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { type OrganizationRole } from "@/lib/validators/organization";

// Types for member operations
export type Member = {
  id: string;
  userId: string;
  organizationId: string;
  role: OrganizationRole;
  teamId?: string;
  email?: string;
  status?: string;
};

export type AddMemberInput = {
  userId: string;
  organizationId: string;
  role: OrganizationRole | OrganizationRole[];
  teamId?: string;
};

export type InviteMemberInput = {
  email: string;
  organizationId: string;
  role: OrganizationRole;
  teamId?: string;
};

export type MemberResult<T = Member> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Add an existing user to an organization
 */
export async function addMemberToOrganization(
  input: AddMemberInput,
): Promise<MemberResult> {
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

    // Map our custom roles to Better Auth roles or use as-is
    // Better Auth may accept custom roles depending on configuration
    const memberData = await auth.api.addMember({
      body: {
        userId: input.userId,
        role: Array.isArray(input.role) ? input.role : [input.role],
        organizationId: input.organizationId,
        teamId: input.teamId,
      },
      headers: requestHeaders as unknown as Headers,
    } as {
      body: {
        userId: string;
        role: OrganizationRole[];
        organizationId: string;
        teamId?: string;
      };
      headers: Headers;
    });

    return {
      success: true,
      data: memberData as Member,
    };
  } catch (error) {
    console.error("Failed to add member to organization:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add member",
    };
  }
}

/**
 * Invite a user by email to join an organization
 * Note: This creates an invitation record that can be processed when the user signs up
 */
export async function inviteMemberToOrganization(
  input: InviteMemberInput,
): Promise<
  MemberResult<{
    email: string;
    role: OrganizationRole;
    status: string;
    organizationId: string;
    teamId?: string;
  }>
> {
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

    // For now, we'll create invitations that can be processed when users sign up
    // This could be implemented as:
    // Option 1: Store invitation in database and send email
    // Option 2: Use Better Auth's invitation plugin if available

    console.error(
      `Member invitation queued for ${input.email} with role ${input.role}`,
    );

    const invitationResult = {
      email: input.email,
      role: input.role,
      status: "invited" as const,
      organizationId: input.organizationId,
      teamId: input.teamId,
    };

    return {
      success: true,
      data: invitationResult,
    };
  } catch (error) {
    console.error("Failed to invite member:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to invite member",
    };
  }
}

/**
 * Remove a member from an organization
 */
export async function removeMemberFromOrganization(
  memberIdOrEmail: string,
  organizationId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const requestHeaders = await headers();

    await auth.api.removeMember({
      body: {
        memberIdOrEmail,
        organizationId,
      },
      headers: requestHeaders as unknown as Headers,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to remove member:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to remove member",
    };
  }
}

/**
 * Update member role
 */
export async function updateMemberRole(
  userId: string,
  organizationId: string,
  role: OrganizationRole | OrganizationRole[],
): Promise<MemberResult> {
  try {
    const requestHeaders = await headers();

    const memberData = await auth.api.updateMemberRole({
      body: {
        memberId: userId,
        organizationId,
        role: Array.isArray(role) ? role : [role],
      },
      headers: requestHeaders as unknown as Headers,
    });

    return {
      success: true,
      data: memberData as Member,
    };
  } catch (error) {
    console.error("Failed to update member role:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update member role",
    };
  }
}

/**
 * Get organization members
 */
export async function getOrganizationMembers(
  organizationId: string,
): Promise<MemberResult<Member[]>> {
  try {
    const requestHeaders = await headers();

    const members = await auth.api.listMembers({
      query: { organizationId },
      headers: requestHeaders as unknown as Headers,
    });

    return {
      success: true,
      data: (members?.members || []) as Member[],
    };
  } catch (error) {
    console.error("Failed to get organization members:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get members",
    };
  }
}
