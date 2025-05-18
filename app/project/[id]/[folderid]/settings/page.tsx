import { auth } from "@/auth";
import { getProject } from "@/utils/db"
import FormattedDate from "@/utils/time.module";
import { faArrowLeft, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FolderSettings } from "./settings.module";
import { NotFoundFolder } from "@/app/(ui)/notfound.module";

export default async function Page({ params }: { params: Promise<{ id: string, folderid: string }> }) {
  const session = await auth();
  const id = (await params).id;
  const folderid = (await params).folderid;
  const project = await getProject(id);
  if (session === null || session.user === null || session.user === undefined) return <p className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">Unauthorized, try logging in!</p>
  if (project === null || project.user !== session.user.email) return <NotFoundFolder id={id} folderid={folderid} />
  const folder = project.folders.find((folder) => folder._id.toString() === folderid);
  if (folder === undefined) return <NotFoundFolder id={id} folderid={folderid} />

  return (
    <div>
      <Link href={`/project/${id}/${folderid}`} className="inline-flex mt-6 ml-6 p-2 rounded-full hover:text-sky-500 bg-slate-300 dark:bg-slate-700"><FontAwesomeIcon icon={faArrowLeft} /></Link>
      <div className="flex flex-col items-center justify-center p-6 md:px-16 md:py-8">
        <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faFolder} /> {folder.name}</h1>
        <h1 className="text-xl text-slate-800 dark:text-slate-200">in {project.name}</h1>
        <FormattedDate date={project.editedAt} />
        <FolderSettings projectID={id} folderID={folderid} folderName={folder.name} />
      </div>
    </div>
  )
}