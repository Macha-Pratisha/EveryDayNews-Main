import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Newspaper,
  CreditCard,
  DollarSign,
  Clock,
  Bell,
  CheckCircle,
} from 'lucide-react';
import axiosInstance from '@/lib/axios';
import { Badge } from '@/components/ui/badge';

interface DashboardStats {
  activeSubscriptions: number;
  nextBillDate: string;
  totalPaid: number;
  pendingPayments: number;
}

interface Notification {
  id: string;
  type: string;
  message: string;
  createdAt: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    activeSubscriptions: 3,
    nextBillDate: '2025-12-05',
    totalPaid: 1240.75,
    pendingPayments: 2,
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // 🌐 Fetch backend notifications first
      const apiResponse = await axiosInstance.get('https://everydaynewsbackend.onrender.com/api/notes');
      const apiNotifications: Notification[] =
        apiResponse.data?.map((note: any) => ({
          id: note._id || note.id,
          type: note.type || 'general',
          message: note.message || note.title || 'New note available',
          createdAt: note.createdAt || new Date().toISOString(),
        })) || [];

      // 🧠 Dummy notifications (fallback)
      const dummyNotifications: Notification[] = [
        {
          id: '1',
          type: 'approval',
          message: 'Your new subscription has been approved!',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'payment',
          message: 'Payment of $120 was successfully processed.',
          createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
        },
        {
          id: '3',
          type: 'delivery',
          message: 'Latest magazine issue is out for delivery.',
          createdAt: new Date(Date.now() - 7200 * 1000).toISOString(),
        },
        {
          id: '4',
          type: 'payment',
          message: 'Invoice for next month is generated.',
          createdAt: new Date(Date.now() - 86400 * 1000).toISOString(),
        },
      ];

      // 🧩 Combine (backend notifications first)
      const combined = [...apiNotifications, ...dummyNotifications].slice(0, 7);
      setNotifications(combined);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);

      // fallback: only show dummy if backend fails
      const fallbackDummy: Notification[] = [
        {
          id: '1',
          type: 'general',
          message: 'System Update: Unable to fetch notifications. Showing defaults.',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'payment',
          message: 'Payment of $120 was successfully processed.',
          createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
        },
        {
          id: '3',
          type: 'delivery',
          message: 'Latest magazine issue is out for delivery.',
          createdAt: new Date(Date.now() - 7200 * 1000).toISOString(),
        },
        {
          id: '4',
          type: 'approval',
          message: 'Your new subscription has been approved!',
          createdAt: new Date(Date.now() - 10800 * 1000).toISOString(),
        },
      ];
      setNotifications(fallbackDummy);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Active Subscriptions',
      value: stats.activeSubscriptions,
      icon: Newspaper,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Next Bill Date',
      value: stats.nextBillDate,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Total Paid',
      value: `$${stats.totalPaid.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments,
      icon: CreditCard,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-accent" />;
      case 'delivery':
        return <Newspaper className="h-5 w-5 text-primary" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-teal-700 to-amber-600 bg-clip-text text-transparent
">
          {/* Welcome back, {user?.name || 'User'}! */}
          Welcome back!
        </h1>
        {user?.branchName && (
          <p className="text-muted-foreground mt-1">
            Branch: {user.branchName}
          </p>
        )}
      </div>

      {/* Stats Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow border-teal-100"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-full ${stat.bgColor} flex items-center justify-center`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-teal-700 to-amber-600 bg-clip-text text-transparent
">
            <Bell className="h-5 w-5 text-amber-600 " />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No new notifications
            </p>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-amber-50 transition-colors"
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {notification.type}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
