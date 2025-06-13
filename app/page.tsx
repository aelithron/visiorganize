import { Metadata } from "next";
import ProjectList from "./projectlist.module";

export const metadata: Metadata = {
  title: 'Projects • Visiorganize',
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:px-16 md:py-10">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <ProjectList />
    </div>
  );
}
