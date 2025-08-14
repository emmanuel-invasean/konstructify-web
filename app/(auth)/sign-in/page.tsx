import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "./sign-in-form";

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: headers() as unknown as Headers,
  });

  if (session?.session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--concrete-gray)] p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-display text-3xl leading-tight text-[var(--deep-navy)]">
            Sign in
          </CardTitle>
          <CardDescription className="text-[var(--charcoal)]/80">
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </main>
  );
}
