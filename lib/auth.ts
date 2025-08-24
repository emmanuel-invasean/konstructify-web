import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db.server";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({user, url, token}, request) => {
      console.log("sendResetPassword", token);
    }
  },
  plugins: [
    organization({
      teams: {
        enabled: true,
        allowRemovingAllTeams: false,
      },
    }),
  ],
});
