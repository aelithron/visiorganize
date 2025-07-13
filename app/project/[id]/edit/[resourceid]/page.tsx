import { auth } from "@/auth";
import { getProject } from "@/utils/db"
import { NotFoundProject, NotFoundResource } from "@/app/(ui)/notfound.module";
import { Metadata } from "next";
import EditResourceForm from "./edit.form";

export const metadata: Metadata = {
  title: "Edit Resource",
};

export default async function Page({ params }: { params: Promise<{ id: string, resourceid: string }> }) {
  const session = await auth();
  const id = (await params).id;
  const resourceID = (await params).resourceid;
  const project = await getProject(id);
  if (session === null || session.user === null || session.user === undefined) return <p className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">Unauthorized, try logging in!</p>
  if (project === null || (project.user !== session.user.email && !project.sharedWith.includes(session.user.email as string))) return <NotFoundProject id={id} />
  const resource = project.resources.find((res) => res._id.toString() === resourceID);
  if (resource === undefined) return <p className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2"><NotFoundResource id={id} resourceID={resourceID} /></p>

  return (
    <div className="flex flex-col items-center justify-center p-6 md:px-16">
      <h1 className="text-3xl font-semibold">{resource.name}</h1>
      <h1 className="text-xl text-slate-800 dark:text-slate-200">in {project.name}</h1>
      <EditResourceForm projectID={id} resourceID={resourceID} resourceName={project.name} resourceBody={resource.body} />
    </div>
  )
}