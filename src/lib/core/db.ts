import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI must be defined in environment variables.");
}

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const client = new MongoClient(uri);
if (!globalForMongo._mongoClientPromise) {
  globalForMongo._mongoClientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const mongoClient = await globalForMongo._mongoClientPromise!;
  return mongoClient.db("zenith-mind");
}
