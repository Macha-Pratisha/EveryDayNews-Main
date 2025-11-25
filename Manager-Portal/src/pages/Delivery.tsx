import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';

interface DeliveryPerson {
  id: string;
  name: string;
  phone: string;
  zone: string;
  active: boolean;
  totalDeliveries: number;
  commission: number;
}

const Delivery = () => {
  const [deliveryPersons, setDeliveryPersons] = useState<DeliveryPerson[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<DeliveryPerson | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zone: '',
  });

  // Dummy data
  const dummyDeliveryPersons: DeliveryPerson[] = [
    {
      id: '1',
      name: 'Ravi Kumar',
      phone: '9876543210',
      zone: 'East Zone',
      active: true,
      totalDeliveries: 120,
      commission: 3000,
    },
    {
      id: '2',
      name: 'Asha Reddy',
      phone: '9865432109',
      zone: 'South Zone',
      active: true,
      totalDeliveries: 95,
      commission: 2400,
    },
    {
      id: '3',
      name: 'Mohit Sharma',
      phone: '9845123456',
      zone: 'North Zone',
      active: false,
      totalDeliveries: 75,
      commission: 1800,
    },
    {
      id: '4',
      name: 'Priya Das',
      phone: '9832123498',
      zone: 'West Zone',
      active: true,
      totalDeliveries: 150,
      commission: 3750,
    },
    {
      id: '5',
      name: 'John Paul',
      phone: '9823456789',
      zone: 'Central Zone',
      active: true,
      totalDeliveries: 110,
      commission: 2700,
    },
  ];

  useEffect(() => {
    fetchDeliveryPersons();
  }, []);

  const fetchDeliveryPersons = async () => {
    try {
      const response = await axiosInstance.get('/manager/deliveries');
      if (response.data && response.data.length > 0) {
        setDeliveryPersons(response.data);
      } else {
        setDeliveryPersons(dummyDeliveryPersons);
      }
    } catch (error) {
      console.error('Error fetching delivery persons:', error);
      setDeliveryPersons(dummyDeliveryPersons);
    }
  };

  // ✅ Add new person
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPerson: DeliveryPerson = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      zone: formData.zone,
      active: true,
      totalDeliveries: 0,
      commission: 0,
    };

    try {
      await axiosInstance.post('/manager/deliveries', formData);
      toast.success('Delivery person added successfully');
      setFormData({ name: '', phone: '', zone: '' });
      setIsDialogOpen(false);
      fetchDeliveryPersons();
    } catch (error) {
      // Local fallback when backend unavailable
      setDeliveryPersons((prev) => [...prev, newPerson]);
      toast.success('Delivery person added locally');
      setFormData({ name: '', phone: '', zone: '' });
      setIsDialogOpen(false);
    }
  };

  // ✅ Edit option
  const handleEdit = (person: DeliveryPerson) => {
    setSelectedPerson(person);
    setFormData({
      name: person.name,
      phone: person.phone,
      zone: person.zone,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPerson) return;

    try {
      await axiosInstance.put(`/manager/deliveries/${selectedPerson.id}`, formData);
      toast.success('Delivery person updated successfully');
      setIsEditDialogOpen(false);
      setSelectedPerson(null);
      fetchDeliveryPersons();
    } catch {
      setDeliveryPersons((prev) =>
        prev.map((p) =>
          p.id === selectedPerson.id ? { ...p, ...formData } : p
        )
      );
      toast.success('Updated locally');
      setIsEditDialogOpen(false);
    }
  };

  // ✅ Delete option
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this delivery person?')) return;

    try {
      await axiosInstance.delete(`/manager/deliveries/${id}`);
      toast.success('Delivery person removed successfully');
      fetchDeliveryPersons();
    } catch {
      setDeliveryPersons((prev) => prev.filter((p) => p.id !== id));
      toast.success('Deleted locally');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="page-heading text-blue-800">Delivery Team</h1>
          <p className="mt-2 text-muted-foreground">
            Manage delivery personnel and routes
          </p>
        </div>

        {/* Add Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Delivery Person
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Delivery Person</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone">Delivery Zone</Label>
                <Input
                  id="zone"
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white">
                Add Delivery Person
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-blue-900">Delivery Team</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Deliveries</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveryPersons.map((person) => (
                <TableRow
                  key={person.id}
                  className={!person.active ? 'bg-gray-50 text-gray-500' : ''}
                >
                  <TableCell className="font-medium">{person.name}</TableCell>
                  <TableCell>{person.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {person.zone}
                    </div>
                  </TableCell>
                  <TableCell>{person.totalDeliveries}</TableCell>
                  <TableCell>₹{person.commission.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={person.active ? 'default' : 'secondary'}>
                      {person.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(person)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(person.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Delivery Person</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-zone">Delivery Zone</Label>
              <Input
                id="edit-zone"
                value={formData.zone}
                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white">
              Update
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Delivery;
