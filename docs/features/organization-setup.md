# Organization Setup

This feature allows users to create a new organization, set up their first team, and invite members with specific roles. The setup process creates a complete organization structure in a single flow.

## Features

- Single-page organization setup flow
- User account creation with generated password
- Organization creation with optional URL slug
- Team creation within the organization
- Role-based member invitations
- Mobile-first responsive design with shadcn/ui components
- Real-time validation using Zod schemas
- Secure invitation handling
- Automatic redirect to dashboard upon completion

## Components

- `/app/(app-shell)/setup/page.tsx` - Main setup page with layout and form integration
- `/components/forms/organization-setup-form.tsx` - Comprehensive setup form component
- `/lib/actions/organization-setup.ts` - Server action orchestrating the complete setup process
- `/lib/validators/organization.ts` - Validation schemas for all form inputs

## Data Model

Uses the following database tables (via Drizzle ORM):

- `user` - User account information
- `organization` - Organization details and metadata
- `team` - Team information within organizations
- `member` - Organization members with roles
- `invitation` - Pending member invitations
- `team_member` - Team membership relationships

## Available Roles

The system supports the following roles (defined in the database schema):

- `admin` - Full organization management capabilities
- `project_manager` - Project and team management access
- `contractor` - Limited project access
- `client` - View-only access to projects
- `member` - Basic team member access

**Note:** The form currently displays a simplified role set (admin, owner, member) but the backend supports the full role spectrum.

## Setup Flow

1. **User Details** - Collects the primary user's name and email
2. **Organization Details** - Organization name and optional URL slug
3. **Team Setup** - Creates the initial team within the organization
4. **Member Invitations** - Invite team members with specific roles

## Form Validation

- **User Name**: 2-100 characters, letters, numbers, spaces, and hyphens
- **User Email**: Valid email format
- **Organization Name**: 2-50 characters, alphanumeric with spaces and hyphens
- **Organization Slug**: 2-50 characters, lowercase letters, numbers, and hyphens only
- **Team Name**: 2-50 characters, alphanumeric with spaces and hyphens
- **Member Emails**: Valid email format, maximum 20 members per setup

## Security Features

- Server-side authentication required
- Role-based access control
- Secure email invitations with expiration
- Input validation and sanitization using Zod schemas
- No client-side secrets or sensitive data exposure
- Password generation for new user accounts

## Technical Implementation

### Server Action Flow
1. Validates input using Zod schemas
2. Creates user account with generated password
3. Creates organization with provided details
4. Creates initial team within the organization
5. Processes member invitations
6. Returns success/error response with created entities

### Form State Management
- Uses React Hook Form with Zod resolver
- Dynamic member array management
- Real-time validation feedback
- Loading states and error handling

## Testing

- Unit tests: `tests/actions/organization-setup.test.ts`
- E2E tests: `tests/e2e/organization-setup.spec.ts`

## Future Improvements

- Organization settings customization
- Team hierarchy and sub-teams
- Custom role definitions and permissions
- Bulk member imports from CSV/Excel
- Organization templates and presets
- Enhanced invitation management
- Organization branding and customization
- Integration with external identity providers

## Error Handling

The system provides comprehensive error handling:
- Validation errors with specific field feedback
- Server action errors with user-friendly messages
- Network and unexpected error fallbacks
- Graceful degradation for partial failures

## Accessibility

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- High contrast support via CSS variables
