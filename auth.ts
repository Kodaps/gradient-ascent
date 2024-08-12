import NextAuth from "next-auth"

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import Resend from "next-auth/providers/resend"

import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./src/db/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub,
    Google,
    Resend({
    // If your environment variable is named differently than default
    from: "david@kodaps.dev"
  })],
  debug: true,
  callbacks: {
    async authorized({ auth, request }) {
			const isLoggedIn = auth?.user;
			const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false;
			} else if (isLoggedIn) {
				return Response.redirect(new URL("/dashboard", request.nextUrl));
			}
			return true;
		},
  }
})