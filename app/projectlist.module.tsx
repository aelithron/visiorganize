export const dynamic = "force-dynamic";
import logo from "@/public/logo-square.webp";
import Image from "next/image";

export default function ProjectList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col border-slate-700 border-2 mt-5 p-3 rounded-lg">
        <Image src={logo} alt={"The project's icon."} width={75} height={75} className="border-slate-600 border-2 rounded-2xl" />
        <h1 className="text-xl font-semibold">Project 1</h1>
        <p>This is an example project!</p>
      </div>
      <div className="flex flex-col border-slate-700 border-2 mt-5 p-3 rounded-lg">
        <Image src={logo} alt={"The project's icon."} width={75} height={75} className="border-slate-600 border-2 rounded-2xl" />
        <h1 className="text-xl font-semibold">Project 2</h1>
        <p>This is an example project!</p>
      </div>
      <div className="flex flex-col border-slate-700 border-2 mt-5 p-3 rounded-lg">
        <Image src={logo} alt={"The project's icon."} width={75} height={75} className="border-slate-600 border-2 rounded-2xl" />
        <h1 className="text-xl font-semibold">Project 3</h1>
        <p>This is an example project!</p>
      </div>
    </div>
  )
}

