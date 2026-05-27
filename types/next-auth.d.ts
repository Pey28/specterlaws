import { DefaultSession } from "next-auth";
import type { PlanId } from "@/lib/planes";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provincia: string;
      plan: PlanId;
      role: "admin" | "user";
    } & DefaultSession["user"];
  }

  interface User {
    provincia?: string;
    plan?: PlanId;
    role?: "admin" | "user";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    provincia?: string;
    plan?: PlanId;
    role?: "admin" | "user";
  }
}
