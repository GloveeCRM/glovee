import { MouseEvent, useRef } from 'react'
import { IoClose } from 'react-icons/io5'

export default function Modal({
  showModal,
  title,
  onClose,
  children,
}: {
  showModal: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const closeButttonRef = useRef<HTMLButtonElement | null>(null)

  if (showModal) {
    dialogRef.current?.showModal()
    closeButttonRef.current?.blur()
  } else {
    dialogRef.current?.close()
  }

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  return (
    <dialog ref={dialogRef} className="left-[20px] right-[20px] max-w-[600px] rounded-md p-[12px]">
      <div className="flex items-start justify-between gap-[8px]">
        {title && <p className="mb-[8px] text-[20px] font-bold">{title}</p>}
        <button
          className="cursor-pointer pt-[4px]"
          ref={closeButttonRef}
          onClick={(e) => handleClose(e)}
        >
          <IoClose className="h-[22px] w-[22px] " />
        </button>
      </div>
      <div>{children}</div>
    </dialog>
  )
}
