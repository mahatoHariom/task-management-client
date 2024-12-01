import { NotificationType } from "@/types/notification";

export class WebSocketNotificationClient {
  private socket: WebSocket | null = null;
  private userId: string;
  private listeners: Array<(notification: NotificationType) => void> = []; // Change here

  constructor(userId: string) {
    this.userId = userId;
    this.connect();
  }

  private connect() {
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}?userId=${this.userId}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onmessage = (event) => {
      try {
        const notification: NotificationType = JSON.parse(event.data); // Change here
        this.notifyListeners(notification);
      } catch (error) {
        console.error("Error parsing notification:", error);
      }
    };

    this.socket.onerror = (error) => {
      console.log("WebSocket error:", error);
      this.connect();
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed");
      this.connect();
    };
  }

  private notifyListeners(notification: NotificationType) {
    // Change here
    this.listeners.forEach((listener) => listener(notification));
  }

  public addNotificationListener(
    listener: (notification: NotificationType) => void
  ) {
    // Change here
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
