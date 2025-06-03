"use client";
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartBarIcon,
  ShoppingBagIcon,
  UsersIcon,
  CogIcon,
  TicketIcon,
  CalendarIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function DashboardSidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: ChartBarIcon,
      current: pathname === '/admin/dashboard',
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: ShoppingBagIcon,
      current: pathname.startsWith('/admin/orders'),
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: ClipboardDocumentIcon,
      current: pathname.startsWith('/admin/products'),
    },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: UsersIcon,
      current: pathname.startsWith('/admin/customers'),
    },
    {
      name: 'Reservations',
      href: '/admin/reservations',
      icon: CalendarIcon,
      current: pathname.startsWith('/admin/reservations'),
    },
    {
      name: 'Promotions',
      href: '/admin/promotions',
      icon: TicketIcon,
      current: pathname.startsWith('/admin/promotions'),
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: CogIcon,
      current: pathname.startsWith('/admin/settings'),
      adminOnly: true,
    },
  ];

  // Close mobile sidebar when path changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 z-30 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex flex-col w-64 h-full border-r border-gray-200 bg-white shadow-lg md:shadow-none">
          {/* Branding */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link href="/admin/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">El Glaso</span>
              <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                ADMIN
              </span>
            </Link>
            <button 
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setIsMobileOpen(false)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                if (item.adminOnly && user?.role !== 'superadmin') return null;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg mx-2 transition-colors ${
                      item.current
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`flex-shrink-0 h-5 w-5 mr-3 ${
                        item.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                    {item.current && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-indigo-500" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium shadow-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-gray-800 truncate">{user?.name}</p>
                <p className="text-xs font-medium text-gray-500 truncate">
                  {user?.role === 'superadmin' ? 'Super Admin' : 'Store Admin'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}