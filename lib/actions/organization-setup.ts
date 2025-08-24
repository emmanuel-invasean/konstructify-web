"use server";

import { z } from "zod";
import { organizationSetupSchema } from "@/lib/validators/organization";
import { createOrganization, type Organization } from "./organization";
import { createTeam, type Team } from "./team";
import { inviteMemberToOrganization } from "./member";
import { createUser } from "./user";
import { generatePassword } from "@/lib/utils";

export type SetupInput = z.infer<typeof organizationSetupSchema>;

// Re-export as a new async function for backward compatibility
export async function addMemberToOrganization(input: import("./member").AddMemberInput) {
  return import("./member").then(({ addMemberToOrganization }) => addMemberToOrganization(input));
}

/**
 * Orchestrates the complete organization setup process:
 * 1. Creates organization
 * 2. Creates initial team
 * 3. Processes member invitations
 */
export async function setupOrganization(
  input: SetupInput,
): Promise<
  | {
      ok: true;
      data: {
        user: { id: string; name: string; email: string };
        organization: Organization;
        team: Team;
        invitations: Array<{
          email: string;
          role: string;
          status: string;
          organizationId: string;
          teamId?: string;
        }>;
      };
    }
  | { ok: false; error: string }
> {
  try {
    // Validate input
    const validatedInput = organizationSetupSchema.parse(input);

    // Step 1: Create user with generated password
    const password = generatePassword();
    const userResult = await createUser({
      name: validatedInput.user.name,
      email: validatedInput.user.email,
      password,
      // TODO: Add callback URL for password reset
    });

    if (!userResult.success) {
      return {
        ok: false,
        error: userResult.error,
      };
    }

    // Step 2: Create organization
    const orgResult = await createOrganization({
      name: validatedInput.organization.name,
      slug: validatedInput.organization.slug,
    });

    if (!orgResult.success) {
      return {
        ok: false,
        error: orgResult.error,
      };
    }

    // Step 2: Create team
    const teamResult = await createTeam({
      name: validatedInput.team.name,
      organizationId: orgResult.data.id,
    });

    if (!teamResult.success) {
      return {
        ok: false,
        error: teamResult.error,
      };
    }

    // Step 3: Process member invitations
    const invitationResults = [];

    for (const member of validatedInput.members) {
      try {
        const inviteResult = await inviteMemberToOrganization({
          email: member.email,
          role: member.role,
          organizationId: orgResult.data.id,
          teamId: teamResult.data.id,
        });

        if (inviteResult.success) {
          invitationResults.push(inviteResult.data);
        } else {
          console.error(
            `Failed to invite ${member.email}:`,
            inviteResult.error,
          );
        }
      } catch (error) {
        console.error(`Failed to process member ${member.email}:`, error);
      }
    }

    return {
      ok: true,
      data: {
        user: userResult.data,
        organization: orgResult.data,
        team: teamResult.data,
        invitations: invitationResults,
      },
    };
  } catch (error) {
    console.error("Organization setup failed:", error);
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Organization setup failed",
    };
  }
}
