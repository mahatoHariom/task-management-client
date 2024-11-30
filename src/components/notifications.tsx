import { useWebSocket } from "@/hooks/use-websocket";
import { toast } from "react-toastify";

const NotificationComponent = () => {
  const { notifications } = useWebSocket();

  return (
    <div>
      {notifications.map((notification, index) => (
        <toast key={index} title={`Overdue Task: ${notification.title}`}>
          <p>Task ID: {notification.taskId}</p>
          <p>Due Date: {new Date(notification.dueDate).toLocaleString()}</p>
        </toast>
      ))}
    </div>
  );
};

export default NotificationComponent;
