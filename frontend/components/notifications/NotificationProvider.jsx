'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import { useSocket } from '@/hooks/useSocket'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, action.payload]
    case 'REMOVE_NOTIFICATION':
      return state.filter(notification => notification.id !== action.payload)
    default:
      return state
  }
}

export function NotificationProvider({ children }) {
  const [notifications, dispatch] = useReducer(notificationReducer, [])
  const socket = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on('notification', (notification) => {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: { ...notification, id: Date.now() }
        })
      })
    }
  }, [socket])

  return (
    <NotificationContext.Provider value={{ notifications, dispatch }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}