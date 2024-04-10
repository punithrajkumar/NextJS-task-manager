import connectToDatabase from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.status(422).json({ message: "It's DELETE method" });
    return;
  }

  const taskId = req.query.id as string;

  if (!taskId) {
    res.status(400).json({ message: "No task id found!" });
    return;
  }

  try {
    const client = await connectToDatabase();
    if (client) {
      const db = client.db();
      const collection = db.collection("tasks");
      const result = await collection.deleteOne({ _id: new ObjectId(taskId) });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Task deleted successfully!" });
      } else {
        res.status(404).json({ message: "Task not found!" });
      }
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.log("Error deleting data from the database:", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
}
