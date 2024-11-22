'use client'
import { avatarPlaceholderUrl, navItems } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname()
  return (
    <aside className="sidebar">
    <Link href="/">
      <div className='flex space-x-3 items-center font-bold '>
      <Image
        src="/assets/icons/logo-brand.svg"
        alt="logo"
        width={52}
        height={52}
        className="hidden h-auto lg:block"
      />
      <div className='text-[#EA6365] text-2xl hidden h-auto lg:block'>SpaceShare</div>
      </div>

      <Image
        src="/assets/icons/logo-brand.svg"
        alt="logo"
        width={52}
        height={52}
        className="lg:hidden"
      />
    </Link>

    <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item",
                  pathname === url && "shad-active",
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "nav-icon",
                    pathname === url && "nav-icon-active",
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image
        src="/assets/images/files-2.png"
        alt="logo"
        width={506}
        height={418}
        className="w-full"
      />

<div className="sidebar-user-info">
        <Image
          src={avatarPlaceholderUrl}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">Asif Ahmed Sahil</p>
          <p className="caption">asifahmedsahil.007@gmail.com</p>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar