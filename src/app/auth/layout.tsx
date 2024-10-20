import Toast from "@/modal/toaster";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Toast />
      <div className="flex flex-col">
        <main className="h-screen flex items-center justify-center">
          {children}
        </main>
      </div>
    </section>
  );
}
