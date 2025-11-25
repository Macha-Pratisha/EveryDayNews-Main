// import { useState, useEffect } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { useToast } from '@/hooks/use-toast';
// import api from '@/lib/axios';
// import { MapPin, Package, CheckCircle2, Navigation, Loader2, Building2 } from 'lucide-react';
// import DeliveryMap from '@/components/DeliveryMap';

// interface Customer {
//   id: string;
//   name: string;
//   address: string;
//   publications: string[];
//   status: 'pending' | 'delivered' | 'missed';
//   latitude?: number;
//   longitude?: number;
// }

// interface RouteData {
//   routeId: string;
//   date: string;
//   customers: Customer[];
//   totalDeliveries: number;
// }

// const Dashboard = () => {
//   const { user } = useAuth();
//   const { toast } = useToast();
//   const [route, setRoute] = useState<RouteData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [routeStarted, setRouteStarted] = useState(false);
//   const [showMap, setShowMap] = useState(false);

//   useEffect(() => {
//     fetchTodayRoute();
//   }, []);

//   const fetchTodayRoute = async () => {
//     try {
//       setIsLoading(true);
//       const response = await api.get('/delivery/today');
//       setRoute(response.data);
//     } catch (error: any) {
//       toast({
//         title: 'Error fetching route',
//         description: error.response?.data?.message || 'Failed to load today\'s route',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleStartRoute = () => {
//     setRouteStarted(true);
//     toast({
//       title: 'Route started',
//       description: 'Your location is now being tracked',
//     });
//   };

//   const handleMarkDelivered = async (customerId: string) => {
//     try {
//       await api.post('/delivery/mark-delivered', {
//         customerId,
//         routeId: route?.routeId,
//         timestamp: new Date().toISOString(),
//       });

//       setRoute((prev) => {
//         if (!prev) return prev;
//         return {
//           ...prev,
//           customers: prev.customers.map((c) =>
//             c.id === customerId ? { ...c, status: 'delivered' as const } : c
//           ),
//         };
//       });

//       toast({
//         title: 'Delivery confirmed',
//         description: 'Customer marked as delivered',
//       });
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to mark delivery',
//         variant: 'destructive',
//       });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-background">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   const deliveredCount = route?.customers.filter((c) => c.status === 'delivered').length || 0;
//   const totalCount = route?.totalDeliveries || 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted pb-24">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-primary to-primary/90 px-4 py-8 text-primary-foreground shadow-lg">
//         <div className="mx-auto max-w-4xl">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold mb-2">Today's Route</h1>
//               <p className="text-sm opacity-90 flex items-center gap-2">
//                 <Building2 className="h-4 w-4" />
//                 {user?.branchName} • {new Date().toLocaleDateString('en-US', { 
//                   weekday: 'long', 
//                   month: 'long', 
//                   day: 'numeric' 
//                 })}
//               </p>
//             </div>
//             {!routeStarted && (
//               <Button 
//                 onClick={handleStartRoute} 
//                 size="lg" 
//                 variant="secondary"
//                 className="shadow-xl font-semibold"
//               >
//                 <Navigation className="mr-2 h-5 w-5" />
//                 Start Route
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <Card className="shadow-lg hover:shadow-xl transition-shadow border-border">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground mb-1">Total Stops</p>
//                   <p className="text-3xl font-bold text-foreground">{totalCount}</p>
//                 </div>
//                 <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
//                   <MapPin className="w-7 h-7 text-primary" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="shadow-lg hover:shadow-xl transition-shadow border-border">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground mb-1">Delivered</p>
//                   <p className="text-3xl font-bold text-success">{deliveredCount}</p>
//                 </div>
//                 <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center">
//                   <CheckCircle2 className="w-7 h-7 text-success" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="shadow-lg hover:shadow-xl transition-shadow border-border">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground mb-1">Remaining</p>
//                   <p className="text-3xl font-bold text-warning">{totalCount - deliveredCount}</p>
//                 </div>
//                 <div className="w-14 h-14 bg-warning/10 rounded-2xl flex items-center justify-center">
//                   <Package className="w-7 h-7 text-warning" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Progress Card */}
//         <Card className="shadow-lg border-border">
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between text-xl">
//               <span>Delivery Progress</span>
//               <span className="text-3xl font-bold text-primary">
//                 {/* {Math.round((deliveredCount / totalCount) * 100)}% */}
//                 85%
//               </span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="h-3 w-full bg-muted rounded-full overflow-hidden shadow-inner">
//               <div
//                 className="h-full bg-gradient-to-r from-accent to-success transition-all duration-500 rounded-full"
//                 style={{ width: `${(deliveredCount / totalCount) * 100}%` }}
//               />
//             </div>
//             <div className="flex gap-3">
//               {routeStarted ? (
//                 <Button variant="outline" className="flex-1" size="lg" disabled>
//                   <CheckCircle2 className="mr-2 h-5 w-5 text-success" />
//                   Route Active
//                 </Button>
//               ) : null}
//               <Button 
//                 onClick={() => setShowMap(!showMap)} 
//                 variant={showMap ? "default" : "outline"} 
//                 size="lg"
//                 className="flex-1 sm:flex-initial font-semibold"
//               >
//                 <MapPin className="mr-2 h-5 w-5" />
//                 {showMap ? 'Hide Map' : 'View Map'}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Map View */}
//         {showMap && route && (
//           <Card className="shadow-lg border-border">
//             <CardHeader>
//               <div className="flex items-center gap-2">
//                 <MapPin className="h-5 w-5 text-primary" />
//                 <CardTitle className="text-xl">Route Map</CardTitle>
//               </div>
//               <CardDescription>Interactive map showing all delivery stops</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <DeliveryMap customers={route.customers} />
//             </CardContent>
//           </Card>
//         )}

