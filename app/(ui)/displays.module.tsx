import { Resource } from "@/utils/db"
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export function ResourceDisplay({ resource, projectID }: { resource: Resource, projectID: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 px-4 bg-slate-200 dark:bg-slate-800 rounded-lg">
      <div className="flex flex-col justify-center">
        <div className="flex gap-1">
          <Link href={`/project/${projectID}/view/${resource._id.toString()}`} className="hover:text-sky-500">{resource.name}</Link> 
          {/*<p className="text-slate-500">({resource.type.name})</p>*/} {/* Uncomment when multiple resource types exist */}
        </div>
        <p className="text-sm text-slate-800 dark:text-slate-300">{resource.body}</p> {/* This only works for text-based resources, parse better later :3 */}
      </div>
      <Link href={`/project/${projectID}/view/${resource._id.toString()}`} className="hover:text-sky-500"><FontAwesomeIcon icon={faUpRightFromSquare} /></Link> 
    </div>
  )
}