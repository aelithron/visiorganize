import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export function NotFoundProject({ id }: { id: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">
      <h1 className="text-3xl font-semibold">Project not found!</h1>
      <p>The project you are looking for could not be found.</p>
      <Link href={"/"} className="hover:text-sky-500 bg-blue-500 p-2 rounded-xl"><FontAwesomeIcon icon={faHome} /> Go Home</Link>
      <p className="text-sm text-slate-500 mt-6">Project ID: {id}</p>
    </div>
  )
}

export function NotFoundResource({ id, resourceID }: { id: string, resourceID: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">
      <h1 className="text-3xl font-semibold">Resource not found!</h1>
      <p>The resource you are looking for could not be found.</p>
      <Link href={"/"} className="hover:text-sky-500 bg-blue-500 p-2 rounded-xl"><FontAwesomeIcon icon={faHome} /> Go Home</Link>
      <p className="text-sm text-slate-500 mt-6">Project ID: {id}</p>
      <p className="text-sm text-slate-500">Resource ID: {resourceID}</p>
    </div>
  )
}

export function NotFoundTag({ id, tagText }: { id: string, tagText: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">
      <h1 className="text-3xl font-semibold">Tag not found!</h1>
      <p>The tag you are looking for could not be found.</p>
      <Link href={`/project/${id}`} className="hover:text-sky-500 bg-blue-500 p-2 rounded-xl"><FontAwesomeIcon icon={faArrowLeft} /> Back to Project</Link>
      <p className="text-sm text-slate-500 mt-6">Project ID: {id}</p>
      <p className="text-sm text-slate-500">Tag: {tagText}</p>
    </div>
  )
}