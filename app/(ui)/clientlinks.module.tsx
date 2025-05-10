"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuLinks } from "./header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function ClientLinks({ menuLinks }: { menuLinks: MenuLinks }) {
  const pathname = usePathname()
  return (
    <div>
      {menuLinks.map((linkData, index) => (
        <Link
          key={index}
          href={linkData.link}
          className={`${linkData.className ? linkData.className : ''} ${pathname === linkData.link && 'underline'} hover:text-sky-400`}
        >
          {linkData.icon !== null && <FontAwesomeIcon icon={linkData.icon} />} {linkData.name}
        </Link>
      ))}
    </div>
  )
}