import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 1800,
  },
  providers: [
    CredentialsProvider.default({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          const res = await fetch("http://localhost:3000/api/LogIn", {
            method: "POST",
            body: JSON.stringify({
              x: credentials.username,
              y: credentials.password,
            }),
          });
          const hasil = await res.json();
          const data = hasil.data;
          if (
            typeof data !== "string"
            // data != "Maaf Username atau Password anda salah" &&
            // data != "Terjadi masalah saat mengakses db" &&
            // data != "Maaf Akun Anda Non-Aktif"
          ) {
            const user = {
              username: data[0],
              role: data[1],
              idUser: data[2],
            };
            return user;
          } else {
            throw new Error(data);
          }
        } catch (e) {
          throw e;
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      session.user = {
        username: token.username,
        role: token.role,
        idUser: token.idUser,
      };
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.Username) {
        token.username = session.Username;
      }
      if (user) {
        token.username = user.username;
        token.role = user.role;
        token.idUser = user.idUser;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth.default(authOptions);
