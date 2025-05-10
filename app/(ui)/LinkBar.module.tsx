"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuLinks } from "./header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function LinkBar({ menuLinks }: { menuLinks: MenuLinks }) {
  const pathname = usePathname()
  return (
    <div className="flex space-x-5 text-white text-xl">
      {menuLinks.map((linkData, index) => (
        <Link
          key={index}
          href={linkData.link}
          className={`${pathname === linkData.link && 'text-indigo-200'} hover:text-sky-400`}
        >
          {linkData.icon !== null && <FontAwesomeIcon icon={linkData.icon} />}
        </Link>
      ))}
    </div>
  )
}