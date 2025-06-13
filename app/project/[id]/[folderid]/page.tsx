import { auth } from "@/auth";
import { getProject } from "@/utils/db"
import { ResourceDisplay } from "@/utils/displays.module";
import FormattedDate from "@/utils/time.module";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FolderTools } from "./foldertools.module";
import { NotFoundFolder } from "@/app/(ui)/notfound.module";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Folder",
};

export default async function Page({ params }: { params: Promise<{ id: string, folderid: string }> }) {
  const session = await auth();
  const id = (await params).id;
  const folderid = (await params).folderid;
  const project = await getProject(id);
  if (session === null || session.user === null || session.user === undefined) return <p className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">Unauthorized, try logging in!</p>
  if (project === null || (project.user !== session.user.email && !project.sharedWith.includes(session.user.email as string))) return <NotFoundFolder id={id} folderid={folderid} />
  const folder = project.folders.find((folder) => folder._id.toString() === folderid);
  if (folder === undefined) return <NotFoundFolder id={id} folderid={folderid} />

  return (
    <div>
      <FolderTools folderID={folderid} projectID={id} />
      <div className="flex flex-col items-center justify-center p-6 md:px-16 md:py-8">
        <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faFolder} /> {folder.name}</h1>
        <h1 className="text-xl text-slate-800 dark:text-slate-200">in {project.name}</h1>
        <FormattedDate date={project.editedAt} />
        <div className={`mt-2 gap-3 grid grid-cols-1 ${formatCols(folder.resources.length)}`}>
          {(folder.resources.length === 0) && <p className="text-slate-500 font-semibold text-lg">Folder is empty!</p>}
          {folder.resources.map((resource, index) => <ResourceDisplay key={index} resource={resource} projectID={id} folderID={folder._id.toString()} />)}
        </div>
      </div>
    </div>
  )
}

function formatCols(projectCount: number): string {
  switch (projectCount) {
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