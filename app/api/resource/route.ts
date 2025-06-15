import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { NextAuthRequest } from "next-auth";
import client, { checkPermissions, getProject, Resource } from "@/utils/db";
import { ObjectId } from "mongodb";

export const dynamic = 'force-dynamic';

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
  if (fullProject === null || !(await checkPermissions(fullProject._id.toString(), user.email))) return NextResponse.json({ error: "PROJECT_NOT_FOUND", message: "Project not found" }, { status: 404 });
  const projectID = new ObjectId(body.projectID as string);
  const resourceID = new ObjectId();

  const resources = fullProject.resources;
  resources.push({ _id: resourceID, name: body.name, type: body.type, body: body.body, editedAt: new Date(), comments: [] });
  await client.db(process.env.MONGODB_DB).collection("projects").updateOne(
    { _id: projectID },
    {
      $set: {
        editedAt: new Date(),
        resources: resources,
      },
    },
  );
  return NextResponse.json({ message: "Resource created successfully", id: resourceID }, { status: 201 });
});

export const DELETE = auth(async function DELETE(req: NextAuthRequest) {
  if (!req.auth || !req.auth.user) return NextResponse.json({ error: "UNAUTHORIZED", message: "Not logged in." }, { status: 401 });
  const { user } = req.auth;
  if (user.email === null || user.email === undefined) return NextResponse.json({ error: "INVALID_USER_PROFILE", message: "User has no email address." }, { status: 400 });

  const body = await req.json();
  if (body.projectID === undefined || body.projectID === null || body.projectID.trim().length <= 0) return NextResponse.json({ error: "INVALID_PROJECT_ID", message: "Project ID is missing/invalid." }, { status: 400 });
  if (body.resourceID === undefined || body.resourceID === null || body.resourceID.trim().length <= 0) return NextResponse.json({ error: "INVALID_RESOURCE_ID", message: "Resource ID is missing/invalid." }, { status: 400 });
  const projectID = new ObjectId(body.projectID as string);
  const resourceID = new ObjectId(body.resourceID as string);

  const project = await client.db(process.env.MONGODB_DB).collection("projects").findOne({ _id: projectID });
  if (project === null || !(await checkPermissions(projectID.toString(), user.email))) return NextResponse.json({ error: "PROJECT_NOT_FOUND", message: "Project not found." }, { status: 404 });

  await client.db(process.env.MONGODB_DB).collection("projects").updateOne(
    { _id: projectID },
    {
      $set: {
        editedAt: new Date(),
        resources: project.resources.filter((resource: Resource) => resource._id.toString() !== resourceID.toString()),
      },
    },
  );
  return NextResponse.json({ message: "Resource deleted successfully." }, { status: 200 });
});