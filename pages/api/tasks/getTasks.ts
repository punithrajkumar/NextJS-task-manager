import connectToDatabase from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(422).json({ message: "It's GET method" });
    return;
  }

  try {
    const client = await connectToDatabase();
    if (client) {
      const db = client.db();
      const collection = db.collection("tasks");
      const tasks = await collection.find().toArray();

      res
        .status(200)
        .json({ message: "Data fetched successfully!", tasks: tasks });
      client.close();
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.log("Error on fetching data from the database:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
