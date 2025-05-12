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

export type Project = {
  _id: ObjectId;
  user: string;
  name: string;
  editedAt: Date;
  folders: Folder[];
  resources: Resource[];
};
export type Folder = {
  name: string;
  resources: Resource[];
}
export type Resource = {
  name: string;
  editedAt: Date;
  type: string;
  data: unknown;
}