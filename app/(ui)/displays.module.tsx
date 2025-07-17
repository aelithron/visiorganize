import { Resource, Tag } from "@/utils/db"
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export function ResourceDisplay({ resource, tags, projectID }: { resource: Resource, tags: Tag[], projectID: string }) {
  const isShortenedTags = resource.tags.length > 3;
  resource.tags.splice(3);
  return (
    <div className="flex justify-between items-start gap-4 py-2 px-4 bg-slate-200 dark:bg-slate-800 rounded-lg min-w-80 min-h-24">
      <div className="flex flex-col justify-center">
        <div className="flex gap-1">
          <Link href={`/project/${projectID}/view/${resource._id.toString()}`} className="hover:text-sky-500">{cardTruncate(resource.name, 32)}</Link>
          {/*<p className="text-slate-500">({resource.type.name})</p>*/} {/* Uncomment when multiple resource types exist */}
        </div>
        <div className="flex gap-2 items-end">
          {resource.tags.map(tag => <Link key={tag} className={"p-1 border-slate-500 border-2 text-sm rounded-lg max-w-min"} style={{ backgroundColor: tags.find(e => e.text == tag)!.color, color: getTagTextColor(tags.find(e => e.text == tag)!.color) }} href={`/project/${projectID}/tag/${tag}`}>{tag}</Link>)}
          {isShortenedTags ? "..." : ""}
        </div>
        <p className="text-sm text-slate-800 dark:text-slate-300">{cardTruncate(resource.body)}</p> {/* This only works for text-based resources, parse better later :3 */}
      </div>
      <Link href={`/project/${projectID}/view/${resource._id.toString()}`} className="hover:text-sky-500"><FontAwesomeIcon icon={faUpRightFromSquare} /></Link>
    </div>
  )
}

export function getTagTextColor(hexColor: string): "#000000" | "#ffffff" {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#ffffff";
}

function cardTruncate(text: string, maxLength?: number) {
  if (!maxLength) maxLength = 47
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}