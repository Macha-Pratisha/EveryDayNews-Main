import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected';
  subscriptionType: string;
  deliveryPersonId?: string;
}

// ✅ 12 Indian dummy customers
const dummyCustomers: Customer[] = [
  {
    id: '101',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '9876543210',
    address: '12, Lotus Enclave, Delhi',
    status: 'approved',
    subscriptionType: 'Monthly',
  },
  {
    id: '102',
    name: 'Priya Mehta',
    email: 'priya.mehta@example.com',
    phone: '9988776655',
    address: '45, Green Park, Mumbai',
    status: 'pending',
    subscriptionType: 'Quarterly',
  },
  {
    id: '103',
    name: 'Rohan Patel',
    email: 'rohan.patel@example.com',
    phone: '8877665544',
    address: '23, Silver City, Ahmedabad',
    status: 'approved',
    subscriptionType: 'Monthly',
  },
  {
    id: '104',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    phone: '7766554433',
    address: '89, Jubilee Hills, Hyderabad',
    status: 'rejected',
    subscriptionType: 'Yearly',
  },
  {
    id: '105',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '6655443322',
    address: '67, Raj Nagar, Jaipur',
    status: 'pending',
    subscriptionType: 'Weekly',
  },
  {
    id: '106',
    name: 'Ananya Nair',
    email: 'ananya.nair@example.com',
    phone: '9543216780',
    address: '88, Marine Drive, Kochi',
    status: 'approved',
    subscriptionType: 'Monthly',
  },
  {
    id: '107',
    name: 'Karan Gupta',
    email: 'karan.gupta@example.com',
    phone: '9123456789',
    address: '54, Lajpat Nagar, Delhi',
    status: 'pending',
    subscriptionType: 'Quarterly',
  },
  {
    id: '108',
    name: 'Divya Iyer',
    email: 'divya.iyer@example.com',
    phone: '9012345678',
    address: '31, Adyar Colony, Chennai',
    status: 'approved',
    subscriptionType: 'Yearly',
  },
  {
    id: '109',
    name: 'Manish Verma',
    email: 'manish.verma@example.com',
    phone: '9786543210',
    address: '27, Ashok Nagar, Lucknow',
    status: 'rejected',
    subscriptionType: 'Monthly',
  },
  {
    id: '110',
    name: 'Nisha Das',
    email: 'nisha.das@example.com',
    phone: '9090909090',
    address: '21, Park Street, Kolkata',
    status: 'approved',
    subscriptionType: 'Quarterly',
  },
  {
    id: '111',
    name: 'Rahul Pillai',
    email: 'rahul.pillai@example.com',
    phone: '9823456789',
    address: '78, MG Road, Bangalore',
    status: 'pending',
    subscriptionType: 'Weekly',
  },
  {
    id: '112',
    name: 'Meera Joshi',
    email: 'meera.joshi@example.com',
    phone: '9123987654',
    address: '34, Shivaji Nagar, Pune',
    status: 'approved',
    subscriptionType: 'Monthly',
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>(dummyCustomers);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    fetchCustomers();
  }, [filter]);

  const fetchCustomers = async () => {
    try {
      // ✅ Fetch from backend (only 3)
      const response = await axiosInstance.get('/manager/customers', {
        params: { status: filter !== 'all' ? filter : undefined },
      });

      if (response.data && response.data.length > 0) {
        const backendCustomers = response.data.slice(0, 3);
        setCustomers([...backendCustomers, ...dummyCustomers]);
      } else {
        setCustomers(dummyCustomers);
      }
    } catch (error) {
      console.warn('Unable to fetch backend customers, showing dummy ones.');
      setCustomers(dummyCustomers);
    }
  };

  const handleApprove = async (customerId: string) => {
    try {
      await axiosInstance.post(`/manager/customers/${customerId}/approve`);
      toast.success('Customer approved successfully');
      fetchCustomers();
    } catch (error) {
      toast.error('Failed to approve customer');
    }
  };

  const handleReject = async (customerId: string) => {
    try {
      await axiosInstance.post(`/manager/customers/${customerId}/reject`);
      toast.success('Customer rejected');
      fetchCustomers();
    } catch (error) {
      toast.error('Failed to reject customer');
    }
  };

  const filteredCustomers = customers.filter(
    (customer) => filter === 'all' || customer.status === filter
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="page-heading text-blue-800">Customer Management</h1>
        <p className="mt-2 text-muted-foreground">
          Manage customer subscriptions and approvals
        </p>
      </div>

      <div className="mb-6 flex gap-2">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className='text-blue-900'>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.subscriptionType}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.status === 'approved'
                          ? 'default'
                          : customer.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {customer.status === 'pending' && (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleApprove(customer.id)}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(customer.id)}
                        >
                          <XCircle className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;
