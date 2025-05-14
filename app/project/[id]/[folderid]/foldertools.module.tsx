"use client"
export function FolderTools({ folderID, projectID }: { folderID: string, projectID: string }) {
  return (
    <div>

    </div>
  )
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