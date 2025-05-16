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
  if (body.name === undefined || body.name === null || body.name.trim().length <= 0) return NextResponse.json({ error: "INVALID_NAME", message: "Folder name is missing/invalid" }, { status: 400 });

  const fullProject = await getProject(body.projectID);
  if (fullProject === null) return NextResponse.json({ error: "NO_PROJECT", message: "Project not found" }, { status: 404 });
  const projectID = new ObjectId(body.projectID as string);

  const folders: Folder[] = fullProject.folders;
  const folderID = new ObjectId()
  folders.push({ _id: folderID, name: body.name, resources: [] });

  await client.db(process.env.MONGODB_DB).collection("projects").updateOne(
    { _id: projectID },
    {
      $set: {
        editedAt: new Date(),
        folders: folders,
      },
    },
  );
  return NextResponse.json({ message: "Folder created successfully", id: folderID }, { status: 201 });
});

export const DELETE = auth(async function DELETE(req: NextAuthRequest) {
  if (!req.auth || !req.auth.user) return NextResponse.json({ error: "UNAUTHORIZED", message: "Not logged in." }, { status: 401 });
  const { user } = req.auth;
  if (user.email === null || user.email === undefined) return NextResponse.json({ error: "INVALID_USER_PROFILE", message: "User has no email address." }, { status: 400 });

  const body = await req.json();
  if (body.projectID === undefined || body.projectID === null || body.projectID.trim().length <= 0) return NextResponse.json({ error: "INVALID_PROJECT_ID", message: "Project ID is missing/invalid." }, { status: 400 });
  if (body.folderID === undefined || body.folderID === null || body.folderID.trim().length <= 0) return NextResponse.json({ error: "INVALID_FOLDER_ID", message: "Folder ID is missing/invalid." }, { status: 400 });
  const projectID = new ObjectId(body.projectID as string);
  const folderID = new ObjectId(body.folderID as string);

  const project = await client.db(process.env.MONGODB_DB).collection("projects").findOne({ _id: projectID });
  if (project === null) return NextResponse.json({ error: "PROJECT_NOT_FOUND", message: "Project was not found." }, { status: 404 });
  const folders: Folder[] = project.folders;
  if (project.user !== user.email) return NextResponse.json({ error: "FORBIDDEN", message: "You do not have permission to delete this project!" }, { status: 403 });
  if (folders.find((folder) => folder._id.toString() === folderID.toString()) === undefined) return NextResponse.json({ error: "FOLDER_NOT_FOUND", message: "Folder was not found." }, { status: 404 });
  
  await client.db(process.env.MONGODB_DB).collection("projects").updateOne(
    { _id: projectID },
    {
      $set: {
        editedAt: new Date(),
        folders: folders.filter((folder) => folder._id.toString() !== folderID.toString()),
      },
    },
  );
  return NextResponse.json({ message: "Folder deleted successfully." }, { status: 200 });
});