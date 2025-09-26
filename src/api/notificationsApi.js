// Fake API (hozircha localStorage ishlatyapmiz)
// Keyinchalik backend bilan real HTTP requestga almashtirasan

export const getNotifications = async () => {
  const saved = localStorage.getItem("notifications");
  if (!saved) {
    const dummy = [
      { id: 1, type: "message", text: "You have a new message from Sarah.", time: "2h ago", isRead: false },
      { id: 2, type: "system", text: "System update scheduled for tomorrow.", time: "5h ago", isRead: false },
      { id: 3, type: "alert", text: "Password change required.", time: "1d ago", isRead: false },
      { id: 4, type: "activity", text: "New login from Chrome on Windows.", time: "3d ago", isRead: false },
    ];
    localStorage.setItem("notifications", JSON.stringify(dummy));
    return dummy;
  }
  return JSON.parse(saved);
};

export const dismissNotificationApi = async (id) => {
  const saved = JSON.parse(localStorage.getItem("notifications")) || [];
  const updated = saved.filter((n) => n.id !== id);
  localStorage.setItem("notifications", JSON.stringify(updated));
  return { success: true, id };
};

export const markAllAsReadApi = async () => {
  const saved = JSON.parse(localStorage.getItem("notifications")) || [];
  const updated = saved.map((n) => ({ ...n, isRead: true }));
  localStorage.setItem("notifications", JSON.stringify(updated));
  return updated;
};
