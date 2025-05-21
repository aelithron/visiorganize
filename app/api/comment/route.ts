import { auth } from "@/auth";
import { getProject } from "@/utils/db";
import { ObjectId } from "mongodb";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const POST = auth(async function POST(req: NextAuthRequest) {
  if (!req.auth || !req.auth.user) return NextResponse.json({ error: "UNAUTHORIZED", message: "Not logged in" }, { status: 401 });
  const { user } = req.auth;
  if (user.email === null || user.email === undefined) return NextResponse.json({ error: "USER_PROFILE_INVALID", message: "User has no email address" }, { status: 400 });

  const body = await req.json();
  if (body.projectID === undefined || body.projectID === null || body.projectID.trim().length <= 0) return NextResponse.json({ error: "INVALID_PROJECTID", message: "Project ID is missing/invalid" }, { status: 400 });
  if (body.resourceID === undefined || body.resourceID === null || body.resourceID.trim().length <= 0) return NextResponse.json({ error: "INVALID_RESOURCEID", message: "Resource ID is missing/invalid" }, { status: 400 });
  if (body.body === undefined || body.body === null || body.body.trim().length <= 0) return NextResponse.json({ error: "INVALID_BODY", message: "Comment body is missing/invalid" }, { status: 400 });
  const projectID = new ObjectId(body.projectID as string);
  const resourceID = new ObjectId(body.resourceID as string);
  const commentID = new ObjectId();
  const fullProject = await getProject(body.projectID);
  if (fullProject === null) return NextResponse.json({ error: "NO_PROJECT", message: "Project not found" }, { status: 404 });

  // actual comment logic not implemented yet

  return NextResponse.json({
    message: "Comment created successfully",
    id: commentID,
  }, {
    status: 201,
  });
});