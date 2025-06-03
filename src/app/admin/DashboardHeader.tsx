"use client";
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardHeader({ 
  onLogout,
  onToggleSidebar 
}: { 
  onLogout: () => void;
  onToggleSidebar: () => void;
}) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Mobile menu button and breadcrumb */}
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-600 mr-2"
              onClick={onToggleSidebar}
            >
              <Bars3Icon className="h-6 w-6" />
              <span className="sr-only">Open sidebar</span>
            </button>
            
            <nav className="hidden md:flex items-center space-x-2 text-sm">
              <Link 
                href="/admin/dashboard" 
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Dashboard
              </Link>
              {pathname !== '/admin/dashboard' && (
                <>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-700 capitalize">
                    {pathname.split('/').pop()?.replace('-', ' ')}
                  </span>
                </>
              )}
            </nav>
          </div>

          {/* Right side - User controls */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-1 text-gray-400 hover:text-gray-500 relative transition-colors"
            >
              <span className="sr-only">Notifications</span>
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
            </button>

            <div className="relative profile-dropdown">
              <button 
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium shadow-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link
                    href="/admin/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/admin/dashboard/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}