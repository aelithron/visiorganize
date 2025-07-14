import { auth } from "@/auth";
import { getProject } from "@/utils/db"
import { ResourceDisplay } from "@/app/(ui)/displays.module";
import FormattedDate from "@/app/(ui)/time.module";
import { ProjectTools } from "./projecttools.module";
import { NotFoundProject } from "@/app/(ui)/notfound.module";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `View Project`,
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const id = (await params).id
  const project = await getProject(id);
  if (session === null || session.user === null || session.user === undefined) return <p className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">Unauthorized, try logging in!</p>
  if (project === null || (project.user !== session.user.email && !project.sharedWith.includes(session.user.email as string))) return <NotFoundProject id={id} />
  const tagMap = new Map<string, string>();
  for (const tag of project.tags) tagMap.set(tag.text, tag.color);
  return (
    <div>
      <ProjectTools projectID={id} tags={tagMap} />
      <div className="flex flex-col items-center justify-center p-6 md:px-16">
        <h1 className="text-3xl font-semibold">{project.name}</h1>
        <FormattedDate date={project.editedAt} />
        {project.resources.length === 0 && <p className="text-slate-500 font-semibold text-lg">Project is empty!</p>}
        <div className={`mt-2 gap-3 grid grid-cols-1 ${formatCols(project.resources.length)}`}>
          {project.resources.map((resource, index) => <ResourceDisplay key={index} resource={resource} projectID={id} />)}
        </div>
      </div>
    </div>
  )
}

function formatCols(itemCount: number): string {
  switch (itemCount) {
    case (0):
      return "md:grid-cols-1"
    case (1):
      return "md:grid-cols-1"
    case (2):
      return "md:grid-cols-2"
    default:
      return "md:grid-cols-3"
  }
}