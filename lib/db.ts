import { MongoClient } from "mongodb";

export default async function connectToDatabase(): Promise<MongoClient> {
  const client: MongoClient = await MongoClient.connect(
    "mongodb+srv://punithrajkumar496:punithrajkumar496@cluster0.svqeffc.mongodb.net/tasksList?retryWrites=true&w=majority"
  );

  return client;
}
