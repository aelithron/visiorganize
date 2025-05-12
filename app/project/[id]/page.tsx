import { auth } from "@/auth";
import client, { Folder, Project, Resource } from "@/utils/db"
import FormattedDate from "@/utils/time.module";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const id = (await params).id

  let _id;
  try {
    _id = new ObjectId(id);
  } catch {
    return <NotFoundProject id={id} />
  }

  const project = await client.db(process.env.MONGODB_DB).collection<Project>("projects").findOne({ _id });
  if (session === null || session.user === null || session.user === undefined) return <p className="flex flex-col items-center justify-center p-6 md:p-16 space-y-2">Unauthorized, try logging in!</p>
  if (project === null || project.user !== session.user.email) return <NotFoundProject id={id} />

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-16">
      <h1 className="text-3xl font-semibold">{project.name}</h1>
      <FormattedDate date={project.editedAt} />
      <div>
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
    <div className="flex flex-col justify-center items-center">
      <p>{folder.name}</p>
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