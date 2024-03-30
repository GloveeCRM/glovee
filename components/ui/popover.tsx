'use client'

import {
  Children,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

interface PopoverContextType {
  isOpen: boolean
  toggle: () => void
}

const PopoverContext = createContext<PopoverContextType>({
  isOpen: false,
  toggle: () => {},
})

export function usePopover() {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('usePopover must be used within a PopoverProvider')
  }
  return context
}

export function Popover({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  function toggle() {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [containerRef])

  return (
    <PopoverContext.Provider value={{ isOpen, toggle }}>
      <div ref={containerRef} className="relative">
        {Children.map(children, (child) => cloneElement(child as any, { isOpen, setIsOpen }))}
      </div>
    </PopoverContext.Provider>
  )
}

export function PopoverTrigger({
  children,
  className,
  openClassName,
}: {
  children: ReactNode
  className?: string
  openClassName?: string
}) {
  const { toggle, isOpen } = usePopover()

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    toggle()
  }

  return (
    <div onClick={handleClick} className={`cursor-pointer ${className} ${isOpen && openClassName}`}>
      {children}
    </div>
  )
}

const getPositionClasses = (position: string) => {
  const baseClass = 'absolute z-10'
  switch (position) {
    case 'bottom-left':
      return `${baseClass} right-0` // Align to left and just below the trigger
    case 'bottom':
      return `${baseClass} left-1/2 -translate-x-1/2` // Center below the trigger
    case 'bottom-right':
      return `${baseClass}` // Align to right and just below the trigger
    case 'right':
      return `${baseClass} left-full top-1/2 -translate-y-1/2` // Center to the right of the trigger
    case 'left':
      return `${baseClass} right-full top-1/2 -translate-y-1/2` // Center to the left of the trigger
    case 'top-left':
      return `${baseClass} right-0 bottom-full` // Align to left and just above the trigger
    case 'top':
      return `${baseClass} left-1/2 bottom-full -translate-x-1/2` // Center above the trigger
    case 'top-right':
      return `${baseClass} bottom-full` // Align to right and just above the trigger
    default:
      return baseClass
  }
}

export function PopoverContent({
  children,
  position = 'bottom',
  className,
}: {
  children: ReactNode
  position?: string
  className?: string
}) {
  const { isOpen } = usePopover()

  return (
    <div
      className={`${className} ${getPositionClasses(position)} ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'} min-w-max`}
    >
      {children}
    </div>
  )
}
