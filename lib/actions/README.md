# Better Auth Actions

This directory contains organized server actions for managing organizations, teams, and members using Better Auth.

## File Structure

### 📁 `organization.ts`

**Purpose**: Organization management operations

- `createOrganization(input)` - Create new organization
- Types: `Organization`, `CreateOrganizationInput`, `OrganizationResult`

**Available Methods:**

- ✅ `createOrganization` - Working with Better Auth API

**TODO Methods** (when Better Auth API is available):

- `getOrganization`
- `updateOrganization`

### 📁 `team.ts`

**Purpose**: Team management within organizations

- `createTeam(input)` - Create new team in organization
- Types: `Team`, `CreateTeamInput`, `TeamResult`

**Available Methods:**

- ✅ `createTeam` - Working with Better Auth API

**TODO Methods** (when Better Auth API is available):

- `getTeam`
- `getOrganizationTeams`
- `updateTeam`
- `deleteTeam`

### 📁 `member.ts`

**Purpose**: Member/user management within organizations

- `addMemberToOrganization(input)` - Add existing user to organization
- `inviteMemberToOrganization(input)` - Invite user by email
- Types: `Member`, `AddMemberInput`, `InviteMemberInput`, `MemberResult`

**Available Methods:**

- ✅ `addMemberToOrganization` - Working with Better Auth API
- ✅ `inviteMemberToOrganization` - Custom invitation queueing
- ✅ `removeMemberFromOrganization` - Working with Better Auth API
- ✅ `updateMemberRole` - Working with Better Auth API
- ✅ `getOrganizationMembers` - Working with Better Auth API

### 📁 `user.ts`

**Purpose**: User account management

- `createUser(input)` - Create new user account with email/password
- `getCurrentUser()` - Get current authenticated user
- Types: `User`, `CreateUserInput`, `UserResult`

**Available Methods:**

- ✅ `createUser` - Working with Better Auth API
- ✅ `getCurrentUser` - Working with Better Auth API

**TODO Methods** (when Better Auth API is available):

- `getUserByEmail`
- `updateUser`
- `deleteUser`
- `changePassword`
- `resetPassword`
- `verifyEmail`

### 📁 `organization-setup.ts`

**Purpose**: Orchestrates complete organization setup flow

- `setupOrganization(input)` - Creates org + team + invites members
- Re-exports: `addMemberToOrganization` for backward compatibility

**Flow:**

1. Create organization
2. Create initial team
3. Process member invitations
4. Return complete setup result

## Usage Examples

### Basic Organization Setup

```typescript
import { setupOrganization } from "@/lib/actions/organization-setup";

const result = await setupOrganization({
  organization: { name: "Acme Corp", slug: "acme" },
  team: { name: "Development" },
  members: [
    { email: "john@acme.com", role: "admin" },
    { email: "jane@acme.com", role: "member" },
  ],
});
```

### Individual Operations

```typescript
import { createOrganization } from "@/lib/actions/organization";
import { createTeam } from "@/lib/actions/team";
import { addMemberToOrganization } from "@/lib/actions/member";
import { createUser } from "@/lib/actions/user";

// Create new user
const userResult = await createUser({
  name: "John Doe",
  email: "john@example.com",
  password: "securePassword123",
  image: "https://example.com/avatar.jpg",
});

// Create organization
const orgResult = await createOrganization({
  name: "My Org",
});

// Create team
const teamResult = await createTeam({
  name: "My Team",
  organizationId: orgResult.data.id,
});

// Add existing user to organization
const memberResult = await addMemberToOrganization({
  userId: userResult.data.id,
  organizationId: orgResult.data.id,
  role: "member",
  teamId: teamResult.data.id,
});
```

### User Management

```typescript
import { createUser, getCurrentUser } from "@/lib/actions/user";

// Create new user account
const newUser = await createUser({
  name: "Jane Smith",
  email: "jane@company.com",
  password: "strongPassword456",
  callbackURL: "https://app.com/welcome",
});

// Get current authenticated user
const currentUser = await getCurrentUser();
if (currentUser.success) {
  console.log("Logged in as:", currentUser.data.name);
}
```

## Design Principles

### 🔒 **Authentication First**

All actions verify user authentication before proceeding

### 🎯 **Single Responsibility**

Each file handles one domain (org, team, member)

### 🔄 **Consistent Return Types**

```typescript
type Result<T> = { success: true; data: T } | { success: false; error: string };
```

### 🛡️ **Error Handling**

- Comprehensive try/catch blocks
- Meaningful error messages
- Console logging for debugging

### 📝 **Type Safety**

- Full TypeScript support
- Exported types for all inputs/outputs
- Integration with validation schemas

### 🔧 **Better Auth Integration**

- Proper header forwarding for authentication
- Compatible with Better Auth organization plugin
- Custom role support with type safety

## Migration Notes

### From Original `organization-setup.ts`

- ✅ All functionality preserved
- ✅ Backward compatibility maintained via re-exports
- ✅ Improved error handling and type safety
- ✅ Better separation of concerns

### Future Enhancements

- Email invitation system integration
- Better Auth invitation plugin usage
- Advanced member management features
- Organization settings and permissions
