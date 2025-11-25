import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'sonner';

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
  createdAt: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get('/manager/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await axiosInstance.post(`/manager/notifications/${id}/read`);
      // Remove the notification from the list immediately
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      toast.success('Notification marked as read');
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to mark as read');
    }
  };

  const handleReply = (notification: Notification) => {
    setSelectedNotification(notification);
    setReplyDialogOpen(true);
  };

 const sendReply = async () => {
  if (!replyMessage.trim()) return;

  try {
    // ✅ create new note for customers
    await axiosInstance.post("/notes", { message: replyMessage });
    toast.success("Reply sent successfully and visible to customers!");
    setReplyMessage("");
    setReplyDialogOpen(false);
  } catch (error) {
    console.error("Error sending reply:", error);
    toast.error("Failed to send reply");
  }
};


  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'warning':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="page-heading text-2xl font-semibold text-blue-800">Notifications</h1>
        <p className="mt-2 text-gray-500 text-blue-900">
          Stay updated with important alerts and updates.
        </p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-medium text-blue-800">
            <Bell className="h-5 w-5" />
            All Notifications
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center">No notifications yet.</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`flex items-start gap-4 rounded-lg border p-4 transition-colors bg-white hover:bg-gray-50`}
                >
                  {/* Icon */}
                  <div className={`rounded-full p-2 ${getTypeColor(notification.type)}`}>
                    <Bell className="h-4 w-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="mt-1 text-sm text-gray-600">
                          {notification.message}
                        </p>
                        <p className="mt-2 text-xs text-gray-400">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>

                      {/* Right-side actions stacked */}
                      <div className="flex flex-col items-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification._id)}
                          className="flex items-center gap-1 text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Mark Read
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReply(notification)}
                          className="flex items-center gap-1"
                        >
                          <Reply className="h-4 w-4" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Notification</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mb-2">
            {selectedNotification?.title}
          </p>
          <Input
            placeholder="Type your reply..."
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={sendReply}>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notifications;
