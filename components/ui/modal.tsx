'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
  MouseEvent,
} from 'react'

import { IoClose } from 'react-icons/io5'

interface ModalContextType {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a Modal')
  }
  return context
}

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
    } else {
      document.removeEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isModalOpen, closeModal])

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

interface ModalTriggerProps {
  children: ReactNode
}

export function ModalTrigger({ children }: ModalTriggerProps) {
  const { openModal } = useModal()
  return <div onClick={openModal}>{children}</div>
}

interface ModalProps {
  title?: string
  children: ReactNode
  onClose?: () => void
}

export function Modal({ title, children, onClose }: ModalProps) {
  const { isModalOpen, closeModal } = useModal()

  if (!isModalOpen) {
    return null
  }

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-[100] flex cursor-default items-center justify-center bg-n-800/50 p-[20px]"
    >
      <div id="modal-area" className="w-fit rounded-md bg-white p-[12px]">
        <div id="modal-header" className="flex items-start justify-between gap-[8px]">
          <p className="mb-[8px] text-[20px] font-bold">{title}</p>
          <button
            className="cursor-pointer pt-[4px]"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation()
              onClose?.()
              closeModal()
            }}
          >
            <IoClose className="h-[22px] w-[22px]" />
          </button>
        </div>
        <div id="modal-content">{children}</div>
      </div>
    </div>
  )
}
