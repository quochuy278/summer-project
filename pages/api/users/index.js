
import { connectToDatabase } from "../../../lib/db";


const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  console.log(req.body)
  const userEmail = req.body.userEmail
  console.log(userEmail)

  const client = await connectToDatabase();

  const db = client.db();

  const user = await db.collection("students").findOne({email: userEmail})

  res.status(200).json({ data: user });
};

export default handler;
