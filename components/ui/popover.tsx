'use client'

import React, { ReactElement } from 'react'

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
  cloneElement,
} from 'react'

const PopoverContext = createContext({})

export default function Popover({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  const popoverRef = useRef(null)

  const show = useCallback(() => setIsVisible(true), [])
  const hide = useCallback(() => setIsVisible(false), [])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        popoverRef.current &&
        (popoverRef.current as HTMLElement) &&
        !(popoverRef.current as HTMLElement).contains(event.target)
      ) {
        setIsVisible(false)
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible])

  return (
    <PopoverContext.Provider value={{ isVisible, show, hide, popoverRef }}>
      {children}
    </PopoverContext.Provider>
  )
}

export function PopoverTrigger({ children }: { children: React.ReactNode }) {
  const { show } = useContext(PopoverContext) as { show: () => void }

  return cloneElement(children as ReactElement<any>, {
    onClick: show,
  })
}

export function PopoverContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { isVisible, popoverRef } = useContext(PopoverContext) as {
    isVisible: boolean
    popoverRef: React.RefObject<any>
  }

  if (!isVisible) {
    return null
  }

  return (
    <div ref={popoverRef} className={`absolute ${className}`}>
      {children}
    </div>
  )
}
