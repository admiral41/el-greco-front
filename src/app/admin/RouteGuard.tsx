// src/app/admin/RouteGuard.tsx
"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const publicPaths = ['/admin/login'];

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // If done loading, and user not logged in, and route is protected → redirect
    if (!isLoading && !user && !publicPaths.includes(pathname)) {
      router.push('/admin/login');
    }
  }, [user, isLoading, pathname, router]);

  // Allow access to login page without being authenticated
  if (publicPaths.includes(pathname)) {
    return <>{children}</>;
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
