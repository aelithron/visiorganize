import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormattedDate from "./time.module"
import { Folder, Resource } from "./db"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export function FolderDisplay({ folder, projectid }: { folder: Folder, projectid: string }) {
  return (
    <div className="flex flex-col justify-center bg-slate-300 dark:bg-slate-800 py-2 px-4 rounded-lg">
      <Link className="text-xl font-medium hover:text-sky-500" href={`/project/${projectid}/${folder._id}`}><FontAwesomeIcon icon={faFolder} /> {folder.name}</Link>
      {folder.resources.length === 0 && <p className="text-slate-500">Folder is empty!</p>}
      {folder.resources.map((resource, index) => <ResourceDisplay key={index} resource={resource} />)}
    </div>
  )
}

export function ResourceDisplay({ resource }: { resource: Resource }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <p>{resource.name} <p className="text-slate-500">({resource.type})</p></p>
      <FormattedDate date={resource.editedAt} />
      {resource.body as string} {/* This is a temporary method, parse better later :3 */}
    </div>
  )
}