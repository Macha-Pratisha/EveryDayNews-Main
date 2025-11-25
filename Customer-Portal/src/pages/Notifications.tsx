import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  CheckCircle,
  DollarSign,
  Newspaper,
  Trash2,
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  _id: string;
  type: "approval" | "payment" | "delivery" | "general";
  message: string;
  createdAt: string;
  read: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ✅ Fetch all notifications
  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get("https://everydaynewsbackend.onrender.com/api/notes");
      setNotifications(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch notifications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      await axiosInstance.patch(`https://everydaynewsbackend.onrender.com/api/notes/${id}/read`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      toast({ title: "Marked as read" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to mark as read",
        variant: "destructive",
      });
    }
  };

  // ✅ Delete notification
  const deleteNotification = async (id: string) => {
    try {
      await axiosInstance.delete(`https://everydaynewsbackend.onrender.com/api/notes/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      toast({ title: "Notification deleted" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete notification",
        variant: "destructive",
      });
    }
  };

  // ✅ Icon colors (sea-gold palette)
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <CheckCircle className="h-5 w-5 text-teal-600" />;
      case "payment":
        return <DollarSign className="h-5 w-5 text-amber-600" />;
      case "delivery":
        return <Newspaper className="h-5 w-5 text-cyan-700" />;
      default:
        return <Bell className="h-5 w-5 text-teal-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse bg-amber-50/40">
            <CardContent className="p-6">
              <div className="h-20 bg-amber-100/70 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-8 bg-gradient-to-br from-teal-50 via-white to-amber-50 min-h-screen">
      {/* ✅ Heading aligned to the left */}
      <div className="text-left">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-teal-700 to-amber-600 bg-clip-text text-transparent">
          Notifications
        </h1>
        <p className="text-teal-700 mt-2">
          Stay updated with your subscription activity 🌊✨
        </p>
      </div>

      {notifications.length === 0 ? (
        <Card className="border-teal-200 shadow-md bg-white/70">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Bell className="h-16 w-16 text-amber-400 mb-4" />
            <p className="text-teal-600 text-lg">No notifications yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification._id}
              className={`hover:shadow-xl transition-all border-2 ${
                !notification.read
                  ? "border-amber-400 bg-amber-50/40"
                  : "border-teal-100 bg-white"
              }`}
              onClick={() => !notification.read && markAsRead(notification._id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <p className="text-base font-medium text-teal-900">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="capitalize border-amber-400 text-amber-700"
                    >
                      {notification.type}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification._id);
                      }}
                      className="hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
