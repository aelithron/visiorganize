export const dynamic = "force-dynamic";
import logo from "@/public/logo-square.webp";
import Image from "next/image";
import Link from "next/link";

export default function ProjectList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-max">
      <div className="flex flex-col border-slate-700 border-2 mt-5 p-3 rounded-lg">
        <Link href={"/project/1"}>
          <Image src={logo} alt={"The project's icon."} width={75} height={75} className="border-slate-600 border-2 rounded-2xl" />
          <h1 className="text-xl font-semibold">Project 1</h1>
        </Link>
        <FormattedDate date={new Date()} />
      </div>
      <div className="flex flex-col border-slate-700 border-2 mt-5 p-3 rounded-lg">
        <Link href={"/project/2"}>
          <Image src={logo} alt={"The project's icon."} width={75} height={75} className="border-slate-600 border-2 rounded-2xl" />
          <h1 className="text-xl font-semibold">Project 2</h1>
        </Link>
        <FormattedDate date={new Date()} />
      </div>
      <div className="flex flex-col border-slate-700 border-2 mt-5 p-3 rounded-lg">
        <Link href={"/project/3"}>
          <Image src={logo} alt={"The project's icon."} width={75} height={75} className="border-slate-600 border-2 rounded-2xl" />
          <h1 className="text-xl font-semibold">Project 3</h1>
        </Link>
        <FormattedDate date={new Date()} />
      </div>
    </div>
  )
}

function FormattedDate({ date }: { date: Date }) {
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return <span className="text-sm text-slate-600 dark:text-slate-400">Edited {formattedDate}</span>;
}