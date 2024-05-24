"use client"

import Link from 'next/link'
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'

const MenuLink = ({eve}) => {

  const pathname = usePathname()

  return (
    <Link href={eve.path} className={`${styles.container} ${pathname === eve.path && styles.active}`}>
      {eve.icon}
      {eve.title}
    </Link>
  )
}

export default MenuLink