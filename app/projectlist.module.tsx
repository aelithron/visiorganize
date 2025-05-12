export const dynamic = "force-dynamic";
import Link from "next/link";
import { getUserProjects } from "@/utils/db";
import { auth } from "@/auth";
import { Session, User } from "next-auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default async function ProjectList() {
  const session: Session | null = await auth();
  if (!session || !session.user) return <div className="text-center mt-3">Unauthorized, make sure to log in!</div>
  const user: User = session.user;
  if (user.email === null || user.email === undefined) return <div className="text-center mt-3">User ID not found.</div>
  const projects = await getUserProjects(user.email);
  if (projects.length === 0) {
    return (
      <div className="text-center mt-3 space-y-4">
        <h1>You don&lsquo;t have any projects!</h1>
        <Link href="/create" className="bg-violet-500 p-2 rounded-xl hover:text-sky-500"><FontAwesomeIcon icon={faPlus} /> Create a Project</Link>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-max mt-5">
      {projects.map((project) => (
        <div className="flex flex-col border-slate-700 border-2 p-3 rounded-lg" key={project._id.toString()}>
          <Link href={`/project/${project._id}`} className="text-xl font-semibold">{project.name}</Link>
          <FormattedDate date={project.createdAt} />
        </div>
      ))}
    </div>
  )
}

function FormattedDate({ date }: { date: Date }) {
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return <span className="text-sm text-slate-600 dark:text-slate-400">Edited {formattedDate}</span>;
}