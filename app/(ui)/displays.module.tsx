import { Resource } from "@/utils/db"
import { DeleteResource } from "./tempresourcedelete.module"

export function ResourceDisplay({ resource, projectID }: { resource: Resource, projectID: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 px-4 bg-slate-200 dark:bg-slate-800 rounded-lg">
      <div className="flex flex-col justify-center">
        <div className="flex gap-1">{resource.name} <p className="text-slate-500">({resource.type.name})</p></div>
        {resource.body} {/* This is a temporary method, parse better later :3 */}
      </div>
      <DeleteResource projectID={projectID} resourceID={resource._id.toString()} />
    </div>
  )
}