import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.webp";
import ClientLinks from "./clientlinks.module";
import { faGear, faHome } from "@fortawesome/free-solid-svg-icons";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
export type MenuLinks = { link: string, icon: IconDefinition }[]

export default function Header() {
  // TODO: Replace this with a dynamic system (add dropdown of user's Projects)
  const menuLinks: MenuLinks = [
    { link: '/', icon: faHome },
    { link: '/settings', icon: faGear },
  ];
  return (
    <header className="flex flex-col justify-center items-center bg-slate-500 pt-2">
      <div className="flex justify-between items-center gap-4 w-full max-w-7xl px-4">
        <Link href={"/"}>
          <Image src={logo} alt="Logo for Visiorganize." height={90} width={90} />
        </Link>
        <div className="flex space-x-8 items-center text-lg">
          <ClientLinks menuLinks={menuLinks} />
        </div>
      </div>
      <div className="bg-gradient-to-r from-violet-950 to-blue-900 p-[2px] min-w-screen mt-2" />
    </header>
  )
}