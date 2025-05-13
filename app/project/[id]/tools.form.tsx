"use client"
import { Folder, Project } from "@/utils/db";

export function ProjectTools({ project }: { project: Project }) {
  return (
    <div>

    </div>
  )
}

export function FolderTools({ folder, projectID }: { folder: Folder, projectID: string }) {
  return (
    <div>

    </div>
  )
}

function deleteProject(projectID: string) {
  fetch(`/api/project`, {
    method: "DELETE",
    body: JSON.stringify({ projectID: projectID.toString() }),
  })
  .then((res) => {
    if (res.ok) {
      alert("Project deleted successfully");
    } else {
      alert("Failed to delete project");
    }
  });
}

function createFolder(projectID: string, folderName: string) {
  fetch(`/api/folder`, {
    method: "POST",
    body: JSON.stringify({ projectID: projectID.toString, folderName }),
  })
  .then((res) => {
    if (res.ok) {
      alert("Folder created successfully");
    } else {
      alert("Failed to create folder");
    }
  });
}
function deleteFolder(projectID: string, folderID: string) {
  fetch(`/api/folder`, {
    method: "DELETE",
    body: JSON.stringify({ projectID: projectID.toString, folderID: folderID.toString() }),
  })
  .then((res) => {
    if (res.ok) {
      alert("Folder created successfully");
    } else {
      alert("Failed to create folder");
    }
  });
}