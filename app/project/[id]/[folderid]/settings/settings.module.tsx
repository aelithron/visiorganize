"use client"
import { faFolderMinus, faFolderOpen, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function FolderSettings({ projectID, folderID, folderName }: { projectID: string, folderID: string, folderName: string }) {
  type PossibleMenus = "createresource" | "deletefolder" | null;
  const [openMenu, setOpenMenu] = useState<PossibleMenus>(null);
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-2 my-2">
        <EditSettingsForm projectID={projectID} folderID={folderID} folderName={folderName} />
        <button onClick={() => setOpenMenu(openMenu !== "deletefolder" ? "deletefolder" : null)} className="hover:text-sky-500 bg-slate-300 dark:bg-slate-700 p-2 text-center rounded-xl border-2 border-slate-400 dark:border-slate-900 flex gap-1 items-center">
          <FontAwesomeIcon icon={faTrash} />
          <p>Delete Folder</p>
        </button>
      </div>
      {openMenu === "deletefolder" && <DeleteFolder projectID={projectID} folderID={folderID} closeMenu={() => setOpenMenu(null)} />}
    </div>
  )
}

function DeleteFolder({ projectID, folderID, closeMenu }: { projectID: string, folderID: string, closeMenu: () => void }) {
  const router = useRouter();
  function onClick(projectID: string, folderID: string) {
    fetch(`/api/folder`, {
      method: "DELETE",
      body: JSON.stringify({ projectID, folderID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.error) {
          router.push(`/project/${projectID}`);
        } else {
          alert("Failed to delete folder");
        }
      });
  }
  return (
    <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg my-2">
      <p className="text-red-500">Are you sure you want to delete this folder?</p>
      <button onClick={() => onClick(projectID, folderID)} className="bg-red-500 p-2 rounded-xl border-2 border-slate-400 dark:border-slate-900 hover:text-sky-500"><FontAwesomeIcon icon={faFolderMinus} /> Delete Folder</button>
      <button onClick={() => closeMenu()} className="hover:text-sky-500 bg-slate-300 dark:bg-slate-700 p-2 text-center rounded-xl border-2 border-slate-400 dark:border-slate-900">Cancel</button>
    </div>
  )
}

function EditSettingsForm({ projectID, folderID, folderName }: { projectID: string, folderID: string, folderName: string }) {
  const [name, setName] = useState(folderName);
  const router = useRouter();
  function onClick() {
    fetch(`/api/folder`, {
      method: "PATCH",
      body: JSON.stringify({ projectID, folderID, name }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.error) {
          router.push(`/project/${projectID}/${folderID}`);
        } else {
          alert("Failed to update folder");
        }
      });
  }
  return (
    <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg my-2">
      <div className="flex space-x-2 items-center">
        <FontAwesomeIcon icon={faPencil} />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Folder Name" className="bg-slate-300 dark:bg-slate-700 p-2 rounded-xl border-2 border-slate-400 dark:border-slate-900" />
      </div>
      <button onClick={() => onClick()} className="bg-slate-300 dark:bg-slate-700 p-2 rounded-xl border-2 border-slate-400 dark:border-slate-900 hover:text-sky-500"><FontAwesomeIcon icon={faFolderOpen} /> Update Folder</button>
    </div>
  )
}