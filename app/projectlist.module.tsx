export const dynamic = "force-dynamic";
import Link from "next/link";
import { auth } from "@/auth";
import { Session, User } from "next-auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FormattedDate from "@/utils/time.module";
import client, { Project } from "@/utils/db";
import SharedMessage from "./(ui)/shared.module";

export default async function ProjectList() {
  const session: Session | null = await auth();
  if (!session || !session.user) return <div className="text-center mt-3">Unauthorized, make sure to log in!</div>
  const user: User = session.user;
  if (user.email === null || user.email === undefined) return <div className="text-center mt-3">User ID not found.</div>
  const projects = await client.db(process.env.MONGODB_DB).collection<Project>("projects").find({ user: user.email }).toArray(); // once again, may not keep email ids
  const sharedProjects = await client.db(process.env.MONGODB_DB).collection<Project>("projects").find({ sharedWith: user.email }).toArray(); // once again, may not keep email ids
  projects.push(...sharedProjects);

  if (projects.length === 0) {
    return (
      <div className="text-center mt-3 space-y-4">
        <h1>You don&lsquo;t have any projects!</h1>
        <Link href="/create" className="bg-violet-500 p-2 rounded-xl hover:text-sky-500"><FontAwesomeIcon icon={faPlus} /> Create a Project</Link>
      </div>
    )
  }
  return (
    <div className={`grid grid-cols-1 ${formatColsForProjects(projects.length)} gap-4 w-max mt-5`}>
      {projects.map((project) => (
        <div className="flex flex-col justify-center p-3 bg-slate-200 dark:bg-slate-800 rounded-lg" key={project._id.toString()}>
          <Link href={`/project/${project._id}`} className="text-xl font-semibold hover:text-sky-500">{project.name}</Link>
          <FormattedDate date={project.editedAt} />
          <SharedMessage project={project} user={user} />
        </div>
      ))}
    </div>
  )
}

function formatColsForProjects(projectCount: number): string {
  switch (projectCount) {
    case (1):
      return "md:grid-cols-1"
    case (2):
      return "md:grid-cols-2"
    default:
      return "md:grid-cols-3"
  }
}