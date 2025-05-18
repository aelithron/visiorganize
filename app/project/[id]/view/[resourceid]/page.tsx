import { auth } from "@/auth";
import { getProject } from "@/utils/db"
import FormattedDate from "@/utils/time.module";
import { NotFoundProject } from "@/app/(ui)/notfound.module";
import { ResourceTools } from "./resourcetools.module";

export default async function Page({ params }: { params: Promise<{ id: string, resourceid: string }> }) {
  const session = await auth();
  const id = (await params).id;
  const resourceID = (await params).resourceid;
  const project = await getProject(id);
  if (session === null || session.user === null || session.user === undefined) return <p className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">Unauthorized, try logging in!</p>
  if (project === null || project.user !== session.user.email) return <NotFoundProject id={id} />
  

  return (
    <div>
      <ResourceTools projectID={id} resourceID={resourceID} />
      <div className="flex flex-col items-center justify-center p-6 md:px-16">
        <h1 className="text-3xl font-semibold">{project.name}</h1>
        <FormattedDate date={project.editedAt} />
        
      </div>
    </div>
  )
}