import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

if (!uri) {
  throw new Error("No MONGODB_URI environment variable.");
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

export type Project = {
  _id: ObjectId;
  user: string;
  name: string;
  editedAt: Date;
  folders: Folder[];
  resources: Resource[];
};
export type Folder = {
  _id: ObjectId;
  name: string;
  resources: Resource[];
}
export type Resource = {
  _id: ObjectId;
  name: string;
  editedAt: Date;
  type: string;
  body: unknown;
}

export async function getProject(projectID: string): Promise<Project | null> {
  let _id;
  try {
    _id = new ObjectId(projectID);
  } catch {
    return null;
  }
  return await client.db(process.env.MONGODB_DB).collection<Project>("projects").findOne({ _id });
}