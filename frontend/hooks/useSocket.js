'use client'

import { useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { addNotification } from '@/store/slices/notificationSlice'

export function useSocket() {
  const socket = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_API_URL)

    socket.current.on('notification', (notification) => {
      dispatch(addNotification(notification))
    })

    return () => {
      if (socket.current) {
        socket.current.disconnect()
      }
    }
  }, [dispatch])

  return socket.current
}