"use client"
import { faFileCirclePlus, faGear, faPlus, faTag, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tag } from "@/utils/db";

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
      {openMenu === "managetags" && <ManageTags projectID={projectID} />}
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
  const [tag, setTag] = useState("");
  function handleSubmit() {
    fetch(`/api/tag`, {
      method: "POST",
      body: JSON.stringify({ projectID, text: tag, type: "text" }),
    })
      .then((res) => {
        if (res.ok) {
          router.refresh();
        } else {
          alert("Failed to create tag.");
        }
      });
  }
  return (
    <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg my-2">
      <div className="flex flex-col gap-1">
        {tags.keys.map((tag, index) => <div key={index}>
          
        </div>)}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
        <label htmlFor="tagName" className="text-sm mb-1 font-semibold">New Tag</label>
        <div className="flex gap-2">
          <input type="text" placeholder="Tag Name" id="tagName" value={tag} onChange={(e) => setTag(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg" />
          <button type="submit" className="hover:text-sky-500 bg-slate-300 dark:bg-slate-700 p-1 text-center rounded-lg border-2 border-slate-400 dark:border-slate-900 col-span-3"><FontAwesomeIcon icon={faPlus} /></button>
        </div>
      </form>
    </div>
  )
}