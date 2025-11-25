import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Truck,
  FileText,
  Bell,
  UserCircle,
  LogOut,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Publications', href: '/publications', icon: Newspaper },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Delivery Team', href: '/delivery', icon: Truck },
  { name: 'Billing & Reports', href: '/billing', icon: FileText },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Profile', href: '/profile', icon: UserCircle },
];

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-50 via-white to-blue-50 border-r border-blue-200 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-blue-200 bg-white/70 backdrop-blur-sm">
            <div className="flex items-center">
              <Newspaper className="h-8 w-8 text-blue-700" />
              <span className="ml-3 text-xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                Manager Portal
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5 text-blue-700" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center px-3 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                      : 'text-blue-800 hover:bg-blue-100 hover:text-blue-700'
                  )
                }
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-blue-200 text-xs text-blue-700/70 bg-white/50 backdrop-blur-sm">
            <p>Branch: {user?.branchName}</p>
            <p>ID: {user?.managerId}</p>
            <button
              onClick={logout}
              className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium 
              text-red-700 hover:bg-red-100 hover:text-red-600 transition-all"
            >
              <LogOut className="h-5 w-5" /> Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
