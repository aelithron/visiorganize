"use client"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewProject() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (projectName.trim() === "") {
      alert("Please enter a project name.");
      return;
    }
    fetch("/api/project", { method: "POST", body: JSON.stringify({ name: projectName }) })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.error) {
          router.push(`/project/${data.id}`);
        } else {
          alert("Error creating project: " + data.message + " (" + data.error + ")");
        }
      })
  }
  return (
    <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Project Name"
        className="mb-4 flex flex-col justify-center p-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
      />
      <button
        type="submit"
        className="px-3 py-2 text-white bg-violet-500 rounded-xl hover:text-sky-500">
        <FontAwesomeIcon icon={faPlus} /> Create
      </button>
    </form>
  )
}