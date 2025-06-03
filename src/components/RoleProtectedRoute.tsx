// src/components/RoleProtectedRoute.tsx
"use client";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import { useEffect } from "react";

export default function RoleProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode,
  allowedRoles: ('superadmin' | 'storeadmin')[]
}) {
  const router = useRouter();
  const { role, isAuthorized } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (!isAuthorized) {
      router.push('/admin/login');
      return;
    }

    if (role && !allowedRoles.includes(role)) {
      router.push('/admin/unauthorized');
    }
  }, [role, isAuthorized, router, allowedRoles]);

  if (!isAuthorized || (role && !allowedRoles.includes(role))) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}