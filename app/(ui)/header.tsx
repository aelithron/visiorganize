import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../public/logo.png";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
export type MenuLinks = { name: string, link: string, className?: string, icon: IconDefinition | null }[]

export default function Header() {
  // TODO: Replace this with a dynamic system (add dropdown of user's Projects)
  const menuLinks: MenuLinks = [
    { name: 'Home', link: '/', icon: null },
    { name: '', link: '/about', icon: null },
    { name: 'Pricing', link: '/pricing', icon: null },
  ];
  const pathname = usePathname();
  return (
    <header className="flex flex-col justify-center items-center border-b-4 border-zinc-700 bg-slate-500">
      <Link href={"/"}><Image src={logo} alt="" height={200} width={200} /></Link>
      <div className="flex space-x-8 pb-3">
        <div className='items-center text-lg'>
          {menuLinks.map((linkData, index) => (
            <Link
              key={index}
              href={linkData.link}
              className={`${linkData.className ? linkData.className : ''} ${pathname === linkData.link && 'underline'} hover:text-sky-400 underline`}
            >
              {linkData.icon !== null && <FontAwesomeIcon icon={linkData.icon} />} {linkData.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}