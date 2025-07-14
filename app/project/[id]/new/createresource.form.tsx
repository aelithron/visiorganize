"use client"

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FullCreateResource({ projectID }: { projectID: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resourceName, setResourceName] = useState(searchParams.get("name") || "");
  const [resourceBody, setResourceBody] = useState(searchParams.get("body") || "");
  //const [resourceType, setResourceType] = useState(searchParams.get("type") || "text");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`/api/resource`, {
      method: "POST",
      body: JSON.stringify({ projectID, name: resourceName, type: "text", body: resourceBody }), // text is the only type at the moment, restore resourceType later :3
    })
    .then((res) => {
      if (res.ok) {
        router.push(`/project/${projectID}`);
      } else {
        alert("Failed to create resource.");
      }
    });
  }

  return (
    <form className="flex flex-col gap-2 items-center justify-center p-6 md:px-10 space-y-4" onSubmit={handleSubmit}>
      <input type="text" placeholder="Resource Name" value={resourceName} onChange={(e) => setResourceName(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg" />
      {/*<select value={resourceType} onChange={(e) => setResourceType(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg">
        {}
      </select>*/}
      <textarea placeholder="Contents" value={resourceBody} onChange={(e) => setResourceBody(e.target.value)} className="p-1 bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-900 rounded-lg" />
      <button type="submit" className="bg-slate-300 dark:bg-slate-700 p-2 rounded-xl col-span-2"><FontAwesomeIcon icon={faPlus} /> Create Resource</button>
    </form>
  )
}

/*
  <form className="grid gap-4 items-center justify-center p-6 md:px-16 space-y-4 grid-cols-1 md:grid-cols-2" onSubmit={handleSubmit}>
    <button type="submit" className="bg-slate-300 dark:bg-slate-700 p-2 rounded-xl col-span-2"><FontAwesomeIcon icon={faSave} /> Submit</button>
  </form>
*/
