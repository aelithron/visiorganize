import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { NextAuthRequest } from "next-auth";
import client, { Folder, getProject } from "@/utils/db";
import { ObjectId } from "mongodb";

export const POST = auth(async function POST(req: NextAuthRequest) {
  if (!req.auth || !req.auth.user) return NextResponse.json({ error: "UNAUTHORIZED", message: "Not logged in" }, { status: 401 });
  const { user } = req.auth;
  if (user.email === null || user.email === undefined) return NextResponse.json({ error: "USER_PROFILE_INVALID", message: "User has no email address" }, { status: 400 });

  const body = await req.json();
  if (body.projectID === undefined || body.projectID === null || body.projectID.trim().length <= 0) return NextResponse.json({ error: "INVALID_PROJECTID", message: "Project ID is missing/invalid" }, { status: 400 });
  if (body.name === undefined || body.name === null || body.name.trim().length <= 0) return NextResponse.json({ error: "INVALID_NAME", message: "Resource name is missing/invalid" }, { status: 400 });
  if (body.type === undefined || body.type === null || body.type.trim().length <= 0) return NextResponse.json({ error: "INVALID_TYPE", message: "Resource type is missing/invalid" }, { status: 400 });
  if (body.body === undefined || body.body === null || body.body.trim().length <= 0) return NextResponse.json({ error: "INVALID_BODY", message: "Resource body is missing/invalid" }, { status: 400 });

  const fullProject = await getProject(body.projectID);
  if (fullProject === null) return NextResponse.json({ error: "NO_PROJECT", message: "Project not found" }, { status: 404 });
  const folders: Folder[] = fullProject.folders;
  const projectID = new ObjectId(body.projectID as string);
  const resourceID = new ObjectId()

  let folderID: ObjectId | null = null;
  if (body.folderID !== undefined && body.folderID !== null && body.folderID.trim().length > 0) {
    folderID = new ObjectId(body.folderID as string);
    const folder = folders.find((folder) => folder._id.toString() === folderID?.toString())
    if (folder === undefined) return NextResponse.json({ error: "NO_FOLDER", message: "Folder not found" }, { status: 404 });
    const resources = folder.resources;
    resources.push({ _id: resourceID, name: body.name, type: body.type, body: body.body, editedAt: new Date() });
    for (const oldFolder of folders) {
      if (oldFolder._id.toString() === folderID?.toString()) {
        oldFolder.resources = resources;
        break;
      }
    }
    await client.db(process.env.MONGODB_DB).collection("projects").updateOne(
      { _id: projectID },
      {
        $set: {
          editedAt: new Date(),
          folders: folders,
        },
      },
    );
    return NextResponse.json({ message: "Resource (in folder) created successfully", id: resourceID }, { status: 201 });
  }

  const resources = fullProject.resources;
  resources.push({ _id: resourceID, name: body.name, type: body.type, body: body.body, editedAt: new Date() });
  await client.db(process.env.MONGODB_DB).collection("projects").updateOne(
    { _id: projectID },
    {
      $set: {
        editedAt: new Date(),
        resources: resources,
      },
    },
  );
  return NextResponse.json({ message: "Resource (in project) created successfully", id: resourceID }, { status: 201 });
});