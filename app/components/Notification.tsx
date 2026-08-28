"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  const style =
    type === "success"
      ? "bg-green-600"
      : "bg-red-600"

  return (
    <div
      className={`fixed top-4 right-4 rounded px-4 py-2 text-white ${style}`}
      data-testid={type === "success" ? "notification" : "error-message"}
    >
      {message}
    </div>
  );
}
