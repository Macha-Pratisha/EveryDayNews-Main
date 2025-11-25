import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  Plus,
  CreditCard,
  MapPin,
  Bell,
  User,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Subscriptions", href: "/subscriptions", icon: Newspaper },
  { name: "New Subscription", href: "/new-subscription", icon: Plus },
  { name: "Payments & Bills", href: "/payments", icon: CreditCard },
  { name: "Delivery Tracking", href: "/delivery", icon: MapPin },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Profile", href: "/profile", icon: User },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
 {/* 🔹 Mobile Toggle Button */}
<div className="lg:hidden flex items-center justify-between bg-gradient-to-r from-teal-600 to-amber-500 px-4 py-3 shadow-md">
  
  {/* Left: Icon + Title */}
  <div className="flex items-center gap-2">
    <Newspaper className="h-7 w-7 text-white" />
    <span className="text-white font-bold text-lg tracking-wide">
      Customer Portal
    </span>
  </div>

  {/* Right: Toggle Button */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="text-white focus:outline-none"
  >
    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
  </button>
</div>



      {/* 🔸 Sidebar Panel */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-gradient-to-b from-teal-50 via-white to-amber-50 border-r border-amber-100 shadow-md transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-amber-200 bg-white/70 backdrop-blur-sm">
          <Newspaper className="h-8 w-8 text-amber-600" />
          <span className="ml-3 text-xl font-extrabold bg-gradient-to-r from-teal-700 to-amber-600 bg-clip-text text-transparent">
            Customer Portal
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-teal-600 to-amber-500 text-white shadow-md"
                    : "text-teal-800 hover:bg-amber-100 hover:text-amber-700"
                )
              }
              onClick={() => setIsOpen(false)} // close on mobile link click
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-amber-100 text-xs text-teal-700/70">
          <p>© 2025 Customer Portal</p>
        </div>
      </div>

      {/* 🔹 Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
