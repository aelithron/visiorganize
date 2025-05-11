import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { NextAuthRequest } from "next-auth";

export const POST = auth(async function POST(req: NextAuthRequest) {
  if (!req.auth || !req.auth.user) return NextResponse.json({ error: "UNAUTHORIZED", message: "Not logged in" }, { status: 401 });
  const { user } = req.auth;
  console.log(user);
  const projectID = crypto.randomUUID();

  const body = await req.json();
  if (body.name === undefined || body.name === null) return NextResponse.json({ error: "INVALID_NAME", message: "Project name is invalid" }, { status: 400 });
  const projectName = body.name.trim();
  if (projectName.length <= 0) return NextResponse.json({ error: "INVALID_NAME", message: "Project name is invalid" }, { status: 400 });

  console.log("Creating project for user:", user, "with name:", projectName, "and ID:", projectID);
  return NextResponse.json({ message: "Project created successfully", id: projectID }, { status: 201 });
});