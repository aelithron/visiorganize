import { auth } from "@/auth";
import { getProject } from "@/utils/db"
import FormattedDate from "@/utils/time.module";
import { NotFoundProject } from "../../page";
import { ResourceTools } from "./resourcetools.module";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default async function Page({ params }: { params: { id: string, resourceid: string } }) {
  const session = await auth();
  const id = (await params).id;
  const resourceID = (await params).resourceid;
  const project = await getProject(id);
  if (session === null || session.user === null || session.user === undefined) return <p className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">Unauthorized, try logging in!</p>
  if (project === null || project.user !== session.user.email) return <NotFoundProject id={id} />
  

  return (
    <div>
      <ResourceTools projectID={id} resourceID={resourceID} />
      <div className="flex flex-col items-center justify-center p-6 md:px-16">
        <h1 className="text-3xl font-semibold">{project.name}</h1>
        <FormattedDate date={project.editedAt} />
        
      </div>
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