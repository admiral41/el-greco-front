"use client";
import { useState, useEffect, useRef } from "react";
import Preloader from "@/components/Preloader/Preloader";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const hasVisited = typeof window !== 'undefined' ? localStorage.getItem("hasVisited") : null;
    if (hasVisited) {
      setLoading(false);
      setHasLoaded(true);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        setHasLoaded(true);
        localStorage.setItem("hasVisited", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {loading && <Preloader />}
      
      <div style={{ 
        visibility: loading ? 'hidden' : 'visible',
        opacity: hasLoaded ? 1 : 0, 
        transition: "opacity 0.8s ease",
        minHeight: "100vh"
      }}>
        <Navbar loading={loading} />
        {children}
        <Footer loading={loading} />
      </div>
    </>
  );
}