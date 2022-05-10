import { hashPassword } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db";

const handler = async (req,res) => {
    if (req.method !== "POST") {
        return;
      }
      const error = new Error()
      const { userName ,email, password,experiences, department} = req.body;

  if (!userName) {
    res.status(400).json({
      message: "Please fill in your username",
    });
    client.close();
    return;
  } else if (!email || !email.includes("@")) {
    res.status(400).json({ message: "Please enter the right email format" });
    client.close();
    return;
  } else if (!password || password.trim().length < 7) {
    res.status(400).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    client.close();
    return;
  }
  else if (experiences.length === 0 || !experiences ) {
    res.status(400).json({
      message:
        "Please chose at least one experience you have",
    });
    client.close();
    return;
  }

  else if (!department ) {
    res.status(400).json({
      message:
        "Who are you? Which department you are in ?",
    });
    client.close();
    return;
  }



      const client = await connectToDatabase();

  const db = client.db();

  const existingTeacher = await db.collection("teachers").findOne({ email: email });

  if (existingTeacher) {
    
    client.close();
    return res.status(404).json({ message: "User exists already!" });
  }

  const hashedPassword = await hashPassword(password);
  try {
    const result = await db.collection("teachers").insertOne({
      email: email,
      password: hashedPassword,
      username: userName,
      experiences: experiences,
      department: department,
      isTeacher: true,
    });
  } catch (error) {
    res.json({ message: "Something wrong happened" });
    client.close();
    return;
  }

  res.status(201).json({ message: "Created user!" });
  client.close();
}

export default handler