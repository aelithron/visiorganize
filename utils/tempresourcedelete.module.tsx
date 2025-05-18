"use client";
import { faFileCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export function DeleteResource({ projectID, resourceID, folderID }: { projectID: string, resourceID: string, folderID?: string }) {
  const router = useRouter();
  function onClick(projectID: string, resourceID: string, folderID?: string) {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    fetch(`/api/resource`, {
      method: "DELETE",
      body: JSON.stringify({ projectID, resourceID, folderID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.error) {
          router.refresh();
        } else {
          alert("Failed to delete resource");
        }
      });
  }
  return <button className="hover:text-sky-500" onClick={() => onClick(projectID, resourceID, folderID)}><FontAwesomeIcon icon={faFileCircleMinus} /></button>
}