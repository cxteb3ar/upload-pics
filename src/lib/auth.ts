import NextAuth from "next-auth";
import { decode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { jwtDecrypt } from "jose";
import { hkdf } from "@panva/hkdf";
import { type NextRequest } from "next/server";

const providers: Provider[] = [
  Credentials({
    name: "Admin Panel Login",
    credentials: {
      email: {
        label: "Email",
        type: "email",
        placeholder: "admin@example.com",
      },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const users = [
        {
          id: "1",
          email: process.env.DASHBOARD_EMAIL,
          password: process.env.DASHBOARD_PASSWORD,
          name: "User",
        },
      ];

      const user = users.find(
        (user) =>
          credentials?.email === user.email &&
          credentials?.password === user.password,
      );

      if (!user) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

const useSecureCookies = process.env.NODE_ENV === "production";
const cookiePrefix = useSecureCookies ? "__Secure-" : "";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}upload-pics.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    async decode(params) {
      if (!params.token) return null;
      try {
        return await decode(params);
      } catch {
        const { token: jwt, secret, salt } = params;
        const key = await getDerivedEncryptionKey([secret].flat()[0], salt);
        const { payload } = await jwtDecrypt(jwt, key, { clockTolerance: 15 });
        return payload;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

async function getDerivedEncryptionKey(ikm: string | Buffer, _salt: string) {
  const salt = _salt.includes(".session-token") ? "" : _salt;
  const prefix = "NextAuth.js Generated Encryption Key";
  const info = `${prefix}${salt ? ` (${salt})` : ""}`;
  return await hkdf("sha256", ikm, salt, info, 32);
}

export async function isAuthenticated(req: NextRequest) {
  const session = await auth();
  return session;
}
