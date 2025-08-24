import { test, expect } from "@playwright/test";

test.describe("Organization Setup", () => {
  test.beforeEach(async ({ page }) => {
    // Sign in first (assuming auth is mocked for tests)
    await page.goto("/sign-in");
    await page.fill('[name="email"]', "test@example.com");
    await page.fill('[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await page.waitForURL("/dashboard");
  });

  test("should successfully set up organization with team and members", async ({
    page,
  }) => {
    await page.goto("/setup");

    // Fill organization details
    await page.fill('[name="organization.name"]', "Test Organization");
    await page.fill('[name="organization.slug"]', "test-org");

    // Fill team details
    await page.fill('[name="team.name"]', "Core Team");

    // Add first member
    await page.fill('[name="members.0.email"]', "member1@example.com");
    await page.click('[name="members.0.role"]');
    await page.click('text="Project Manager"');

    // Add another member
    await page.click('button:has-text("Add Member")');
    await page.fill('[name="members.1.email"]', "member2@example.com");
    await page.click('[name="members.1.role"]');
    await page.click('text="Contractor"');

    // Submit form
    await page.click('button[type="submit"]:has-text("Create Organization")');

    // Verify redirect to dashboard
    await page.waitForURL("/dashboard");

    // Verify success state (assuming we show a success toast or message)
    await expect(
      page.locator("text=Organization created successfully"),
    ).toBeVisible();
  });

  test("should show validation errors for invalid input", async ({ page }) => {
    await page.goto("/setup");

    // Submit empty form
    await page.click('button[type="submit"]:has-text("Create Organization")');

    // Verify validation errors
    await expect(
      page.locator("text=Name must be at least 2 characters"),
    ).toBeVisible();
    await expect(page.locator("text=Add at least one member")).toBeVisible();

    // Fill invalid email
    await page.fill('[name="members.0.email"]', "invalid-email");
    await expect(page.locator("text=Invalid email address")).toBeVisible();
  });

  test("should handle server errors gracefully", async ({ page }) => {
    await page.goto("/setup");

    // Fill minimum required fields
    await page.fill('[name="organization.name"]', "Error Test Org");
    await page.fill('[name="team.name"]', "Error Test Team");
    await page.fill('[name="members.0.email"]', "error@test.com");

    // Mock server error (this would be handled by your test setup/API mocking)
    await page.route("/api/organizations", (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: "Internal server error" }),
      });
    });

    // Submit form
    await page.click('button[type="submit"]:has-text("Create Organization")');

    // Verify error message
    await expect(
      page.locator("text=Failed to create organization"),
    ).toBeVisible();
  });
});
