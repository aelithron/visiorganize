import { auth } from "@/auth";
import { getProject, Resource } from "@/utils/db"
import { getTagTextColor, ResourceDisplay } from "@/app/(ui)/displays.module";
import FormattedDate from "@/app/(ui)/time.module";
import { ProjectTools } from "../../projecttools.module";
import { NotFoundProject, NotFoundTag } from "@/app/(ui)/notfound.module";
import { Metadata } from "next";
import { formatCols } from "../../page";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: `View Tag`,
};

export default async function Page({ params }: { params: Promise<{ id: string, tagtext: string }> }) {
  const session = await auth();
  const id = (await params).id;
  const tagText = (await params).tagtext;
  const project = await getProject(id);
  if (session === null || session.user === null || session.user === undefined) return <p className="flex flex-col items-center justify-center p-6 md:px-16 space-y-2">Unauthorized, try logging in!</p>
  if (project === null || (project.user !== session.user.email && !project.sharedWith.includes(session.user.email as string))) return <NotFoundProject id={id} />
  if (project.tags.length === 0 || (project.tags.find((tag) => tag.text === tagText) === undefined)) return <NotFoundTag id={project._id.toString()} tagText={tagText} />
  const tagMap = new Map<string, string>();
  for (const tag of project.tags) tagMap.set(tag.text, tag.color);
  const resourcesToShow: Resource[] = project.resources.filter((resource) => resource.tags.find((resourceTag) => resourceTag === tagText));
  return (
    <div>
      <ProjectTools projectID={id} tags={tagMap} />
      <div className="flex flex-col items-center justify-center p-6 md:px-16">
        <h1 className="text-3xl font-semibold">{project.name}</h1>
        <div className="flex gap-2 items-center mb-1">
          <h1 className="text-xl">Filtering by tag:</h1>
          <p className={"p-1 border-slate-500 border-2 text-sm rounded-lg max-w-min flex gap-1"} style={{ backgroundColor: project.tags.find(e => e.text == tagText)!.color, color: getTagTextColor(project.tags.find(e => e.text == tagText)!.color) }}>
            {tagText}
            <Link href={`/project/${project._id}`} className="bg-slate-300 dark:bg-slate-800 hover:text-sky-500 px-1 rounded-xl"><FontAwesomeIcon icon={faX} size="xs" /></Link>
          </p>
        </div>
        <FormattedDate date={project.editedAt} />
        {project.resources.length === 0 && <p className="text-slate-500 font-semibold text-lg">Project is empty!</p>}
        {(project.resources.length !== 0 && resourcesToShow.length === 0) && <p className="text-slate-500 font-semibold text-lg">No resources match that tag!</p>}
        <div className={`mt-2 gap-3 grid grid-cols-1 ${formatCols(resourcesToShow.length)}`}>
          {resourcesToShow.map((resource, index) => <ResourceDisplay key={index} resource={resource} tags={project.tags} projectID={id} />)}
        </div>
      </div>
    </div>
  )
}