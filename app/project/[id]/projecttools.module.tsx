"use client"
import { faFileCirclePlus, faGear, faPlus, faTag, faTrash, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getTagTextColor } from "@/app/(ui)/displays.module";

export function ProjectTools({ projectID, tags }: { projectID: string, tags: Map<string, string> }) {
  type PossibleMenus = "createresource" | "managetags" | null;
  const [openMenu, setOpenMenu] = useState<PossibleMenus>(null);
  return (
    <div className="m-8 md:w-1/3">
      <div className="flex gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg justify-between sticky">
        <button onClick={() => setOpenMenu(openMenu !== "createresource" ? "createresource" : null)} className="hover:text-sky-500"><FontAwesomeIcon icon={faFileCirclePlus} /></button>
        <button onClick={() => setOpenMenu(openMenu !== "managetags" ? "managetags" : null)} className="hover:text-sky-500"><FontAwesomeIcon icon={faTag} /></button>
        <Link href={`/project/${projectID}/settings`} className="hover:text-sky-500"><FontAwesomeIcon icon={faGear} /></Link>
      </div>
      {openMenu === "createresource" && <CreateResource projectID={projectID} />}
      {openMenu === "managetags" && <ManageTags projectID={projectID} tags={tags} />}
    </div>
  )
}

export function CreateResource({ projectID }: { projectID: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  function onClick(projectID: string, name: string, body: string) {
    fetch(`/api/resource`, {
      method: "POST",
      body: JSON.stringify({ projectID, name, type: "text", body }),
    })
      .then((res) => {
        if (res.ok) {
          router.refresh();
        } else {
          alert("Failed to create resource.");
        }
      });
  }
  return (
    <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg my-2">
      <input type="text" placeholder="Resource Name" value={name} onChange={(e) => setName(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg" />
      <textarea placeholder="Contents" value={body} onChange={(e) => setBody(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg" />
      <div className="grid grid-cols-4 gap-2">
        <button onClick={() => onClick(projectID, name, body)} className="hover:text-sky-500 bg-slate-300 dark:bg-slate-700 p-2 text-center rounded-xl border-2 border-slate-400 dark:border-slate-900 col-span-3"><FontAwesomeIcon icon={faFileCirclePlus} /> Create Resource</button>
        <Link href={`/project/${projectID}/new${name !== "" ? `?name=${name}` : ""}${body !== "" ? `${name === "" ? "?" : "&"}body=${body}` : ""}`} className="hover:text-sky-500 bg-slate-300 dark:bg-slate-700 p-2 text-center rounded-xl border-2 border-slate-400 dark:border-slate-900"><FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} /></Link>
      </div>
    </div>
  )
}

export function ManageTags({ projectID, tags }: { projectID: string, tags: Map<string, string> }) {
  const router = useRouter();
  const [tag, setTag] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch(`/api/tag`, {
      method: "POST",
      body: JSON.stringify({ projectID, text: tag, color: color }),
    })
      .then((res) => {
        if (res.ok) {
          tags.set(tag.toLowerCase(), color);
          router.refresh();
          setTag("");
          setColor("#000000");
        } else {
          alert("Failed to create tag.");
        }
      });
  }
  function handleTagDelete(tagText: string) {
    fetch(`/api/tag`, {
      method: "DELETE",
      body: JSON.stringify({ projectID, text: tagText }),
    })
      .then((res) => {
        if (res.ok) {
          tags.delete(tagText);
          router.refresh();
        } else {
          alert("Failed to delete tag.");
        }
      });
  }
  return (
    <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg my-2">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
        {Array.from(tags.entries()).map(([text, color]) => <div key={text} className="flex justify-center gap-2">
          <p className={"p-2 border-slate-500 border-2 rounded-lg max-w-min"} style={{ backgroundColor: color, color: getTagTextColor(color) }}>{text}</p>
          <button onClick={() => handleTagDelete(text)}><FontAwesomeIcon icon={faTrash} /></button>
        </div>)}
        {tags.size < 1 && <p className="col-span-2 md:col-span-3 text-center p-1">You have no tags!</p>}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
        <label className="text-sm mb-1 font-semibold">New Tag</label>
        <div className="flex gap-2 items-center">
          <input type="text" placeholder="Tag Name" value={tag} onChange={(e) => setTag(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg" />
          <div className="bg-slate-300 dark:bg-slate-700 rounded-lg border-2 border-slate-400 dark:border-slate-900"><input type="color" value={color} onChange={(e) => setColor(e.target.value)} /></div>
          <button type="submit" className="hover:text-sky-500 bg-slate-300 dark:bg-slate-700 p-1 text-center rounded-lg border-2 border-slate-400 dark:border-slate-900"><FontAwesomeIcon icon={faPlus} /></button>
        </div>
      </form>
    </div>
  )
}