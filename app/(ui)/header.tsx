import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.webp";
import LinkBar from "./LinkBar.module";
import { faGear, faHome } from "@fortawesome/free-solid-svg-icons";
import { auth } from "@/auth";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Session } from "next-auth";
export type MenuLinks = { link: string, icon: IconDefinition }[]

export default async function Header() {
  const session = await auth();
  // TODO: Replace this with a dynamic system (add dropdown of user's Projects)
  const menuLinks: MenuLinks = [
    { link: '/', icon: faHome },
    { link: '/settings', icon: faGear },
  ];
  return (
    <header className="flex flex-col justify-center items-center bg-slate-500 pt-2">
      <div className="flex justify-between items-center gap-4 w-full max-w-7xl px-4">
        <Link href={"/"}>
          <Image src={logo} alt="Logo for Visiorganize." height={80} width={80} />
        </Link>
        <div className="flex space-x-5 items-center">
          <LinkBar menuLinks={menuLinks} />
          <Profile session={session} />
        </div>
      </div>
      <div className="bg-gradient-to-r from-violet-950 to-blue-900 p-[2px] w-full mt-2" />
    </header>
  )
}

export function Profile({ session }: { session: Session | null }) {
  return (
    <div>
      {session?.user?.image ? 
        <Image src={session?.user?.image} alt="The user's profile picture." width={40} height={40} className="rounded-full" /> : 
        <div className="w-10 h-10 bg-violet-300 rounded-full" />
      }
    </div>
  )
}