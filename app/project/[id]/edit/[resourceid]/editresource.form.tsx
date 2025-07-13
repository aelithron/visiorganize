"use client"
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"

export default function EditResourceForm({ projectID, resourceID, resourceName, resourceBody }: { projectID: string, resourceID: string, resourceName: string, resourceBody: string }) {
  const [name, setName] = useState<string>(resourceName);
  const [body, setBody] = useState<string>(resourceBody);
  
  return (
    <form className="flex flex-col gap-2 items-center justify-center p-6 md:px-10 space-y-4" onSubmit={handleSubmit}>
      {/* This only works for text-based resources, parse better later :3 */ }
      <input type="text" placeholder="Resource Name" value={name} onChange={(e) => setName(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg" />
      <textarea placeholder="Contents" value={body} onChange={(e) => setBody(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg" />
      <button type="submit" className="bg-slate-300 dark:bg-slate-700 p-2 rounded-xl col-span-2"><FontAwesomeIcon icon={faPencil} /> Edit Resource</button>
    </form>
  )
}