import { useState } from 'react';
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
  Menu,
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

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen w-64 flex-col border-r shadow-lg
        bg-gradient-to-b from-blue-100/70 via-blue-50/50 to-white/60
        backdrop-blur-xl"
      >
        {/* Header */}
        <div className="flex h-16 items-center border-b border-white/40 px-6 bg-blue-500/20 backdrop-blur-md shadow-sm">
          <Newspaper className="h-8 w-8 text-blue-700 drop-shadow-md" />
          <span className="ml-2 text-lg font-bold text-gray-800 drop-shadow-sm">
            Manager Portal
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-300/40'
                    : 'text-gray-700 hover:bg-blue-100/60 hover:text-blue-700'
                )
              }
            >
              <item.icon className="h-5 w-5 text-blue-600 group-hover:text-blue-700" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/40 bg-white/60 backdrop-blur-lg p-4">
          <div className="mb-3 rounded-xl bg-white/80 p-3 shadow-sm border border-gray-200">
            <p className="text-xs font-medium text-gray-500">Branch</p>
            <p className="text-sm font-semibold text-gray-800">{user?.branchName}</p>
            <p className="mt-1 text-xs text-gray-500">ID: {user?.managerId}</p>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium 
            text-gray-700 transition-all hover:bg-red-100 hover:text-red-600 hover:shadow-sm"
          >
            <LogOut className="h-5 w-5 hover:drop-shadow-[0_0_6px_rgba(239,68,68,0.6)] transition-all" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      {/* Mobile Toggle Button */}
<Button
  variant="default" // solid button style
  size="icon"
  className="fixed top-0 left-4 z-50 rounded-full bg-white-600 text-black shadow-md hover:bg-blue-700 md:hidden"
  onClick={() => setMobileOpen(true)}
>
  <Menu className="h-6 w-6" />
</Button>


      {/* Mobile Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 border-r border-blue-200 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar panel (sharp, no blur) */}
        <div className="flex flex-col h-full bg-white/95">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-blue-200">
            <div className="flex items-center">
              <Newspaper className="h-8 w-8 text-blue-700" />
              <span className="ml-3 text-xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                Manager Portal
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
              <X className="h-5 w-5 text-blue-700" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setMobileOpen(false)}
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
          <div className="px-6 py-3 border-t border-blue-200 text-xs text-blue-700/70 bg-white/95">
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

      {/* Overlay that blurs the page behind sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
