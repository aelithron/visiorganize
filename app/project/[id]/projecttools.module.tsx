"use client"
import { faFolderPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProjectTools({ projectID }: { projectID: string }) {
  type PossibleMenus = "createfolder" | "deleteproject" | null;
  const [openMenu, setOpenMenu] = useState<PossibleMenus>(null);
  return (
    <div className="m-8 md:w-1/3">
      <div className="flex gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg justify-between sticky">
        <button onClick={() => setOpenMenu(openMenu !== "createfolder" ? "createfolder" : null)}><FontAwesomeIcon icon={faFolderPlus} /></button>
        <button onClick={() => setOpenMenu(openMenu !== "deleteproject" ? "deleteproject" : null)}><FontAwesomeIcon icon={faTrash} /></button>
      </div>
      {openMenu === "createfolder" && <CreateFolder projectID={projectID} />}
      {openMenu === "deleteproject" && <DeleteProject projectID={projectID} closeMenu={() => setOpenMenu(null)} />}
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
      <button onClick={() => onClick(projectID)} className="bg-red-500 p-2 rounded-lg">Delete Project</button>
      <button onClick={() => closeMenu()} className="bg-slate-400 dark:bg-slate-500 p-2 rounded-lg">Cancel</button>
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
      <input type="text" placeholder="Folder Name" value={name} onChange={(e) => setName(e.target.value)} className="p-1 border-2 border-slate-100 dark:border-slate-900 rounded-md" />
      <button onClick={() => onClick(projectID, name)}><FontAwesomeIcon icon={faFolderPlus} /> Create Folder</button>
    </div>
  )
}