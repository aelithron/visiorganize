import { auth } from "@/auth";
import { getProject } from "@/utils/db"
import FormattedDate from "@/utils/time.module";
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ProjectSettings } from "./settings.module";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const id = (await params).id;
  const project = await getProject(id);
  if (session === null || session.user === null || session.user === undefined) return <p className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">Unauthorized, try logging in!</p>
  if (project === null || project.user !== session.user.email) return <NotFoundProject id={id} />

  return (
    <div>
      <Link href={`/project/${id}`} className="inline-flex mt-6 ml-6 p-2 rounded-full hover:text-sky-500 bg-slate-300 dark:bg-slate-700"><FontAwesomeIcon icon={faArrowLeft} /></Link>
      <div className="flex flex-col items-center justify-center p-6 md:px-16 md:py-8">
        <h1 className="text-3xl font-semibold">{project.name}</h1>
        <FormattedDate date={project.editedAt} />
        <ProjectSettings projectID={id} projectName={project.name} />
      </div>
    </div>
  )
}

function NotFoundProject({ id }: { id: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">
      <h1 className="text-3xl font-semibold">Project not found!</h1>
      <p>The project you are looking for could not be found.</p>
      <Link href={"/"} className="hover:text-sky-500 bg-blue-500 p-2 rounded-xl"><FontAwesomeIcon icon={faHome} /> Go Home</Link>
      <p className="text-sm text-slate-500 mt-6">Project ID: {id}</p>
    </div>
  )
}