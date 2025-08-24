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
- `removeMemberFromOrganization(memberIdOrEmail, organizationId)` - Remove member
- `updateMemberRole(userId, organizationId, role)` - Update member role
- `getOrganizationMembers(organizationId)` - Get all organization members
- Types: `Member`, `AddMemberInput`, `InviteMemberInput`, `MemberResult`

**Available Methods:**

- ✅ `addMemberToOrganization` - Working with Better Auth API
- ✅ `inviteMemberToOrganization` - Custom invitation queueing (placeholder)
- ✅ `removeMemberFromOrganization` - Working with Better Auth API
- ✅ `updateMemberRole` - Working with Better Auth API
- ✅ `getOrganizationMembers` - Working with Better Auth API

### 📁 `user.ts`

**Purpose**: User account management

- `createUser(input)` - Create new user account with email/password
- `getCurrentUser()` - Get current authenticated user
- `getUserByEmail(email)` - Check if user exists by email (placeholder)
- Types: `User`, `CreateUserInput`, `UserResult`

**Available Methods:**

- ✅ `createUser` - Working with Better Auth API
- ✅ `getCurrentUser` - Working with Better Auth API
- ⚠️ `getUserByEmail` - Placeholder (Better Auth API method needed)

**TODO Methods** (when Better Auth API is available):

- `updateUser`
- `deleteUser`
- `changePassword`
- `resetPassword`
- `verifyEmail`

### 📁 `organization-setup.ts`

**Purpose**: Orchestrates complete organization setup flow

- `setupOrganization(input)` - Creates org + team + invites members
- `addMemberToOrganization(input)` - Re-export for backward compatibility

**Flow:**

1. Create user with generated password
2. Create organization
3. Create initial team
4. Process member invitations
5. Return complete setup result

**Input Schema**: Uses `organizationSetupSchema` from `@/lib/validators/organization`

## Usage Examples

### Basic Organization Setup

```typescript
import { setupOrganization } from "@/lib/actions/organization-setup";

const result = await setupOrganization({
  user: { name: "John Doe", email: "john@acme.com" },
  organization: { name: "Acme Corp", slug: "acme" },
  team: { name: "Development" },
  members: [
    { email: "jane@acme.com", role: "admin" },
    { email: "bob@acme.com", role: "member" },
  ],
});

if (result.ok) {
  console.log("Setup complete:", result.data);
} else {
  console.error("Setup failed:", result.error);
}
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

### Member Management

```typescript
import { 
  addMemberToOrganization, 
  inviteMemberToOrganization,
  getOrganizationMembers,
  updateMemberRole 
} from "@/lib/actions/member";

// Add existing user to organization
await addMemberToOrganization({
  userId: "user123",
  organizationId: "org456",
  role: "admin",
  teamId: "team789"
});

// Invite new user by email
await inviteMemberToOrganization({
  email: "newuser@company.com",
  organizationId: "org456",
  role: "member",
  teamId: "team789"
});

// Get all organization members
const members = await getOrganizationMembers("org456");

// Update member role
await updateMemberRole("user123", "org456", "admin");
```

## Design Principles

### 🔒 **Authentication First**

All actions verify user authentication before proceeding using Better Auth session validation

### 🎯 **Single Responsibility**

Each file handles one domain (org, team, member, user)

### 🔄 **Consistent Return Types**

```typescript
type Result<T> = { success: true; data: T } | { success: false; error: string };
```

**Note**: `setupOrganization` uses `{ ok: true/false }` for backward compatibility

### 🛡️ **Error Handling**

- Comprehensive try/catch blocks
- Meaningful error messages
- Console logging for debugging
- Input validation using Zod schemas

### 📝 **Type Safety**

- Full TypeScript support
- Exported types for all inputs/outputs
- Integration with validation schemas from `@/lib/validators/organization`
- Better Auth API type compatibility

### 🔧 **Better Auth Integration**

- Proper header forwarding for authentication
- Compatible with Better Auth organization plugin
- Custom role support with type safety
- Session-based authentication validation

## Validation Schemas

All actions use Zod validation schemas from `@/lib/validators/organization`:

- **Organization Roles**: `"admin" | "member" | "owner"`
- **Input Validation**: Name length, email format, slug patterns
- **Setup Schema**: Complete organization setup validation

## Migration Notes

### From Original `organization-setup.ts`

- ✅ All functionality preserved
- ✅ Backward compatibility maintained via re-exports
- ✅ Improved error handling and type safety
- ✅ Better separation of concerns
- ✅ Input validation using Zod schemas

### Current Implementation Status

- **Fully Working**: Organization, team, member management
- **Partially Working**: User invitation system (placeholder implementation)
- **Placeholder**: `getUserByEmail` (needs Better Auth API method)

### Future Enhancements

- Email invitation system integration
- Better Auth invitation plugin usage
- Advanced member management features
- Organization settings and permissions
- User profile management
- Password reset and email verification flows
