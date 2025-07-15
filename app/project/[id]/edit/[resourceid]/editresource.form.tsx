"use client"
import { getTagTextColor } from "@/app/(ui)/displays.module";
import { Tag } from "@/utils/db";
import { faMinus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function EditResourceForm({ projectID, resourceID, resourceName, resourceBody, resourceTags }: { projectID: string, resourceID: string, resourceName: string, resourceBody: string, resourceTags: Map<string, string> }) {
  const router = useRouter();
  const [name, setName] = useState<string>(resourceName);
  const [body, setBody] = useState<string>(resourceBody);
  const resourceTagList: Tag[] = []
  for (const tag of resourceTags.keys()) resourceTagList.push({ text: tag, color: resourceTags.get(tag)! });
  const [tags, setTags] = useState<Tag[]>(resourceTagList);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`/api/resource`, {
      method: "PATCH",
      body: JSON.stringify({ projectID, name, body }),
    })
      .then((res) => {
        if (res.ok) {
          router.push(`/project/${projectID}/view/${resourceID}`);
        } else {
          alert("Failed to edit resource.");
        }
      });
  }

  return (
    <form className="flex flex-col gap-2 items-center justify-center p-6 md:px-10 space-y-4" onSubmit={handleSubmit}>
      <input type="text" placeholder="Resource Name" value={name} onChange={(e) => setName(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg" />
      <textarea placeholder="Contents" value={body} onChange={(e) => setBody(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg" /> {/* This only works for text-based resources, parse better later :3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-300 dark:bg-slate-700 p-2 rounded-xl">
        <div className="flex flex-col gap-2 items-start">
          {tags.map(tag =>
            <div key={tag.text} className="flex gap-1">
              <button type="button" onClick={() => setTags(tags.filter((tagInList) => tag.text !== tagInList.text))}><FontAwesomeIcon icon={faMinus} /></button>
              <p className={"p-1 border-slate-500 border-2 text-sm rounded-lg max-w-min"} style={{ backgroundColor: tag.color, color: getTagTextColor(tag.color) }}>{tag.text}</p>
            </div>
          )}
        </div>
      </div>
      <button type="submit" className="bg-slate-300 dark:bg-slate-700 p-2 rounded-xl col-span-2"><FontAwesomeIcon icon={faSave} /> Save</button>
    </form>
  )
}