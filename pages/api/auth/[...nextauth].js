import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const userCollection = await client.db().collection("users");

        const user = await userCollection.findOne({
          email: credentials.email,
        });

        if (!credentials.email) {
          throw new Error("Please filled in your email");
        } else if (!credentials.password) {
          throw new Error("Please filled in your password");
        }

        if (!user) {
          client.close();
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Something wrong happened");
        }

        client.close();

        return {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
});
