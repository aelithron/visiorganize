"use client"
import { faFileCirclePlus, faFolderPlus, faTrash, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProjectTools({ projectID }: { projectID: string }) {
  type PossibleMenus = "createfolder" | "deleteproject" | "createresource" | null;
  const [openMenu, setOpenMenu] = useState<PossibleMenus>(null);
  return (
    <div className="m-8 md:w-1/3">
      <div className="flex gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg justify-between sticky">
        <button onClick={() => setOpenMenu(openMenu !== "createfolder" ? "createfolder" : null)} className="hover:text-sky-500"><FontAwesomeIcon icon={faFolderPlus} /></button>
        <button onClick={() => setOpenMenu(openMenu !== "createresource" ? "createresource" : null)} className="hover:text-sky-500"><FontAwesomeIcon icon={faFileCirclePlus} /></button>
        <button onClick={() => setOpenMenu(openMenu !== "deleteproject" ? "deleteproject" : null)} className="hover:text-sky-500"><FontAwesomeIcon icon={faTrash} /></button>
      </div>
      {openMenu === "createfolder" && <CreateFolder projectID={projectID} />}
      {openMenu === "createresource" && <CreateResource projectID={projectID} />}
      {openMenu === "deleteproject" && <DeleteProject projectID={projectID} closeMenu={() => setOpenMenu(null)} />}
    </div>
  )
}

export function CreateResource({ projectID, folderID }: { projectID: string, folderID?: string }) {
  const [name, setName] = useState("");
  function onClick(projectID: string, name: string, folderID?: string) {
    fetch(`/api/resource`, {
      method: "POST",
      body: JSON.stringify({ projectID, folderID, name }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Resource created successfully!");
        } else {
          alert("Failed to create resource.");
        }
      });
  }
  return (
    <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg my-2">
      <input type="text" placeholder="Resource Name" value={name} onChange={(e) => setName(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg" />
      <div className="grid grid-cols-4 gap-2">
        <button onClick={() => onClick(projectID, name, folderID)} className="hover:text-sky-500 bg-slate-300 dark:bg-slate-700 p-2 text-center rounded-xl border-2 border-slate-400 dark:border-slate-900 col-span-3"><FontAwesomeIcon icon={faFileCirclePlus} /> Create Resource</button>
        <Link href={`/project/${projectID}${folderID ? `/${folderID}` : ""}/new`} className="hover:text-sky-500 bg-slate-300 dark:bg-slate-700 p-2 text-center rounded-xl border-2 border-slate-400 dark:border-slate-900"><FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} /></Link>
      </div>
    </div>
  )
}

function CreateFolder({ projectID }: { projectID: string }) {
  const [name, setName] = useState("");
  function onClick(projectID: string, name: string) {
    fetch(`/api/folder`, {
      method: "POST",
      body: JSON.stringify({ projectID, name }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Folder created successfully!");
        } else {
          alert("Failed to create folder.");
        }
      });
  }
  return (
    <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg my-2">
      <input type="text" placeholder="Folder Name" value={name} onChange={(e) => setName(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg" />
      <button onClick={() => onClick(projectID, name)} className="hover:text-sky-500 bg-slate-300 dark:bg-slate-700 p-2 text-center rounded-xl border-2 border-slate-400 dark:border-slate-900"><FontAwesomeIcon icon={faFolderPlus} /> Create Folder</button>
    </div>
  )
}

function DeleteProject({ projectID, closeMenu }: { projectID: string, closeMenu: () => void }) {
  const router = useRouter();
  function onClick(id: string) {
    fetch(`/api/project`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.error) {
          router.push("/");
        } else {
          alert(`Failed to delete project: ${res.status}`);
        }
      });
  }
  return (
    <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg my-2">
      <p className="text-red-500">Are you sure you want to delete this project?</p>
      <button onClick={() => onClick(projectID)} className="bg-red-500 p-2 rounded-xl border-2 hover:text-sky-500 border-slate-400 dark:border-slate-900">Delete Project</button>
      <button onClick={() => closeMenu()} className="hover:text-sky-500 bg-slate-300 dark:bg-slate-700 p-2 text-center rounded-xl border-2 border-slate-400 dark:border-slate-900">Cancel</button>
    </div>
  )
}