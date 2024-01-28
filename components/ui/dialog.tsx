import { useEffect, useRef } from 'react'

export default function Dialog({
  showDialog,
  children,
}: {
  showDialog: boolean
  children: React.ReactNode
}) {
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
