"use client"
import { faLock, faMinus, faPencil, faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProjectSettings({ projectID, projectName, projectSharedWith }: { projectID: string, projectName: string, projectSharedWith: string[] }) {
  type PossibleMenus = "deleteproject" | null;
  const [openMenu, setOpenMenu] = useState<PossibleMenus>(null);
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-2 my-2">
        <EditSettingsForm projectID={projectID} projectName={projectName} projectSharedWith={projectSharedWith} />
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

function EditSettingsForm({ projectID, projectName, projectSharedWith }: { projectID: string, projectName: string, projectSharedWith: string[] }) {
  const [name, setName] = useState(projectName);
  const [newEmail, setNewEmail] = useState("");
  const [sharedWith, setSharedWith] = useState(projectSharedWith);
  const router = useRouter();
  function onClick() {
    fetch(`/api/project`, {
      method: "PATCH",
      body: JSON.stringify({ projectID, name, sharedWith }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.error) {
          router.push(`/project/${projectID}`);
        } else {
          alert("Failed to update project");
        }
      });
  }
  function shareWithNew(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSharedWith([...sharedWith, newEmail]);
    setNewEmail("");
  }
  return (
    <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg my-2">
      <div className="flex space-x-2 items-center">
        <FontAwesomeIcon icon={faPencil} />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name" className="bg-slate-300 dark:bg-slate-700 p-2 rounded-xl border-2 border-slate-400 dark:border-slate-900" />
      </div>
      <div className="flex flex-col gap-2 text-center py-4">
        {sharedWith.map((email) => (
          <div key={email} className="flex space-x-2 items-center">
            <button onClick={() => setSharedWith(sharedWith.filter((e) => e !== email))}><FontAwesomeIcon icon={faMinus} /></button>
            <p>{email}</p>
          </div>
        ))}
        {sharedWith.length === 0 && <span className="text-slate-600 dark:text-slate-400"><FontAwesomeIcon icon={faLock} className="mr-[2px]" /> Not shared</span>}
        <form className="flex space-x-2 items-center" onSubmit={(e) => shareWithNew(e)}>
          <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Share with email" className="bg-slate-300 dark:bg-slate-700 p-2 rounded-xl border-2 border-slate-400 dark:border-slate-900" />
          <button type="submit"><FontAwesomeIcon icon={faPlus} /></button>
        </form>
      </div>
      <button onClick={() => onClick()} className="bg-slate-300 dark:bg-slate-700 p-2 rounded-xl border-2 border-slate-400 dark:border-slate-900 hover:text-sky-500"><FontAwesomeIcon icon={faPenToSquare} /> Update Project</button>
    </div>
  )
}