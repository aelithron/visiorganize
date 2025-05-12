import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FormattedDate({ date }: { date: Date }) {
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return <span className="text-sm text-slate-600 dark:text-slate-400"><FontAwesomeIcon icon={faPencil} className="mr-[2px]" /> Edited {formattedDate}</span>;
}