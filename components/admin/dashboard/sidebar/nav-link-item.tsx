import Link from 'next/link'
import { IconType } from 'react-icons'

interface NavLinkItemProps {
  name: string
  href: string
  icon: IconType
  active: boolean
}

export function NavLinkItem({ name, href, active, icon }: NavLinkItemProps) {
  const Icon = icon

  return (
    <Link
      href={href}
      className={`${active && 'bg-teal-500 text-white'} text-bunker flex items-center gap-[10px] rounded-md p-[8px]`}
    >
      <Icon className="h-[20px] w-[20px]" />
      <p>{name}</p>
    </Link>
  )
}
