import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  Plus,
  CreditCard,
  MapPin,
  Bell,
  User,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Subscriptions', href: '/subscriptions', icon: Newspaper },
  { name: 'New Subscription', href: '/new-subscription', icon: Plus },
  { name: 'Payments & Bills', href: '/payments', icon: CreditCard },
  { name: 'Delivery Tracking', href: '/delivery', icon: MapPin },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Profile', href: '/profile', icon: User },
];

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-teal-50 via-white to-amber-50 border-r border-amber-100 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-amber-200 bg-white/70 backdrop-blur-sm">
            <div className="flex items-center">
              <Newspaper className="h-8 w-8 text-teal-600" />
              <span className="ml-3 text-xl font-extrabold bg-gradient-to-r from-teal-700 to-amber-600 bg-clip-text text-transparent">
                Customer Portal
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5 text-teal-700" />
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
                      ? 'bg-gradient-to-r from-teal-600 to-amber-500 text-white shadow-md'
                      : 'text-teal-800 hover:bg-amber-100 hover:text-amber-700'
                  )
                }
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-amber-100 text-xs text-teal-700/70 bg-white/50 backdrop-blur-sm">
            <p>© 2025 Customer Portal</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
