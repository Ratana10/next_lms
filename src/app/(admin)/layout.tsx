import { auth } from "@/auth";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Toast from "@/modal/toaster";


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await auth()
  const name = session?.user?.name || "Guest"; 

  return (
    <section>
      <Toast />
      <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Header name={name} />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </section>
  );
}
