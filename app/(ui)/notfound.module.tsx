import { faHome } from "@fortawesome/free-solid-svg-icons";
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
export function NotFoundFolder({ id, folderid }: { id: string, folderid: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">
      <h1 className="text-3xl font-semibold">Folder not found!</h1>
      <p>The folder you are looking for could not be found.</p>
      <Link href={"/"} className="hover:text-sky-500 bg-blue-500 p-2 rounded-xl"><FontAwesomeIcon icon={faHome} /> Go Home</Link>
      <p className="text-sm text-slate-500 mt-6">Project ID: {id}</p>
      <p className="text-sm text-slate-500">Folder ID: {folderid}</p>
    </div>
  )
}
export function NotFoundResource({ id, resourceID, folderID }: { id: string, resourceID: string, folderID?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">
      <h1 className="text-3xl font-semibold">Resource not found!</h1>
      <p>The resource you are looking for could not be found.</p>
      <Link href={"/"} className="hover:text-sky-500 bg-blue-500 p-2 rounded-xl"><FontAwesomeIcon icon={faHome} /> Go Home</Link>
      <p className="text-sm text-slate-500 mt-6">Project ID: {id}</p>
      {folderID && <p className="text-sm text-slate-500">Folder ID: {folderID}</p>}
      <p className="text-sm text-slate-500">Resource ID: {resourceID}</p>
    </div>
  )
}