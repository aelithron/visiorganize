"use client"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ProjectTools({ projectID }: { projectID: string }) {
  return (
    <div className="flex gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg">
      <button onClick={() => deleteProject(projectID)}><FontAwesomeIcon icon={faTrash} /></button>
    </div>
  )
}

function deleteProject(projectID: string) {
  fetch(`/api/project`, {
    method: "DELETE",
    body: JSON.stringify({ projectID: projectID.toString() }),
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    if (res.ok) {
      alert("Project deleted successfully!");
    } else {
      alert(`Failed to delete project: ${res.status}`);
    }
  });
}