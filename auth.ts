import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getUserByEmail, getUserPlan, getUserRole, createUser } from "@/lib/db";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = getUserByEmail(credentials.email as string);
        if (!user) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!valid) return null;

        const plan = getUserPlan(user.id);

        return {
          id: user.id,
          name: user.nombre,
          email: user.email,
          provincia: user.provincia,
          plan,
          role: getUserRole(user.id),
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        // INSERT OR IGNORE handles concurrent requests — no duplicates possible
        createUser({
          nombre: user.name ?? user.email.split("@")[0],
          email: user.email,
          password: "",
          provincia: "",
        });
        const dbUser = getUserByEmail(user.email);
        if (!dbUser) return false;
        user.id = dbUser.id;
        (user as { plan?: string }).plan = getUserPlan(dbUser.id);
        (user as { provincia?: string }).provincia = dbUser.provincia ?? "";
        (user as { role?: string }).role = getUserRole(dbUser.id);
      }
      return true;
    },
  },
});
