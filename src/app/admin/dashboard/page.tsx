"use client";
import { useAuth } from '@/context/AuthContext';
import DashboardHeader from '../DashboardHeader';
import DashboardSidebar from '../DashboardSidebar';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onLogout={logout} onToggleSidebar={function (): void {
          throw new Error('Function not implemented.');
        } } />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Welcome back, {user?.name}!
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Dashboard Cards */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
                <p className="text-gray-600">Coming soon...</p>
              </div>
              
              {user?.role === 'superadmin' && (
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                  <h2 className="text-lg font-semibold mb-2">Admin Tools</h2>
                  <ul className="space-y-2">
                    <li className="text-blue-600 hover:underline cursor-pointer">
                      User Management
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}