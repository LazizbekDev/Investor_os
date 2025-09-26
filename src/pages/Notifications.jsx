import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/use-notifications";

export default function Notifications() {
  const { notifications, isLoading, dismiss, markAllAsRead } = useNotifications();

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-[#0D0D0D] min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#7F5AF0]">Notifications</h1>
        {notifications.length !== 0 && (
          <Button
            className="bg-[#2CB67D] hover:bg-[#259a67] text-white px-4 py-2 rounded-md"
            onClick={() => markAllAsRead()}
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((note) => (
          <Card
            key={note.id}
            className={`backdrop-blur-lg border ${note.isRead
                ? "border-border hover:border-foreground text-muted-foreground bg-[#1a1a1a]/20"
                : "border-[#7F5AF0]/30 hover:border-[#7F5AF0]"
              } transition-colors`}
          >
            <CardContent className="p-4 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-300">{note.text}</p>
                <span
                  className={`text-xs ${note.isRead ? "text-secondary-foreground" : "text-[#FFCD58]"
                    }`}
                >
                  {note.time}
                </span>
              </div>
              <Button
                size="sm"
                onClick={() => dismiss(note.id)}
                className={`${note.isRead
                    ? "bg-secondary hover:bg-secondary-foreground"
                    : "bg-[#7F5AF0] hover:bg-[#6b47d6]"
                  } text-white px-3 py-1 rounded-md`}
              >
                Dismiss
              </Button>
            </CardContent>
          </Card>
        ))}
        {notifications.length === 0 && (
          <li className="text-gray-500 text-center text-sm list-none">No notifications</li>
        )}
      </div>
    </div>
  );
}
