# Organization Setup

This feature allows users to create a new organization, set up their first team, and invite members with specific roles.

## Features

- Single-page organization setup flow
- Team creation with the organization
- Role-based member invitations
- Mobile-first responsive design
- Real-time validation
- Secure invitation handling

## Components

- `/app/(app-shell)/setup/page.tsx` - Main setup page
- `/components/forms/organization-setup-form.tsx` - Setup form component
- `/lib/actions/organization-setup.ts` - Server action for organization setup
- `/lib/validators/organization.ts` - Validation schemas

## Data Model

Uses the following tables (via better-auth):

- `organization` - Organization details
- `team` - Team information
- `member` - Organization members
- `invitation` - Pending invitations

## Available Roles

- `admin` - Full organization management
- `project_manager` - Project and team management
- `contractor` - Limited project access
- `client` - View-only access
- `member` - Basic team member

## Usage

1. Navigate to `/setup` after signing in
2. Fill in organization details:
   - Name (required)
   - URL Slug (optional)
3. Create your first team:
   - Team Name (required)
4. Add team members:
   - Email address
   - Role selection
   - Add multiple members as needed

## Security

- Server-side authentication required
- Role-based access control
- Secure email invitations
- Input validation and sanitization
- No client-side secrets

## Testing

- Unit tests: `tests/actions/organization-setup.test.ts`
- E2E tests: `tests/e2e/organization-setup.spec.ts`

## Future Improvements

- Organization settings customization
- Team hierarchy and sub-teams
- Custom role definitions
- Bulk member imports
- Organization templates
