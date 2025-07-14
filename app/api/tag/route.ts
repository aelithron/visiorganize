import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { NextAuthRequest } from "next-auth";
import client, { checkPermissions, getProject, Project, Tag } from "@/utils/db";
import { ObjectId } from "mongodb";

export const dynamic = 'force-dynamic';

export const POST = auth(async function POST(req: NextAuthRequest) {
  if (!req.auth || !req.auth.user) return NextResponse.json({ error: "UNAUTHORIZED", message: "Not logged in" }, { status: 401 });
  const { user } = req.auth;
  if (!user.email) return NextResponse.json({ error: "USER_PROFILE_INVALID", message: "User has no email address" }, { status: 400 });

  const body = await req.json();
  if (!body.projectID || body.projectID.trim().length <= 0) return NextResponse.json({ error: "INVALID_PROJECTID", message: "Project ID is missing/invalid" }, { status: 400 });
  if (!body.text || body.text.trim().length <= 0) return NextResponse.json({ error: "INVALID_TEXT", message: "Tag text is missing/invalid" }, { status: 400 });
  if (!body.color || body.color.trim().length <= 0) return NextResponse.json({ error: "INVALID_COLOR", message: "Tag color is missing/invalid" }, { status: 400 });

  const fullProject = await getProject(body.projectID);
  if (!fullProject || !(await checkPermissions(fullProject._id.toString(), user.email))) return NextResponse.json({ error: "PROJECT_NOT_FOUND", message: "Project not found" }, { status: 404 });
  const projectID = new ObjectId(body.projectID as string);

  const tags = fullProject.tags;
  if (tags.values().find(e => e.text === body.text)) return NextResponse.json({ error: "ALREADY_EXISTS", message: "The tag already exists!" });
  tags.push({ text: body.text, color: body.color });
  await client.db(process.env.MONGODB_DB).collection("projects").updateOne(
    { _id: projectID },
    {
      $set: {
        editedAt: new Date(),
        tags: tags
      },
    },
  );
  return NextResponse.json({ message: "Tag created successfully" }, { status: 201 });
});

export const DELETE = auth(async function DELETE(req: NextAuthRequest) {
  if (!req.auth || !req.auth.user) return NextResponse.json({ error: "UNAUTHORIZED", message: "Not logged in." }, { status: 401 });
  const { user } = req.auth;
  if (!user.email) return NextResponse.json({ error: "INVALID_USER_PROFILE", message: "User has no email address." }, { status: 400 });

  const body = await req.json();
  if (!body.projectID || body.projectID.trim().length <= 0) return NextResponse.json({ error: "INVALID_PROJECT_ID", message: "Project ID is missing/invalid." }, { status: 400 });
  if (!body.text || body.text.trim().length <= 0) return NextResponse.json({ error: "INVALID_TEXT", message: "Tag text is missing/invalid." }, { status: 400 });
  const projectID = new ObjectId(body.projectID as string);

  const project = await client.db(process.env.MONGODB_DB).collection("projects").findOne({ _id: projectID });
  if (project === null || !(await checkPermissions(projectID.toString(), user.email))) return NextResponse.json({ error: "PROJECT_NOT_FOUND", message: "Project not found." }, { status: 404 });

  const resources: Project["resources"] = project.resources;
  for (const resource of resources) resource.tags = resource.tags.filter(e => !e.text === body.text);
  await client.db(process.env.MONGODB_DB).collection("projects").updateOne(
    { _id: projectID },
    {
      $set: {
        editedAt: new Date(),
        resources: resources,
        tags: project.tags.filter((tag: Tag) => tag.text !== body.text)
      },
    },
  );
  return NextResponse.json({ message: "Tag deleted successfully." }, { status: 200 });
});