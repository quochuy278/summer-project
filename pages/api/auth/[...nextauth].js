import NextAuth from "next-auth";

import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const studentCollection = await client.db().collection("students");
        const teacherCollection = await client.db().collection("teachers");

        const student = await studentCollection.findOne({
          email: credentials.email,
        });

        const teacher = await teacherCollection.findOne({
          email: credentials.email,
        });

        console.log(teacher);
        if (!credentials.email) {
          throw new Error("Please filled in your email");
        } else if (!credentials.password) {
          throw new Error("Please filled in your password");
        }

        if (teacher) {
          const teacherIsvalid = await verifyPassword(
            credentials.password,
            teacher.password
          );
          if (!teacherIsvalid) {
            client.close();
            throw new Error("Something wrong happened");
          }
          return {
            username: teacher.username,
            email: teacher.email,
            experiences: teacher.experiences,
            department: teacher.department,
          };
        } 

        if (student) {
          const studentIsValid = await verifyPassword(
            credentials.password,
            student.password
          );
          if (!studentIsValid) {
            client.close();
            throw new Error("Something wrong happened");
          }
          return {
            username: student.username,
            email: student.email,
          };
        } else if (!student && !teacher) {
          client.close();
          throw new Error("No user found");
        }  

      },
    }),
  ],
});
