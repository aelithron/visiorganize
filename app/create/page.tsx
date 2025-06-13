import { Metadata } from "next";
import NewProject from "./newproj.form";

export const metadata: Metadata = {
  title: "Create Project",
};

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-16">
      <h1 className="text-3xl font-semibold mb-4">Create a Project</h1>
      <NewProject />
    </div>
  )
}