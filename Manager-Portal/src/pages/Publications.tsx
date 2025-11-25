import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axiosInstance"; // ✅ use axiosInstance here

interface Publication {
  _id: string;
  name: string;
  language: string;
  monthlyPrice: number;
  active: boolean;
}

const Publications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    language: "",
    monthlyPrice: "",
  });

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await axiosInstance.get("/manager/publications");
      setPublications(response.data);
    } catch (error) {
      console.error("Error fetching publications:", error);
    }
  };

  // Publications.tsx → handleSubmit()
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const payload = {
      name: formData.name,
      language: formData.language,
      monthlyPrice: Number(formData.monthlyPrice),
    };

    if (editingPublication) {
      await axiosInstance.put(`/manager/publications/${editingPublication._id}`, payload);
      toast.success('Publication updated successfully');
    } else {
      await axiosInstance.post('/manager/publications', payload);
      toast.success('Publication added successfully');
    }

    setIsDialogOpen(false);
    resetForm();
    fetchPublications();
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    toast.error('Failed to save publication');
  }
};






  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this publication?")) return;

    try {
      await axiosInstance.delete(`/manager/publications/${id}`);
      toast.success("Publication deleted successfully");
      fetchPublications();
    } catch (error) {
      toast.error("Failed to delete publication");
      console.error(error);
    }
  };

  const handleEdit = (publication: Publication) => {
    setEditingPublication(publication);
    setFormData({
      name: publication.name,
      language: publication.language,
      monthlyPrice: publication.monthlyPrice.toString(),
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingPublication(null);
    setFormData({ name: "", language: "", monthlyPrice: "" });
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="page-heading text-blue-800">Publications</h1>
          <p className="mt-2 text-muted-foreground">Manage newspapers and magazines</p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Publication
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPublication ? "Edit Publication" : "Add New Publication"}
              </DialogTitle>
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
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyPrice">Monthly Price (₹)</Label>
                <Input
                  id="monthlyPrice"
                  type="number"
                  value={formData.monthlyPrice}
                  onChange={(e) => setFormData({ ...formData, monthlyPrice: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingPublication ? "Update" : "Add"} Publication
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-blue-900">All Publications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Monthly Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publications.map((publication) => (
                <TableRow key={publication._id}>
                  <TableCell className="font-medium">{publication.name}</TableCell>
                  <TableCell>{publication.language}</TableCell>
                  <TableCell>₹{publication.monthlyPrice}</TableCell>
                  <TableCell>
                    <Badge variant={publication.active ? "default" : "secondary"}>
                      {publication.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(publication)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(publication._id)}
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
    </div>
  );
};

export default Publications;
