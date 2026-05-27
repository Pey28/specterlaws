import { DefaultSession } from "next-auth";
import type { PlanId } from "@/lib/planes";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provincia: string;
      plan: PlanId;
    } & DefaultSession["user"];
  }

  interface User {
    provincia?: string;
    plan?: PlanId;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    provincia?: string;
    plan?: PlanId;
  }
}
