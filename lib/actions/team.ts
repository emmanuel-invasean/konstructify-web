"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Types for team operations
export type Team = {
  id: string;
  name: string;
  organizationId: string;
};

export type CreateTeamInput = {
  name: string;
  organizationId: string;
};

export type TeamResult<T = Team> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Create a new team within an organization
 */
export async function createTeam(input: CreateTeamInput): Promise<TeamResult> {
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

    const team = await auth.api.createTeam({
      body: {
        name: input.name,
        organizationId: input.organizationId,
      },
      headers: requestHeaders as unknown as Headers,
    });

    if (!team?.id) {
      throw new Error("Failed to create team");
    }

    return {
      success: true,
      data: team as Team,
    };
  } catch (error) {
    console.error("Failed to create team:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create team",
    };
  }
}

// TODO: Implement additional team management functions when Better Auth API methods are available:
// - getTeam(teamId: string)
// - getOrganizationTeams(organizationId: string)
// - updateTeam(teamId: string, updates: Partial<CreateTeamInput>)
// - deleteTeam(teamId: string)
