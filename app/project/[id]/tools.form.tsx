import { Project } from "@/utils/db";

export function ProjectTools({ project }: { project: Project }) {
  return (
    <div>

    </div>
  )
}

function deleteProject(projectId: string) {
  fetch(`/api/project`, {
    method: "DELETE",
    body: JSON.stringify({ projectId }),
  })
  .then((res) => {
    if (res.ok) {
      alert("Project deleted successfully");
    } else {
      alert("Failed to delete project");
    }
  });
}