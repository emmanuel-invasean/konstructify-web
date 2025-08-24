import { describe, it, expect, vi, beforeEach } from "vitest";
import { auth } from "@/lib/auth";
import { setupOrganization } from "@/lib/actions/organization-setup";

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      createOrganization: vi.fn(),
      createTeam: vi.fn(),
      signUpEmail: vi.fn(),
      addMember: vi.fn(),
    },
  },
}));

describe("setupOrganization", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should successfully create user, organization, team, and invite members", async () => {
    const mockUser = {
      token: null,
      user: {
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        image: null,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    const mockOrg = {
      id: "org-1",
      name: "Test Org",
      slug: "test-org",
      createdAt: new Date(),
      metadata: {},
      members: [],
    };
    const mockTeam = {
      id: "team-1",
      name: "Test Team",
      organizationId: "org-1",
      createdAt: new Date(),
    };
    const mockInvite = {
      id: "invite-1",
      organizationId: "org-1",
      userId: "user-1",
      role: "member",
      createdAt: new Date(),
    };

    vi.mocked(auth.api.signUpEmail).mockResolvedValue(mockUser);
    vi.mocked(auth.api.createOrganization).mockResolvedValue(mockOrg);
    vi.mocked(auth.api.createTeam).mockResolvedValue(mockTeam);
    vi.mocked(auth.api.addMember).mockResolvedValue(mockInvite);

    const result = await setupOrganization({
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
      organization: {
        name: "Test Org",
        slug: "test-org",
      },
      team: {
        name: "Test Team",
      },
      members: [
        {
          email: "test@example.com",
          role: "member",
        },
      ],
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.user).toEqual(mockUser);
      expect(result.data.organization).toEqual(mockOrg);
      expect(result.data.team).toEqual(mockTeam);
    }

    expect(auth.api.createOrganization).toHaveBeenCalledWith({
      body: {
        name: "Test Org",
        slug: "test-org",
      },
    });

    expect(auth.api.createTeam).toHaveBeenCalledWith({
      body: {
        name: "Test Team",
        organizationId: "org-1",
      },
    });

    expect(auth.api.addMember).toHaveBeenCalledWith({
      body: {
        email: "test@example.com",
        role: "member",
        organizationId: "org-1",
        teamId: "team-1",
      },
    });
  });

  it("should handle validation errors", async () => {
    const result = await setupOrganization({
      user: {
        name: "", // Invalid: empty name
        email: "invalid-email", // Invalid: not an email
      },
      organization: {
        name: "", // Invalid: empty name
        slug: "test",
      },
      team: {
        name: "Test Team",
      },
      members: [], // Invalid: empty members array
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("validation");
    }
  });

  it("should handle organization creation failure", async () => {
    vi.mocked(auth.api.signUpEmail).mockResolvedValue({
      token: null,
      user: {
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        image: null,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    vi.mocked(auth.api.createOrganization).mockResolvedValue(null);

    const result = await setupOrganization({
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
      organization: {
        name: "Test Org",
      },
      team: {
        name: "Test Team",
      },
      members: [
        {
          email: "test@example.com",
          role: "member",
        },
      ],
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Failed to create organization");
    }
  });

  it("should handle team creation failure", async () => {
    vi.mocked(auth.api.signUpEmail).mockResolvedValue({
      token: null,
      user: {
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        image: null,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    vi.mocked(auth.api.createOrganization).mockResolvedValue({
      id: "org-1",
      name: "Test Org",
      slug: "test-org",
      createdAt: new Date(),
      metadata: {},
      members: [],
    });
    vi.mocked(auth.api.createTeam).mockResolvedValue(null as any);

    const result = await setupOrganization({
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
      organization: {
        name: "Test Org",
      },
      team: {
        name: "Test Team",
      },
      members: [
        {
          email: "test@example.com",
          role: "member",
        },
      ],
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Failed to create team");
    }
  });
});
