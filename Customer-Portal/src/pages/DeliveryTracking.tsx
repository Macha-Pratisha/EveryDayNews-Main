import { useEffect, useState } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, CheckCircle, Clock, Truck } from 'lucide-react';

interface Delivery {
  id: string;
  publicationName: string;
  status: 'pending' | 'on_the_way' | 'delivered' | 'received';
  scheduledDate: string;
  deliveryPerson: string;
  estimatedTime?: string;
}

const DeliveryTracking = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dummyDeliveries: Delivery[] = [
      {
        id: '1',
        publicationName: 'The Daily Times',
        status: 'on_the_way',
        scheduledDate: '2025-11-12T00:00:00Z',
        deliveryPerson: 'Ravi Kumar',
        estimatedTime: '10:30 AM',
      },
      {
        id: '2',
        publicationName: 'Morning Herald',
        status: 'delivered',
        scheduledDate: '2025-11-10T00:00:00Z',
        deliveryPerson: 'Suresh Reddy',
      },
      {
        id: '3',
        publicationName: 'Evening Express',
        status: 'received',
        scheduledDate: '2025-11-09T00:00:00Z',
        deliveryPerson: 'Anita Sharma',
      },
    ];

    setDeliveries(dummyDeliveries);
    setIsLoading(false);
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { label: 'Pending', class: 'bg-gray-200 text-gray-700' },
      on_the_way: { label: 'On the Way', class: 'bg-blue-100 text-blue-600' },
      delivered: { label: 'Delivered', class: 'bg-yellow-100 text-yellow-700' },
      received: { label: 'Received', class: 'bg-green-100 text-green-600' },
    };
    const config = variants[status] || variants.pending;
    return (
      <Badge className={`${config.class} px-3 py-1 rounded-full text-sm font-medium`}>
        {config.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-10 w-10 text-gray-500" />;
      case 'on_the_way':
        return <Truck className="h-10 w-10 text-blue-600" />;
      case 'delivered':
        return <MapPin className="h-10 w-10 text-yellow-600" />;
      case 'received':
        return <CheckCircle className="h-10 w-10 text-green-600" />;
      default:
        return <Clock className="h-10 w-10 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-muted-foreground text-lg">
        Loading deliveries...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Delivery Tracking</h1>
      <p className="text-base text-muted-foreground mb-6">
        Track your newspaper deliveries easily
      </p>

      {deliveries.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-10 w-full h-[100px]">
          <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-lg">No deliveries yet</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {deliveries.map((delivery) => (
            <Card
              key={delivery.id}
              className="w-full h-[100px] shadow-sm hover:shadow-md transition-shadow rounded-lg flex items-center px-4"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="flex-shrink-0">{getStatusIcon(delivery.status)}</div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">
                      {delivery.publicationName}
                    </CardTitle>
                    {getStatusBadge(delivery.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {delivery.deliveryPerson} •{' '}
                    {new Date(delivery.scheduledDate).toLocaleDateString()}
                    {delivery.estimatedTime && ` • ETA: ${delivery.estimatedTime}`}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryTracking;


