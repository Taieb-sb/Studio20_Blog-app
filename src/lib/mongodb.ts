import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const options = {};

// Initialise ton client et ta promesse une seule fois
const client = new MongoClient(uri, options);
const clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;
