"use client"

import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FullCreateResource({ projectID, folderID }: { projectID: string, folderID?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resourceName, setResourceName] = useState(searchParams.get("name") || "");
  const [resourceBody, setResourceBody] = useState(searchParams.get("body") || "");
  const [resourceType, setResourceType] = useState(searchParams.get("type") || "text");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`/api/resource`, {
      method: "POST",
      body: JSON.stringify({ projectID, folderID, name: resourceName, type: resourceType, body: resourceBody}),
    })
      .then((res) => {
        if (res.ok) {
          router.push(`/project/${projectID}/resources`);
        } else {
          alert("Failed to create resource.");
        }
      });
  }

  return (
    <div>
      <select value={resourceType} onChange={(e) => setResourceType(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg">
        <option value="text">Text</option>
        <option value="github">GitHub</option>
      </select>
    </div>
  )
}

/*
  <form className="grid gap-4 items-center justify-center p-6 md:px-16 space-y-4 grid-cols-1 md:grid-cols-2" onSubmit={handleSubmit}>
    <div className="flex flex-col gap-4">
      <input type="text" placeholder="Resource Name" value={resourceName} onChange={(e) => setResourceName(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg" />
      <textarea placeholder="Contents" value={resourceBody} onChange={(e) => setResourceBody(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg" />
    </div>
      <button type="submit" className="bg-slate-300 dark:bg-slate-700 p-2 rounded-xl col-span-2"><FontAwesomeIcon icon={faSave} /> Submit</button>
  </form>
*/