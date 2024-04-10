import connectToDatabase from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.status(422).json({ message: "It is GET/POST method completed task" });
  }
  if (req.method === "POST") {
    const { task } = req.body;
    // console.log(task);

    try {
      const client = await connectToDatabase();
      if (client) {
        const db = client.db();
        const collection = db.collection("tasks");
        if (collection) {
          const result = await collection.updateOne(
            { _id: new ObjectId(task._id as string) },
            { $set: { done: true, submittedDate: new Date() } }
          );

          if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Task not found!" });
          }
        } else {
          res.status(404).json({ message: "Task not found!" });
          client.close();
          return;
        }
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      client.close();
      res.status(200).json({
        message: "Task marked as completed!",
      });
      return;
    } catch (error) {
      console.error("Error completing task:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  if (req.method === "GET") {
    const client = await connectToDatabase();
    if (client) {
      const db = client.db();
      const collection = db.collection("tasks");
      const completedTasks = await collection.find({ done: true }).toArray();
      if (completedTasks) {
        client.close();
        res.status(200).json({
          message: "Fetched completed tasks successfully!",
          completedTasks: completedTasks,
        });
        return;
      } else {
        console.log("No completed task.");
      }
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
