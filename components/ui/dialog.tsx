import { useEffect, useRef } from 'react'

interface DialogProps {
  showDialog: boolean
  children: React.ReactNode
}

export default function Dialog({ showDialog, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (showDialog) {
      dialogRef.current?.show()
    } else {
      dialogRef.current?.close()
    }
  }, [showDialog])

  return <dialog ref={dialogRef}>{children}</dialog>
}
