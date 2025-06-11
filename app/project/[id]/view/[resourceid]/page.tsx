import { auth } from "@/auth";
import { getProject } from "@/utils/db"
import FormattedDate from "@/utils/time.module";
import { NotFoundFolder, NotFoundProject } from "@/app/(ui)/notfound.module";
import { ResourceTools } from "./resourcetools.module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

export default async function Page({ params }: { params: Promise<{ id: string, folderid: string, resourceid: string }> }) {
  const session = await auth();
  const id = (await params).id;
  const folderID = (await params).folderid;
  const resourceID = (await params).resourceid;
  const project = await getProject(id);
  if (session === null || session.user === null || session.user === undefined) return <p className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">Unauthorized, try logging in!</p>
  if (project === null || (project.user !== session.user.email && !project.sharedWith.includes(session.user.email as string))) return <NotFoundProject id={id} />
  const folder = project.folders.find((folder) => folder._id.toString() === folderID);
  if (folder === undefined) return <NotFoundFolder id={id} folderid={folderID} />

  return (
    <div>
      <ResourceTools projectID={id} folderID={folderID} resourceID={resourceID} />
      <div className="flex flex-col items-center justify-center p-6 md:px-16 md:py-8">
        <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faFolder} /> {folder.name}</h1>
        <h1 className="text-xl text-slate-800 dark:text-slate-200">in {project.name}</h1>
        <FormattedDate date={project.editedAt} />
      </div>
    </div>
  )
}