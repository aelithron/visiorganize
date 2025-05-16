import { auth } from "@/auth";
import { getProject } from "@/utils/db"
import FormattedDate from "@/utils/time.module";
import { faFolder, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string, folderid: string } }) {
  const session = await auth();
  const id = (await params).id;
  const folderid = (await params).folderid;
  const project = await getProject(id);
  if (session === null || session.user === null || session.user === undefined) return <p className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">Unauthorized, try logging in!</p>
  if (project === null || project.user !== session.user.email) return <NotFoundFolder id={id} folderid={folderid} />
  const folder = project.folders.find((folder) => folder._id.toString() === folderid);
  if (folder === undefined) return <NotFoundFolder id={id} folderid={folderid} />

  return (
    <div className="flex flex-col items-center justify-center p-6 md:px-16 md:py-8">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faFolder} /> {folder.name}</h1>
      <h1 className="text-xl text-slate-800 dark:text-slate-200">in {project.name}</h1>
      <FormattedDate date={project.editedAt} />
    </div>
  )
}

function NotFoundFolder({ id, folderid }: { id: string, folderid: string }) {
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