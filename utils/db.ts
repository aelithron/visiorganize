import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import { CardType } from "./cards";

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
  sharedWith: string[];
  name: string;
  editedAt: Date;
  resources: Resource[];
  tags: Tag[];
};
export type Resource = {
  _id: ObjectId;
  name: string;
  editedAt: Date;
  type: CardType;
  body: string;
  comments: Comment[];
  tags: string[];
}
export type Tag = {
  text: string;
  color: string;
}
export type Comment = {
  _id: ObjectId;
  user: string;
  text: string;
  leftAt: Date;
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

export type PermissionLevel = "owner" | "shared" | undefined;
export async function checkPermissions(projectID: string, user: string): Promise<PermissionLevel> {
  let hasPermission: PermissionLevel = undefined;
  const project = await getProject(projectID);
  if (project === null) return undefined;

  if (project.user === user) hasPermission = "owner";
  if (project.sharedWith.find((email) => email === user)) hasPermission = "shared";
  return hasPermission;
}