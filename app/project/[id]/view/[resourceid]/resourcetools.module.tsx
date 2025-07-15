"use client"
import { faArrowLeft, faPencil, faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function ResourceTools({ projectID, resourceID }: { projectID: string, resourceID: string }) {
  type PossibleMenus = "deleteresource" | null;
  const [openMenu, setOpenMenu] = useState<PossibleMenus>(null);
  return (
    <div className="m-8 md:w-1/3">
      <div className="flex gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg justify-between sticky">
        <Link href={`/project/${projectID}`} className="hover:text-sky-500"><FontAwesomeIcon icon={faArrowLeft} /></Link>
        <Link href={`/project/${projectID}/edit/${resourceID}`} className="hover:text-sky-500"><FontAwesomeIcon icon={faPencil} /></Link>
        <button onClick={() => setOpenMenu(openMenu !== "deleteresource" ? "deleteresource" : null)} className="hover:text-sky-500"><FontAwesomeIcon icon={faTrashCan} /></button>
      </div>
      {openMenu === "deleteresource" && <DeleteResource projectID={projectID} resourceID={resourceID} closeMenu={() => setOpenMenu(null)} />}
    </div>
  );
}

function DeleteResource({ projectID, resourceID, closeMenu }: { projectID: string, resourceID: string, closeMenu: () => void }) {
  const router = useRouter();
  function onClick(projectID: string, resourceID: string, folderID?: string) {
    fetch(`/api/resource`, {
      method: "DELETE",
      body: JSON.stringify({ projectID, resourceID, folderID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.error) {
          router.push(`/project/${projectID}`);
        } else {
          alert("Failed to delete resource");
        }
      });
  }
  return (
    <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg my-2">
      <p className="text-red-500">Are you sure you want to delete this resource?</p>
      <button onClick={() => onClick(projectID, resourceID)} className="bg-red-500 p-2 rounded-xl border-2 border-slate-400 dark:border-slate-900 hover:text-sky-500"><FontAwesomeIcon icon={faTrash} /> Delete Resource</button>
      <button onClick={() => closeMenu()} className="hover:text-sky-500 bg-slate-300 dark:bg-slate-700 p-2 text-center rounded-xl border-2 border-slate-400 dark:border-slate-900">Cancel</button>
    </div>
  );
}