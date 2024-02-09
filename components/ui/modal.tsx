import { MouseEvent, useEffect } from 'react'

import { IoClose } from 'react-icons/io5'

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
}: {
  isOpen: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
}) {
  const handleClose = (e: MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    } else {
      document.removeEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-[100] flex cursor-default items-center justify-center bg-n-800/50 p-[20px]"
    >
      <div id="modal-area" className="w-full max-w-[600px] rounded-md bg-white p-[12px]">
        <div id="modal-header" className="flex items-start justify-between gap-[8px]">
          {title && <p className="mb-[8px] text-[20px] font-bold">{title}</p>}
          <button className="cursor-pointer pt-[4px]" onClick={handleClose}>
            <IoClose className="h-[22px] w-[22px]" />
          </button>
        </div>
        <div id="modal-content">{children}</div>
      </div>
    </div>
  )
}
