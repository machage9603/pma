const Notification = require('../models/notification.model');

const notificationService = {
  createNotification: async ({ type, title, message, user, project, task = null }) => {
    try {
      const notification = await Notification.create({
        type,
        title,
        message,
        user,
        project,
        task
      });

      await notification.populate(['user', 'project', 'task']);

      // Emit real-time notification
      global.io.to(`user-${user}`).emit('notification', notification);

      return notification;
    } catch (error) {
      console.error('Notification creation failed:', error);
    }
  },

  getUnreadNotifications: async (userId) => {
    return await Notification.find({
      user: userId,
      read: false
    }).sort('-createdAt')
      .populate(['project', 'task']);
  },

  markAsRead: async (notificationId) => {
    return await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );
  }
};

module.exports = notificationService;