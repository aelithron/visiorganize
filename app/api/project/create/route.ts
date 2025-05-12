import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { NextAuthRequest } from "next-auth";
import { ObjectId } from "mongodb";
import client from "@/utils/db";

export const POST = auth(async function POST(req: NextAuthRequest) {
  if (!req.auth || !req.auth.user) return NextResponse.json({ error: "UNAUTHORIZED", message: "Not logged in" }, { status: 401 });
  const { user } = req.auth;
  if (user.email === null || user.email === undefined) return NextResponse.json({ error: "USER_PROFILE_INVALID", message: "User has no email address" }, { status: 400 });
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
  });
  return NextResponse.json({ message: "Project created successfully", id: projectID }, { status: 201 });
});