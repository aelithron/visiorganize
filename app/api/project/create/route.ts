import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { NextAuthRequest } from "next-auth";
import { createProject } from "@/utils/db";
import { ObjectId } from "mongodb";

export const POST = auth(async function POST(req: NextAuthRequest) {
  if (!req.auth || !req.auth.user) return NextResponse.json({ error: "UNAUTHORIZED", message: "Not logged in" }, { status: 401 });
  const { user } = req.auth;
  if (user.email === null || user.email === undefined) return NextResponse.json({ error: "USER_PROFILE_INVALID", message: "User has no email address" }, { status: 400 });
  const projectID = new ObjectId();

  const body = await req.json();
  if (body.name === undefined || body.name === null || body.name.trim().length <= 0) return NextResponse.json({ error: "INVALID_NAME", message: "Project name is invalid" }, { status: 400 });
  const projectName = body.name.trim();

  console.log("Creating project for user:", user, "with name:", projectName, "and ID:", projectID);
  createProject(user.email, projectName, projectID);
  return NextResponse.json({ message: "Project created successfully", id: projectID }, { status: 201 });
});