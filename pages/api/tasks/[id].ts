import connectToDatabase from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT" && req.method !== "GET") {
    res.status(422).json({ message: "It is PUT/GET method" });
    return;
  }

  //PUT method
  if (req.method === "PUT") {
    const { id } = req.query;
    const {
      newTitle: title,
      newDescription: description,
      newDate: date,
      newDone: done,
    } = req.body;

    if (!id) {
      res.status(400).json({ message: "Missing id parameter" });
      return;
    }

    try {
      const client = await connectToDatabase();
      if (client) {
        const db = client.db();
        const collection = db.collection("tasks");

        const result = await collection.updateOne(
          { _id: new ObjectId(id as string) },
          { $set: { title, description, date, done } }
        );

        if (result.modifiedCount === 1) {
          res.status(200).json({ message: "Task updated successfully" });
        } else {
          res.status(404).json({ message: "Task not found" });
        }
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
      client.close();
    } catch (error) {
      console.error("Error updating data in the database:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // GET method
  if (req.method === "GET") {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ message: "Missing id parameter" });
      return;
    }

    try {
      const client = await connectToDatabase();
      if (client) {
        const db = client.db();
        const collection = db.collection("tasks");

        const result = await collection.findOne({
          _id: new ObjectId(id as string),
        });
        if (result) {
          res
            .status(200)
            .json({ message: "Modified task found", task: result });
        } else {
          res.status(404).json({ message: "Task not found" });
        }
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
      client.close();
    } catch (error) {
      console.error("Error updating data in the database:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
