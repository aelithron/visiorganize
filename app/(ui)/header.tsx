import Link from "next/link";
import Image from "next/image";
//import logo from "../public/logo.png";
import ClientLinks from "./clientlinks.module";
import { faGear, faHome } from "@fortawesome/free-solid-svg-icons";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
export type MenuLinks = { link: string, className?: string, icon: IconDefinition | null }[]

export default function Header() {
  // TODO: Replace this with a dynamic system (add dropdown of user's Projects)
  const menuLinks: MenuLinks = [
    { link: '/', icon: faHome },
    { link: '/settings', icon: faGear },
  ];
  return (
    <header className="flex flex-col justify-center items-center bg-slate-500 pt-2">
      {/*<Link href={"/"}><Image src={logo} alt="" height={200} width={200} /></Link>*/}
      <div className="flex space-x-8 pb-3">
        <div className='items-center text-lg'>
          <ClientLinks menuLinks={menuLinks} />
        </div>
      </div>
      <div className="bg-gradient-to-r from-violet-950 to-blue-900 p-[2px] min-w-screen" />
    </header>
  )
}