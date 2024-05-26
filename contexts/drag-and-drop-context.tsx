'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { DragObjectType } from '@/lib/types/drag-and-drop'

type DragAndDropContextType = {
  draggedObject: DragObjectType | null
  setDraggedObject: (draggedObject: DragObjectType | null) => void
}

const dragAndDropContextDefaultValues: DragAndDropContextType = {
  draggedObject: null,
  setDraggedObject: () => {},
}

const DragAndDropContext = createContext<DragAndDropContextType>(dragAndDropContextDefaultValues)

interface DragAndDropProviderProps {
  children: React.ReactNode
}

export default function DragAndDropProvider({ children }: DragAndDropProviderProps) {
  const [draggedObject, setDraggedObject] = useState<DragObjectType | null>(null)

  useEffect(() => {
    function handleDragEnd() {
      setDraggedObject(null)
    }

    window.addEventListener('dragend', handleDragEnd)

    return () => {
      window.removeEventListener('dragend', handleDragEnd)
    }
  }, [])

  const value = {
    draggedObject,
    setDraggedObject,
  }

  return <DragAndDropContext.Provider value={value}>{children}</DragAndDropContext.Provider>
}

export function useDragAndDropContext() {
  return useContext(DragAndDropContext)
}
