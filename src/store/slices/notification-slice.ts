import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  taskId: string;
  title: string;
  dueDate: string;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((notification) => (notification.read = true));
      state.unreadCount = 0;
    },
  },
});

export const { addNotification, markAllAsRead } = notificationSlice.actions;

export default notificationSlice.reducer;
