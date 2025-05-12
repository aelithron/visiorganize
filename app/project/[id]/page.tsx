import { auth } from "@/auth";
import { Folder, getProject, Resource } from "@/utils/db"
import FormattedDate from "@/utils/time.module";
import { faFolder, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const id = (await params).id
  const project = await getProject(id);
  if (session === null || session.user === null || session.user === undefined) return <p className="flex flex-col items-center justify-center p-6 md:p-16 space-y-2">Unauthorized, try logging in!</p>
  if (project === null || project.user !== session.user.email) return <NotFoundProject id={id} />

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-16">
      <h1 className="text-3xl font-semibold">{project.name}</h1>
      <FormattedDate date={project.editedAt} />
      <div className={`mt-2 gap-3 grid grid-cols-1 ${formatCols(project.folders.length + project.resources.length)}`}>
        {((project.folders.length === 0) && (project.resources.length === 0)) && <p className="text-slate-500">Project is empty!</p>}
        {project.folders.map((folder, index) => <FolderDisplay key={index} folder={folder} />)}
        {project.resources.map((resource, index) => <ResourceDisplay key={index} resource={resource} />)}
      </div>
    </div>
  )
}

function NotFoundProject({ id }: { id: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-16 space-y-2">
      <h1 className="text-3xl font-semibold">Project not found!</h1>
      <p>The project you are looking for could not be found.</p>
      <Link href={"/"} className="hover:text-sky-500 bg-blue-500 p-2 rounded-xl"><FontAwesomeIcon icon={faHome} /> Go Home</Link>
      <p className="text-sm text-slate-500 mt-6">Project ID: {id}</p>
    </div>
  )
}

function FolderDisplay({ folder }: { folder: Folder }) {
  return (
    <div className="flex flex-col justify-center bg-slate-300 dark:bg-slate-800 py-2 px-4 rounded-lg">
      <p className="text-xl font-medium"><FontAwesomeIcon icon={faFolder} /> {folder.name}</p>
      {folder.resources.length === 0 && <p className="text-slate-500">Folder is empty!</p>}
      {folder.resources.map((resource, index) => <ResourceDisplay key={index} resource={resource} />)}
    </div>
  )
}

function ResourceDisplay({ resource }: { resource: Resource }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <p>{resource.name} <p className="text-slate-500">({resource.type})</p></p>
      <FormattedDate date={resource.editedAt} />
      {resource.data as string} {/* This is a temporary method, parse better later :3 */}
    </div>
  )
}

function formatCols(projectCount: number): string {
  switch (projectCount) {
    case (1):
      return "md:grid-cols-1"
    case (2):
      return "md:grid-cols-2"
    default:
      return "md:grid-cols-3"
  }
}