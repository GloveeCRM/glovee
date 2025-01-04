import Link from 'next/link'
import { IconType } from 'react-icons'

interface NavLinkItemProps {
  name: string
  href: string
  icon: IconType
  active: boolean
  collapsed?: boolean
}

export function NavLinkItem({ name, href, active, icon, collapsed }: Readonly<NavLinkItemProps>) {
  const Icon = icon

  return (
    <Link
      href={href}
      className={`group/nav-link-item text-bunker flex items-center gap-[10px] rounded-md p-[8px] hover:bg-teal-500 hover:text-white ${active && 'bg-teal-500 text-white'} ${collapsed && 'flex-col justify-center gap-[4px]'}`}
      draggable={false}
    >
      <Icon
        className={`h-[20px] w-[20px] text-teal-700 group-hover/nav-link-item:text-white ${active && 'text-white'}`}
      />
      <p className={`${collapsed && 'text-center text-[10px]'}`}>{name}</p>
    </Link>
  )
}
