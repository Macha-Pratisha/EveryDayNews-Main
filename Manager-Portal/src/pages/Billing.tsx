import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';

interface BillingRecord {
  id: string;
  customerName: string;
  amount: number;
  status: string;
  dueDate: string;
  invoiceNumber: string;
}

// ✅ Dummy Billing Data
const dummyBillingRecords: BillingRecord[] = [
  {
    id: '1',
    customerName: 'Aarav Sharma',
    amount: 850,
    status: 'paid',
    dueDate: '2025-11-05',
    invoiceNumber: 'INV-1001',
  },
  {
    id: '2',
    customerName: 'Priya Mehta',
    amount: 1200,
    status: 'unpaid',
    dueDate: '2025-11-10',
    invoiceNumber: 'INV-1002',
  },
  {
    id: '3',
    customerName: 'Rohan Patel',
    amount: 600,
    status: 'paid',
    dueDate: '2025-10-28',
    invoiceNumber: 'INV-1003',
  },
  {
    id: '4',
    customerName: 'Sneha Reddy',
    amount: 1500,
    status: 'unpaid',
    dueDate: '2025-11-15',
    invoiceNumber: 'INV-1004',
  },
];

const Billing = () => {
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<BillingRecord | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchBillingRecords();
  }, []);

  const fetchBillingRecords = async () => {
    try {
      const response = await axiosInstance.get('/manager/reports');
      if (response.data && response.data.length > 0) {
        const backendRecords = response.data.slice(0, 3);
        setBillingRecords([...backendRecords, ...dummyBillingRecords]);
      } else {
        setBillingRecords(dummyBillingRecords);
      }
    } catch (error) {
      console.warn('Error fetching billing records, using dummy data.');
      setBillingRecords(dummyBillingRecords);
    }
  };

  const handleExportPDF = async () => {
    try {
      toast.success('Exporting report as PDF...');
    } catch (error) {
      toast.error('Failed to export PDF');
    }
  };

  const handleExportCSV = async () => {
    try {
      toast.success('Exporting report as CSV...');
    } catch (error) {
      toast.error('Failed to export CSV');
    }
  };

  const handleView = (record: BillingRecord) => {
    setSelectedRecord(record);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
         <h1 className="page-heading text-blue-800">Billing & Reports</h1>
          <p className="mt-2 text-muted-foreground">
            View billing data and export reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportPDF}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="mb-8 grid gap-6 sm:grid-cols-3">
        <Card className="stat-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231</div>
            <p className="mt-1 text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,450</div>
            <p className="mt-1 text-xs text-muted-foreground">Outstanding</p>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Commission Paid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,131</div>
            <p className="mt-1 text-xs text-muted-foreground">To delivery team</p>
          </CardContent>
        </Card>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className='text-blue-900'>Billing Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.invoiceNumber}</TableCell>
                  <TableCell>{record.customerName}</TableCell>
                  <TableCell>₹{record.amount}</TableCell>
                  <TableCell>{record.dueDate}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        record.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {record.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => handleView(record)}>
                      <FileText className="mr-1 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ✅ View Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>Full billing information</DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="mt-4 space-y-2 text-sm">
              <p><strong>Invoice #:</strong> {selectedRecord.invoiceNumber}</p>
              <p><strong>Customer:</strong> {selectedRecord.customerName}</p>
              <p><strong>Amount:</strong> ₹{selectedRecord.amount}</p>
              <p><strong>Status:</strong> {selectedRecord.status}</p>
              <p><strong>Due Date:</strong> {selectedRecord.dueDate}</p>
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Billing;
