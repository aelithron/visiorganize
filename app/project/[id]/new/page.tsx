import { auth } from "@/auth";
import { getProject } from "@/utils/db"
import FormattedDate from "@/app/(ui)/time.module";
import { NotFoundProject } from "@/app/(ui)/notfound.module";
import FullCreateResource from "./createresource.form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Resource",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const id = (await params).id
  const project = await getProject(id);
  if (session === null || session.user === null || session.user === undefined) return <p className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">Unauthorized, try logging in!</p>
  if (project === null || (project.user !== session.user.email && !project.sharedWith.includes(session.user.email as string))) return <NotFoundProject id={id} />
  return (
    <div>
      <div className="m-8 w-min">
      <div className="flex gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg sticky">
        <Link href={`/project/${id}`} className="hover:text-sky-500"><FontAwesomeIcon icon={faArrowLeft} /></Link>
      </div>
    </div>
      <div className="flex flex-col items-center justify-center p-6 md:px-16">
        <h1 className="text-3xl font-semibold">{project.name}</h1>
        <FormattedDate date={project.editedAt} />
        <FullCreateResource projectID={id} />
      </div>
    </div>
  )
}