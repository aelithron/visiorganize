"use client"

import { faArrowLeft, faFileCirclePlus, faFolderMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateResource } from "../projecttools.module";

export function FolderTools({ folderID, projectID }: { folderID: string, projectID: string }) {
  type PossibleMenus = "createresource" | "deletefolder" | null;
  const [openMenu, setOpenMenu] = useState<PossibleMenus>(null);
  return (
    <div className="m-8 md:w-1/3">
      <div className="flex gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg justify-between sticky">
        <Link href={`/project/${projectID}`} className="hover:text-sky-500"><FontAwesomeIcon icon={faArrowLeft} /></Link>
        <button onClick={() => setOpenMenu(openMenu !== "createresource" ? "createresource" : null)} className="hover:text-sky-500"><FontAwesomeIcon icon={faFileCirclePlus} /></button>
        <button onClick={() => setOpenMenu(openMenu !== "deletefolder" ? "deletefolder" : null)} className="hover:text-sky-500"><FontAwesomeIcon icon={faTrash} /></button>
      </div>
      {openMenu === "createresource" && <CreateResource projectID={projectID} folderID={folderID} />}
      {openMenu === "deletefolder" && <DeleteFolder projectID={projectID} folderID={folderID} closeMenu={() => setOpenMenu(null)} />}
    </div>
  )
}

function DeleteFolder({ projectID, folderID, closeMenu }: { projectID: string, folderID: string, closeMenu: () => void }) {
  const router = useRouter();
  function onClick(id: string, folderID: string) {
    fetch(`/api/folder`, {
      method: "DELETE",
      body: JSON.stringify({ projectID: id, folderID: folderID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.error) {
          router.push(`/project/${id}`);
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