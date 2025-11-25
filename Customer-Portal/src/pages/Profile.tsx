import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/lib/axios';
import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('/customer/profile');
      setProfileData(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch profile data',
        variant: 'destructive',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axiosInstance.patch('/customer/profile', profileData);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: 'Update failed',
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account information</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    disabled={!isEditing || isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled={!isEditing || isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    disabled={!isEditing || isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    disabled={!isEditing || isLoading}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  {isEditing ? (
                    <>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          fetchProfile();
                        }}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button type="button" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-medium">{user?.userId}</p>
              </div> */}
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                                          {/* {user?.role} */}
                <p className="font-medium capitalize">Customer</p>  
              </div>
              {/* {user?.branchName && (
                <div>
                  <p className="text-sm text-muted-foreground">Branch</p>
                  <p className="font-medium">{user.branchName}</p>
                </div>
              )} */}
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              {/* <CardTitle className="text-destructive">Danger Zone</CardTitle> */}
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