//         {/* Delivery List */}
//         <Card className="shadow-lg border-border">
//           <CardHeader>
//             <div className="flex items-center gap-2">
//               <Package className="h-5 w-5 text-primary" />
//               <CardTitle className="text-xl">Delivery Stops</CardTitle>
//             </div>
//             <CardDescription>Tap "Mark Delivered" after completing each stop</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {route?.customers.map((customer, index) => (
//                 <div
//                   key={customer.id}
//                   className={`border rounded-xl p-5 transition-all ${
//                     customer.status === 'delivered'
//                       ? 'border-success/30 bg-success/5'
//                       : 'border-border bg-card hover:border-primary/30 hover:shadow-md'
//                   }`}
//                 >
//                   <div className="flex items-start justify-between gap-4">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-3">
//                         <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
//                           {index + 1}
//                         </span>
//                         <div className="flex-1">
//                           <h3 className="font-bold text-foreground text-lg">{customer.name}</h3>
//                           {customer.status === 'delivered' && (
//                             <span className="inline-flex items-center gap-1 text-xs font-medium text-success mt-1">
//                               <CheckCircle2 className="w-3 h-3" />
//                               Completed
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                       <p className="text-sm text-muted-foreground flex items-start gap-2 mb-3">
//                         <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
//                         {customer.address}
//                       </p>
//                       <div className="flex flex-wrap gap-2">
//                         {customer.publications.map((pub) => (
//                           <Badge key={pub} variant="secondary" className="text-xs font-medium">
//                             <Package className="mr-1 h-3 w-3" />
//                             {pub}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                     {customer.status === 'pending' ? (
//                       <Button
//                         onClick={() => handleMarkDelivered(customer.id)}
//                         size="lg"
//                         className="flex-shrink-0 font-semibold shadow-lg"
//                       >
//                         <CheckCircle2 className="mr-2 h-5 w-5" />
//                         Mark Delivered
//                       </Button>
//                     ) : (
//                       <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 bg-success/10 rounded-xl">
//                         <CheckCircle2 className="h-7 w-7 text-success" />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// Updated Dashboard component with per-customer Start Route buttons and 4 dummy customers
// (Full updated code provided here so you can copy/paste)
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/axios';
import { MapPin, Package, CheckCircle2, Navigation, Loader2, Building2 } from 'lucide-react';
import DeliveryMap from '@/components/DeliveryMap';
import { useNavigate } from "react-router-dom";

interface Customer {
  id: string;
  name: string;
  address: string;
  publications: string[];
  status: 'pending' | 'delivered' | 'missed';
  latitude?: number;
  longitude?: number;
}

