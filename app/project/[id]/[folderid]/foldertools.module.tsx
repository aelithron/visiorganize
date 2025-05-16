"use client"

import { faArrowLeft, faFileCirclePlus, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { CreateResource } from "../projecttools.module";

export function FolderTools({ folderID, projectID }: { folderID: string, projectID: string }) {
  type PossibleMenus = "createresource" | null;
  const [openMenu, setOpenMenu] = useState<PossibleMenus>(null);
  return (
    <div className="m-8 md:w-1/3">
      <div className="flex gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg justify-between sticky">
        <Link href={`/project/${projectID}`} className="hover:text-sky-500"><FontAwesomeIcon icon={faArrowLeft} /></Link>
        <button onClick={() => setOpenMenu(openMenu !== "createresource" ? "createresource" : null)} className="hover:text-sky-500"><FontAwesomeIcon icon={faFileCirclePlus} /></button>
        <Link href={`/project/${projectID}/${folderID}/settings`} className="hover:text-sky-500"><FontAwesomeIcon icon={faGear} /></Link>
      </div>
      {openMenu === "createresource" && <CreateResource projectID={projectID} folderID={folderID} />}
    </div>
  )
}