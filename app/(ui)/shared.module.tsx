import { Project } from "@/utils/db"
import { faLock, faQuestionCircle, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { User } from "next-auth"

export default function SharedMessage({ project, user }: { project: Project, user: User }) {
  if (project.sharedWith === undefined || project.sharedWith.length === 0) return <span className="text-sm text-slate-600 dark:text-slate-400"><FontAwesomeIcon icon={faLock} className="mr-[2px]" /> Not shared</span>
  if (project.user === user.email) return <span className="text-sm text-slate-600 dark:text-slate-400"><FontAwesomeIcon icon={faUserGroup} className="mr-[2px]" /> Shared (you own)</span>
  if (project.sharedWith.find((email) => email === user.email)) return <span className="text-sm text-slate-600 dark:text-slate-400"><FontAwesomeIcon icon={faUserGroup} className="mr-[2px]" /> Shared (by {project.user})</span>
  return <span className="text-sm text-slate-600 dark:text-slate-400"><FontAwesomeIcon icon={faQuestionCircle} /> Error: Access state unknown</span>
}