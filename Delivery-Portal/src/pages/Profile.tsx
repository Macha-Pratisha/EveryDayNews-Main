import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Building2, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 px-4 py-8 text-primary-foreground shadow-lg">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-sm opacity-90">Delivery Personnel Information</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Profile Info Card */}
        <Card className="shadow-lg border-border overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary shadow-xl">
                <User className="h-10 w-10 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-1">{user?.name || 'Delivery Person'}</CardTitle>
                <CardDescription className="text-base">ID: {user?.deliveryPersonId}</CardDescription>
              </div>
            </div>
          </div>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-medium">Email Address</span>
                </div>
                <p className="text-lg font-bold text-foreground break-all">{user?.email || 'N/A'}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Branch Location</span>
                </div>
                <p className="text-lg font-bold text-foreground">{user?.branchName || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions Card */}
        <Card className="shadow-lg border-border">
          <CardHeader>
            <CardTitle className="text-lg">Account Actions</CardTitle>
            <CardDescription>Manage your delivery account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleLogout}
              variant="destructive"
              size="lg"
              className="w-full font-semibold shadow-lg"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
