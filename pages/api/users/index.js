
import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return;
  }
  console.log(req.body)
  const userEmail = req.body.userEmail
//   if (!session) return res.status(200).json({messsage: 'Please login to see this' });

  const client = await connectToDatabase();

  const db = client.db();

  const user = await db.collection("students").findOne({email: userEmail})

  res.status(200).json({ data: user });
};

export default handler;
