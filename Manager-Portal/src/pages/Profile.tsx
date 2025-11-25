import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Mail, User, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="page-heading text-blue-800">Profile</h1>
        <p className="mt-2 text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="dashboard-card lg:col-span-2">
          <CardHeader>
            <CardTitle className='text-blue-900'>Manager Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Input id="fullName" value={user?.fullName || 'Manager'} readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input id="email" value={user?.email} readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="branchName">Branch Name</Label>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <Input id="branchName" value={user?.branchName} readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerId">Manager ID</Label>
              <Input id="managerId" value={user?.managerId} readOnly />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className='text-blue-800'>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Update Email
            </Button>
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
