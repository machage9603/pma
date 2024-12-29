function NotificationContainer() {
    const { notifications, dispatch } = useContext(NotificationContext)

    return (
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white rounded-lg shadow-lg p-4 max-w-sm animate-slide-in"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{notification.title}</h4>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
              <button
                onClick={() => dispatch({
                  type: 'REMOVE_NOTIFICATION',
                  payload: notification.id
                })}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }