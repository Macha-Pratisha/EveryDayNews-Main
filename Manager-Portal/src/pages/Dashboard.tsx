import { useEffect, useState } from 'react';
import {
  Users,
  TrendingUp,
  CheckCircle,
  DollarSign,
  Bell,
  Truck,
  UserPlus,
  AlertTriangle,
  Newspaper,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface DashboardStats {
  totalCustomers: number;
  activeDeliveries: number;
  pendingApprovals: number;
  totalRevenue: number;
}

interface Notification {
  title: string;
  message: string;
  time: string;
  icon: JSX.Element;
  color: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    activeDeliveries: 0,
    pendingApprovals: 0,
    totalRevenue: 0,
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('https://everydaynewsbackend.onrender.com/api/manager/notifications');
        const data = await res.json();

        const backendNotifications = (data || []).slice(0, 3).map((n: any) => ({
          title: n.title || 'Untitled Notification',
          message: n.message || 'No message available.',
          time: n.time || 'Just now',
          icon: <Bell className="h-5 w-5 text-primary" />,
          color: 'bg-primary/10',
        }));

        const dummyNotifications: Notification[] = [
          {
            title: 'Delivery Completed',
            message: 'All routes finished successfully today. Excellent coordination by the team.',
            time: '2 hours ago',
            icon: <Truck className="h-5 w-5 text-blue-600" />,
            color: 'bg-blue-50',
          },
          {
            title: 'New Customer Registered',
            message: 'John Doe from Green Valley Apartments has subscribed to the monthly plan.',
            time: '4 hours ago',
            icon: <UserPlus className="h-5 w-5 text-green-600" />,
            color: 'bg-green-50',
          },
          {
            title: 'Pending Approval',
            message: '3 new delivery executives awaiting verification under manager review.',
            time: 'Yesterday',
            icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
            color: 'bg-yellow-50',
          },
          {
            title: 'Newspaper Stock Updated',
            message: 'Inventory for the coming week has been updated successfully.',
            time: '2 days ago',
            icon: <Newspaper className="h-5 w-5 text-indigo-600" />,
            color: 'bg-indigo-50',
          },
        ];

        const combined = [
          ...backendNotifications.slice(0, 3), // take only 3 from backend
          ...dummyNotifications,               // include all 5 dummy
        ];

        setNotifications(combined);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([
          {
            title: 'System Update',
            message: 'Unable to fetch notifications. Showing default ones.',
            time: 'Just now',
            icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
            color: 'bg-red-50',
          },
        ]);
      }
    };

    const dummyStats: DashboardStats = {
      totalCustomers: 150,
      activeDeliveries: 35,
      pendingApprovals: 8,
      totalRevenue: 47500,
    };

    setStats(dummyStats);
    fetchDashboardData();
  }, []);

  // ✅ Mark notification as read (remove from list)
  const handleMarkAsRead = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
    setSelectedNotification(null);
  };

  const statCards = [
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Active Deliveries',
      value: stats.activeDeliveries,
      icon: TrendingUp,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingApprovals,
      icon: CheckCircle,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="page-heading text-3xl font-semibold text-blue-800">Dashboard</h1>
        <p className="mt-2 text-muted-foreground text-lg text-blue-900">
          Welcome back, {user?.fullName || 'Manager'} — {user?.branchName || 'Main'} Branch
        </p>
      </div>

      {/* Stats Section */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title} className="shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${card.bgColor}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notifications Section */}
      <Card className="dashboard-card shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Bell className="h-5 w-5 text-primary" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((n, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between gap-4 rounded-xl border p-4 ${n.color} transition-all hover:shadow-md`}
                >
                  <div
                    onClick={() => setSelectedNotification(n)}
                    className="flex w-full cursor-pointer items-center gap-4"
                  >
                    <div className="p-2 rounded-full bg-white shadow-sm">{n.icon}</div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900">{n.title}</p>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-1">{n.message}</p>
                      <p className="mt-1 text-xs text-gray-500">{n.time}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleMarkAsRead(i)}
                  >
                    Mark as Read
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-muted-foreground">No new notifications</p>
          )}
        </CardContent>
      </Card>

      {/* Notification Modal */}
      {selectedNotification && (
        <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedNotification.icon}
                {selectedNotification.title}
              </DialogTitle>
              <DialogDescription className="mt-2 text-gray-700">
                {selectedNotification.message}
              </DialogDescription>
              <p className="mt-4 text-sm text-muted-foreground">{selectedNotification.time}</p>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="default"
                  onClick={() => {
                    const index = notifications.findIndex(
                      (n) => n.title === selectedNotification.title
                    );
                    handleMarkAsRead(index);
                  }}
                >
                  Mark as Read
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Dashboard;
