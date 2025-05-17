import { auth } from "@/auth";
import { getProject } from "@/utils/db";
import { NotFoundProject } from "../page";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const id = (await params).id;
  const project = await getProject(id);
  if (session === null || session.user === null || session.user === undefined) return <p className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">Unauthorized, try logging in!</p>
  if (project === null || project.user !== session.user.email) return <NotFoundProject id={id} />

  return (
    <div className="flex flex-col items-center justify-center p-6 md:px-16">
    </div>
  )
}