import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pause, Play, XCircle, AlertTriangle } from 'lucide-react';
import axiosInstance from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';

interface DeliveryPerson {
  name: string;
  phone: string;
  photo?: string;
}

interface Subscription {
  id: string;
  publicationName: string;
  status: 'active' | 'paused' | 'pending' | 'cancelled';
  startDate: string;
  amount: number;
  deliveryPerson?: DeliveryPerson;
}

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSubscriptions();

    // ✅ Listen for subscription updates
    const handleSubscriptionUpdate = () => loadSubscriptions();
    window.addEventListener("subscriptionsUpdated", handleSubscriptionUpdate);

    return () => {
      window.removeEventListener("subscriptionsUpdated", handleSubscriptionUpdate);
    };
  }, []);

  const loadSubscriptions = async () => {
    try {
      const dummyData: Subscription[] = [
        {
          id: "1",
          publicationName: "The Daily Times",
          status: "active",
          startDate: "2025-10-15T00:00:00Z",
          amount: 120,
          deliveryPerson: {
            name: "Rahul Kumar",
            phone: "9876543210",
            photo: "https://randomuser.me/api/portraits/men/32.jpg",
          },
        },
        {
          id: "2",
          publicationName: "Morning Herald",
          status: "paused",
          startDate: "2025-09-01T00:00:00Z",
          amount: 150,
          deliveryPerson: {
            name: "Priya Sharma",
            phone: "9823456789",
            photo: "https://randomuser.me/api/portraits/women/44.jpg",
          },
        },
        {
          id: "3",
          publicationName: "Evening Express",
          status: "cancelled",
          startDate: "2025-07-20T00:00:00Z",
          amount: 100,
          deliveryPerson: {
            name: "Arun Singh",
            phone: "9812233445",
            photo: "https://randomuser.me/api/portraits/men/46.jpg",
          },
        },
      ];

      // Try fetching from backend
      const response = await axiosInstance.get('/customer/subscriptions');
      const data = Array.isArray(response.data) && response.data.length > 0 ? response.data : dummyData;
      setSubscriptions(data);
    } catch (error) {
      console.error("Failed to fetch subscriptions, using dummy data:", error);
      setSubscriptions([
        {
          id: "1",
          publicationName: "The Daily Times",
          status: "active",
          startDate: "2025-10-15T00:00:00Z",
          amount: 120,
          deliveryPerson: {
            name: "Rahul Kumar",
            phone: "9876543210",
            photo: "https://randomuser.me/api/portraits/men/32.jpg",
          },
        },
        {
          id: "2",
          publicationName: "Morning Herald",
          status: "paused",
          startDate: "2025-09-01T00:00:00Z",
          amount: 150,
          deliveryPerson: {
            name: "Priya Sharma",
            phone: "9823456789",
            photo: "https://randomuser.me/api/portraits/women/44.jpg",
          },
        },
        {
          id: "3",
          publicationName: "Evening Express",
          status: "cancelled",
          startDate: "2025-07-20T00:00:00Z",
          amount: 100,
          deliveryPerson: {
            name: "Arun Singh",
            phone: "9812233445",
            photo: "https://randomuser.me/api/portraits/men/46.jpg",
          },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, action: 'pause' | 'resume' | 'cancel') => {
    try {
      await axiosInstance.patch(`/customer/subscriptions/${id}/${action}`);
      toast({
        title: 'Success',
        description: `Subscription ${action}d successfully`,
      });
      loadSubscriptions();
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${action} subscription`,
        variant: 'destructive',
      });
    }
  };

  const reportMissing = async (id: string) => {
    try {
      await axiosInstance.post(`/customer/subscriptions/${id}/report-missing`);
      toast({
        title: 'Report submitted',
        description: 'Manager has been notified about the missing delivery',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit report',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      active: { variant: 'default', label: 'Active' },
      paused: { variant: 'secondary', label: 'Paused' },
      pending: { variant: 'outline', label: 'Pending Approval' },
      cancelled: { variant: 'destructive', label: 'Cancelled' },
    };
    const config = variants[status] || variants.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-32 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-amber-600 bg-clip-text text-transparent">
          My Subscriptions
        </h1>
        <p className="text-muted-foreground mt-1 text-amber-600">
          Manage your active newspaper subscriptions
        </p>
      </div>

      {subscriptions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground text-lg">No subscriptions found</p>
            <Button
              className="mt-4"
              onClick={() => (window.location.href = '/new-subscription')}
            >
              Create Your First Subscription
            </Button>
          </CardContent>
        </Card>
      ) : (
        // ✅ 3 cards per row grid
        <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {subscriptions.map((subscription) => (
            <Card key={subscription.id} className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{subscription.publicationName}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Started: {new Date(subscription.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  {getStatusBadge(subscription.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Monthly Amount</span>
                  <span className="text-lg font-bold">₹{subscription.amount.toFixed(2)}</span>
                </div>

                {subscription.deliveryPerson && (
                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <Avatar>
                      <AvatarImage src={subscription.deliveryPerson.photo} />
                      <AvatarFallback>
                        {subscription.deliveryPerson.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">Delivery Person</p>
                      <p className="text-sm text-muted-foreground">
                        {subscription.deliveryPerson.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {subscription.deliveryPerson.phone}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {subscription.status === 'active' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(subscription.id, 'pause')}
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => reportMissing(subscription.id)}
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Report Missing Delivery
                      </Button>
                    </>
                  )}
                  {subscription.status === 'paused' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(subscription.id, 'resume')}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                  )}
                  {subscription.status !== 'cancelled' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleStatusChange(subscription.id, 'cancel')}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
