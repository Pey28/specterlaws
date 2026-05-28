import type { NextAuthConfig } from "next-auth";
import type { PlanId } from "./lib/planes";

type SessionClaims = {
  id: string;
  provincia: string;
  plan: PlanId;
  role: "admin" | "user";
};

function toSessionClaims(user: {
  id?: string;
  provincia?: string;
  plan?: PlanId;
  role?: "admin" | "user";
}): SessionClaims | null {
  if (!user.id) return null;
  return {
    id: user.id,
    provincia: user.provincia ?? "",
    plan: user.plan ?? "gratis",
    role: user.role ?? "user",
  };
}

// Edge-compatible config — no Node.js imports (no DB)
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const claims = toSessionClaims(user);
        if (claims) {
          token.id = claims.id;
          token.provincia = claims.provincia;
          token.plan = claims.plan;
          token.role = claims.role;
        }
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
