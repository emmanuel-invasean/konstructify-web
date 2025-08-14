import { auth } from "@/lib/auth";
import { z } from "zod";

const AdminUserSignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  image: z.string().url().optional(),
  rememberMe: z.boolean().optional(),
  callbackURL: z.string().url().optional(),
});

export async function POST(req: Request) {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret) {
    return new Response("Server misconfigured: missing ADMIN_API_SECRET", {
      status: 500,
    });
  }

  const provided = req.headers.get("x-admin-secret");
  if (provided !== secret) {
    return new Response("Unauthorized", { status: 401 });
  }

  let bodyUnknown: unknown;
  try {
    bodyUnknown = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const parseResult = AdminUserSignupSchema.safeParse(bodyUnknown);
  if (!parseResult.success) {
    return new Response("Invalid request body", { status: 400 });
  }

  const { email, password, name, image, rememberMe, callbackURL } =
    parseResult.data;
  if (!email || !password || !name) {
    return new Response("Missing required fields: name, email, password", {
      status: 400,
    });
  }

  // Delegate to Better Auth's server API; returns a Response when asResponse is true
  const res = await auth.api.signUpEmail({
    body: { email, password, name, image, rememberMe, callbackURL },
    asResponse: true,
    headers: req.headers, // optional, forwards context headers if needed
  });

  return res;
}
