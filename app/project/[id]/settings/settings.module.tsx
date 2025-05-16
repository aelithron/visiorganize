"use client"
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProjectSettings({ projectID, projectName }: { projectID: string, projectName: string }) {
  type PossibleMenus = "deleteproject" | null;
  const [openMenu, setOpenMenu] = useState<PossibleMenus>(null);
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-2 my-2">
        <EditSettingsForm projectID={projectID} projectName={projectName} />
        <button onClick={() => setOpenMenu(openMenu !== "deleteproject" ? "deleteproject" : null)} className="hover:text-sky-500 bg-slate-300 dark:bg-slate-700 p-2 text-center rounded-xl border-2 border-slate-400 dark:border-slate-900 flex gap-1 items-center">
          <FontAwesomeIcon icon={faTrash} />
          <p>Delete Project</p>
        </button>
      </div>
      {openMenu === "deleteproject" && <DeleteProject projectID={projectID} closeMenu={() => setOpenMenu(null)} />}
    </div>
  )
}

function DeleteProject({ projectID, closeMenu }: { projectID: string, closeMenu: () => void }) {
  const router = useRouter();
  function onClick(projectID: string,) {
    fetch(`/api/project`, {
      method: "DELETE",
      body: JSON.stringify({ projectID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.error) {
          router.push(`/`);
        } else {
          alert("Failed to delete project");
        }
      });
  }
  return (
    <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg my-2">
      <p className="text-red-500">Are you sure you want to delete this project?</p>
      <button onClick={() => onClick(projectID)} className="bg-red-500 p-2 rounded-xl border-2 border-slate-400 dark:border-slate-900 hover:text-sky-500"><FontAwesomeIcon icon={faTrash} /> Delete Project</button>
      <button onClick={() => closeMenu()} className="hover:text-sky-500 bg-slate-300 dark:bg-slate-700 p-2 text-center rounded-xl border-2 border-slate-400 dark:border-slate-900">Cancel</button>
    </div>
  )
}

function EditSettingsForm({ projectID, projectName }: { projectID: string, projectName: string }) {
  const [name, setName] = useState(projectName);
  const router = useRouter();
  function onClick() {
    fetch(`/api/project`, {
      method: "PATCH",
      body: JSON.stringify({ projectID, name }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.error) {
          router.push(`/`);
        } else {
          alert("Failed to update project");
        }
      });
  }
  return (
    <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg my-2">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name" className="bg-slate-300 dark:bg-slate-700 p-2 rounded-xl border-2 border-slate-400 dark:border-slate-900" />
      <button onClick={() => onClick()} className="bg-slate-300 dark:bg-slate-700 p-2 rounded-xl border-2 border-slate-400 dark:border-slate-900 hover:text-sky-500"><FontAwesomeIcon icon={faPenToSquare} /> Update Project</button>
    </div>
  )
}