interface RouteData {
  routeId: string;
  date: string;
  customers: Customer[];
  totalDeliveries: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [route, setRoute] = useState<RouteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCustomerRoute, setActiveCustomerRoute] = useState<string | null>(null);

  useEffect(() => {
    fetchTodayRoute();
  }, []);

  const fetchTodayRoute = async () => {
    try {
      setIsLoading(true);

      // Dummy route data
      const dummyRoute: RouteData = {
        routeId: 'dummy-001',
        date: new Date().toISOString(),
        totalDeliveries: 4,
        customers: [
          { id: 'c1', name: 'John Doe', address: '12 Park Street, City Center', publications: ['Daily News'], status: 'pending' },
          { id: 'c2', name: 'Mary Smith', address: '45 Green Lane, West Area', publications: ['Business Times', 'Daily News'], status: 'pending' },
          { id: 'c3', name: 'Richard Paul', address: '78 Sunset Road, Old Town', publications: ['Morning Herald'], status: 'pending' },
          { id: 'c4', name: 'Jennifer Lee', address: '9 Riverside Colony', publications: ['Tech Weekly'], status: 'pending' },
        ],
      };

      setRoute(dummyRoute);
    } finally {
      setIsLoading(false);
    }
  };

  const startRouteForCustomer = (customer: Customer) => {
    setActiveCustomerRoute(customer.id);

    navigate(`/route?address=${encodeURIComponent(customer.address)}`);

    toast({
      title: "Route Started",
      description: `Opening map for ${customer.name}`,
    });
  };

  const handleMarkDelivered = async (customerId: string) => {
    setRoute((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        customers: prev.customers.map((c) =>
          c.id === customerId ? { ...c, status: 'delivered' } : c
        ),
      };
    });

    toast({
      title: 'Delivery confirmed',
      description: 'Customer marked as delivered',
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const deliveredCount = route?.customers.filter((c) => c.status === 'delivered').length || 0;
  const totalCount = route?.totalDeliveries || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted pb-24">

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 px-4 py-8 text-primary-foreground shadow-lg">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Today's Route</h1>
              <p className="text-sm opacity-90 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {user?.branchName} • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">

        {/* ⭐ Dummy Values Section */}
        <div className="p-4 bg-primary/10 rounded-xl shadow-md flex items-center justify-between">
          <div className="text-lg font-semibold text-success">
            Delivered Today: 12
          </div>
          <div className="text-lg font-semibold text-warning">
            Remaining: 5
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Stops</p>
                  <p className="text-3xl font-bold text-foreground">{totalCount}</p>
                </div>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Delivered</p>
                  <p className="text-3xl font-bold text-success">{deliveredCount}</p>
                </div>
                <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Remaining</p>
                  <p className="text-3xl font-bold text-warning">{totalCount - deliveredCount}</p>
                </div>
                <div className="w-14 h-14 bg-warning/10 rounded-2xl flex items-center justify-center">
                  <Package className="w-7 h-7 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delivery List */}
        <Card className="shadow-lg border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Delivery Stops</CardTitle>
            </div>
            <CardDescription>Start route per customer and mark delivered</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {route?.customers.map((customer, index) => (
                <div key={customer.id} className={`border rounded-xl p-5 transition-all ${
                  customer.status === 'delivered'
                    ? 'border-success/30 bg-success/5'
                    : 'border-border bg-card hover:border-primary/30 hover:shadow-md'
                }`}>
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                          {index + 1}
                        </span>

                        <div className="flex-1">
                          <h3 className="font-bold text-foreground text-lg">{customer.name}</h3>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground flex items-start gap-2 mb-3">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                        {customer.address}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {customer.publications.map((pub) => (
                          <Badge key={pub} variant="secondary" className="text-xs font-medium">
                            <Package className="mr-1 h-3 w-3" />
                            {pub}
                          </Badge>
                        ))}
                      </div>

                      {activeCustomerRoute === customer.id ? (
                        <Button variant="outline" size="sm" disabled className="mb-3">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-success" />
                          Route Active
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="mb-3"
                          onClick={() => startRouteForCustomer(customer)}
                        >
                          <Navigation className="mr-2 h-4 w-4" /> Start Route
                        </Button>
                      )}
                    </div>

                    {customer.status === 'pending' ? (
                      <Button
                        onClick={() => handleMarkDelivered(customer.id)}
                        size="lg"
                        className="flex-shrink-0 font-semibold shadow-lg"
                      >
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Mark Delivered
                      </Button>
                    ) : (
                      <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 bg-success/10 rounded-xl">
                        <CheckCircle2 className="h-7 w-7 text-success" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;

