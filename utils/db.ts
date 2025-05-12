import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
 
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

export async function createProject(userID: string, projectName: string, projectID: ObjectId) {
  return await client.db(process.env.MONGODB_DB).collection("projects").insertOne({
    _id: projectID,
    user: userID,
    name: projectName,
    createdAt: new Date(),
    folders: [],
    resources: [],
  });
}

export async function getProject(projectID: string): Promise<Project | null> {
  return client.db(process.env.MONGODB_DB).collection<Project>("projects").findOne({
    _id: new ObjectId(projectID),
  });
}

export async function getUserProjects(userID: string): Promise<Project[]> {
  return client.db(process.env.MONGODB_DB).collection<Project>("projects").find({
    user: userID,
  }).toArray();
}

export type Project = {
  _id: ObjectId;
  user: string;
  name: string;
  createdAt: Date;
  folders: Folder[];
  resources: Resource[];
};
export type Folder = {
  _id: ObjectId;
  name: string;
  createdAt: Date;
  resources: Resource[];
}
export type Resource = {
  _id: ObjectId;
  name: string;
  createdAt: Date;
  type: string;
  data: unknown;
}