import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Folder, Resource } from "./db"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { DeleteResource } from "./tempresourcedelete.module"

export function FolderDisplay({ folder, projectid }: { folder: Folder, projectid: string }) {
  return (
    <div className="flex flex-col justify-center bg-slate-300 dark:bg-slate-700 py-2 px-4 rounded-lg">
      <Link className="text-xl font-medium hover:text-sky-500" href={`/project/${projectid}/${folder._id}`}><FontAwesomeIcon icon={faFolder} /> {folder.name}</Link>
      {folder.resources.length === 0 && <p className="text-slate-500">Folder is empty!</p>}
      {folder.resources.map((resource, index) => <ResourceDisplay key={index} resource={resource} projectID={projectid} folderID={folder._id.toString()} />)}
    </div>
  )
}

export function ResourceDisplay({ resource, projectID, folderID }: { resource: Resource, projectID: string, folderID?: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 px-4 bg-slate-200 dark:bg-slate-800 rounded-lg">
      <div className="flex flex-col justify-center">
        <div className="flex gap-1">{resource.name} <p className="text-slate-500">({resource.type.name})</p></div>
        {resource.body} {/* This is a temporary method, parse better later :3 */}
      </div>
      <DeleteResource projectID={projectID} resourceID={resource._id.toString()} folderID={folderID} />
    </div>
  )
}