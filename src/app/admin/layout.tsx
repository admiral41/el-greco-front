// src/app/admin/layout.tsx
import { AuthProvider } from '@/context/AuthContext';
import RouteGuard from './RouteGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RouteGuard>{children}</RouteGuard>
    </AuthProvider>
  );
}
