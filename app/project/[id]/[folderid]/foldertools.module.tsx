"use client"
export function FolderTools({ folderID, projectID }: { folderID: string, projectID: string }) {
  return (
    <div>

    </div>
  )
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