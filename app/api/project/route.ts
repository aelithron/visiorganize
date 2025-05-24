import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { NextAuthRequest } from "next-auth";
import { ObjectId } from "mongodb";
import client, { checkPermissions, getProject } from "@/utils/db";

export const dynamic = 'force-dynamic';

export const POST = auth(async function POST(req: NextAuthRequest) {
  if (!req.auth || !req.auth.user) return NextResponse.json({ error: "UNAUTHORIZED", message: "Not logged in" }, { status: 401 });
  const { user } = req.auth;
  if (user.email === null || user.email === undefined) return NextResponse.json({ error: "INVALID_USER_PROFILE", message: "User has no email address" }, { status: 400 });
  const projectID = new ObjectId();

  const body = await req.json();
  if (body.name === undefined || body.name === null || body.name.trim().length <= 0) return NextResponse.json({ error: "INVALID_NAME", message: "Project name is missing/invalid" }, { status: 400 });

  await client.db(process.env.MONGODB_DB).collection("projects").insertOne({
    _id: projectID,
    user: user.email, // idk if I will keep email IDs, but currently I will
    name: body.name.trim(),
    editedAt: new Date(),
    folders: [],
    resources: [],
    sharedWith: []
  });
  return NextResponse.json({ message: "Project created successfully", id: projectID }, { status: 201 });
});

export const DELETE = auth(async function DELETE(req: NextAuthRequest) {
  if (!req.auth || !req.auth.user) return NextResponse.json({ error: "UNAUTHORIZED", message: "Not logged in." }, { status: 401 });
  const { user } = req.auth;
  if (user.email === null || user.email === undefined) return NextResponse.json({ error: "INVALID_USER_PROFILE", message: "User has no email address." }, { status: 400 });

  const body = await req.json();
  if (body.projectID === undefined || body.projectID === null || body.projectID.trim().length <= 0) return NextResponse.json({ error: "INVALID_ID", message: "Project ID is missing/invalid." }, { status: 400 });
  const projectID = new ObjectId(body.projectID as string);

  const project = await client.db(process.env.MONGODB_DB).collection("projects").findOne({ _id: projectID });
  if (project === null || !(await checkPermissions(projectID.toString(), user.email))) return NextResponse.json({ error: "PROJECT_NOT_FOUND", message: "Project was not found." }, { status: 404 });
  if (await checkPermissions(projectID.toString(), user.email) !== "owner") return NextResponse.json({ error: "FORBIDDEN", message: "You do not have permission to delete this project!" }, { status: 403 });

  await client.db(process.env.MONGODB_DB).collection("projects").deleteOne({ _id: projectID });
  return NextResponse.json({ message: "Project deleted successfully." }, { status: 200 });
});

export const PATCH = auth(async function PATCH(req: NextAuthRequest) {
  if (!req.auth || !req.auth.user) return NextResponse.json({ error: "UNAUTHORIZED", message: "Not logged in" }, { status: 401 });
  const { user } = req.auth;
  if (user.email === null || user.email === undefined) return NextResponse.json({ error: "USER_PROFILE_INVALID", message: "User has no email address" }, { status: 400 });

  const body = await req.json();
  if (body.projectID === undefined || body.projectID === null || body.projectID.trim().length <= 0) return NextResponse.json({ error: "INVALID_PROJECTID", message: "Project ID is missing/invalid" }, { status: 400 });
  const fullProject = await getProject(body.projectID);
  if (fullProject === null || !(await checkPermissions(fullProject._id.toString(), user.email))) return NextResponse.json({ error: "PROJECT_NOT_FOUND", message: "Project was not found." }, { status: 404 });
  const projectID = new ObjectId(body.projectID as string);

  if (body.name !== undefined && body.name !== null && body.name.trim().length > 0) fullProject.name = body.name.trim();
  if (body.sharedWith !== undefined && body.sharedWith !== null && Array.isArray(body.sharedWith)) {
    if (JSON.stringify(!body.sharedWith) !== JSON.stringify(fullProject.sharedWith)) {
      if (await checkPermissions(projectID.toString(), user.email) !== "owner") return NextResponse.json({ error: "FORBIDDEN", message: "You do not have permission to share this project" }, { status: 403 });
      fullProject.sharedWith = body.sharedWith;
      if (fullProject.sharedWith.find((email) => email === user.email)) return NextResponse.json({ error: "INVALID_SHARE", message: "You cannot share a project with yourself" }, { status: 400 });
    }
  }
  await client.db(process.env.MONGODB_DB).collection("projects").updateOne(
    { _id: projectID },
    {
      $set: {
        editedAt: new Date(),
        name: fullProject.name,
        sharedWith: fullProject.sharedWith,
      },
    },
  );
  return NextResponse.json({ message: "Project updated successfully" }, { status: 200 });
});