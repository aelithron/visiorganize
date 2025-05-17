import { auth } from "@/auth";
import { getProject } from "@/utils/db";
import { NotFoundFolder } from "../page";

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
    <div className="flex flex-col items-center justify-center p-6 md:px-16">
    </div>
  )
}