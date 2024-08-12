
import { handlers } from "../../../../../auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers

//import NextAuth from 'next-auth';

// import GitHubProvider from 'next-auth/providers/github';

//import { handlers } from 'auth';

// import { authConfig } from 'auth.config';

//const handlers = NextAuth(authConfig);

//export { handlers as GET, handlers as POST }

/*
export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
}*/

/*
export const handlers = NextAuth(authConfig);

export { handlers as GET, handlers as POST };

*/