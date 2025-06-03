
import ClientWrapper from "@/components/ClientWrapper";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[url('/images/marble-bg.jpg')] bg-cover bg-fixed min-h-screen">
      <ClientWrapper>
        {children}
      </ClientWrapper>
    </div>
  );
}
