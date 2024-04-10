import connectToDatabase from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(422).json({ message: "It's POST method" });
    return;
  }

  const { title, description, date, done } = req.body;
  try {
    const client = await connectToDatabase();
    if (client) {
      await client.db().collection("tasks").insertOne({
        title,
        description,
        date,
        done,
      });
    }
    console.log("inserted");

    client.close();
  } catch (error) {
    console.log("Error on adding data to database:", error);
  }
  res.status(200).json({ message: "Post done" });
}
