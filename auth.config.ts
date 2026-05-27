import type { NextAuthConfig } from "next-auth";
import type { PlanId } from "./lib/planes";

// Edge-compatible config — no Node.js imports (no DB)
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.provincia = (user as { provincia?: string }).provincia ?? "";
        token.plan = ((user as { plan?: PlanId }).plan ?? "gratis") as PlanId;
        token.role = ((user as { role?: "admin" | "user" }).role ?? "user");
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.provincia = token.provincia as string;
      session.user.plan = (token.plan ?? "gratis") as PlanId;
      session.user.role = (token.role ?? "user") as "admin" | "user";
      return session;
    },
  },
  providers: [],
  session: { strategy: "jwt" },
};
