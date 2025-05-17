import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "Ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.IMAGE_TAG || "Unknown",
    github_repo: "https://github.com/aelithron/visiorganize",
  });
}