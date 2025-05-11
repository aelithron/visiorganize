import { UUID } from "crypto";
import { MongoClient, ServerApiVersion } from "mongodb";
 
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
 
const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}
 
let client: MongoClient;
 
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line prefer-const
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  }
 
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(uri, options);
}
 
export default client;

export function createProject(userID: string, projectName: string, projectID: UUID) {
  return client.db(process.env.MONGODB_DB).collection("projects").insertOne({
    userID,
    projectID,
    projectName,
    createdAt: new Date(),
    folders: [],
    resources: [],
  });
}