
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MainNav } from "@/components/layout/MainNav";
import { UserNav } from "@/components/layout/UserNav";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Vérification de l'authentification
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  if (!mounted) return null;

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-sidebar lg:block">
          <Sidebar>
            <SidebarHeader className="border-b p-6">
              <h2 className="text-lg font-semibold text-sidebar-foreground">StageManager</h2>
            </SidebarHeader>
            <SidebarContent className="p-4">
              <MainNav />
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 text-sidebar-foreground" 
                onClick={handleLogout}
              >
                Déconnexion
              </Button>
            </SidebarFooter>
          </Sidebar>
        </div>
        <div className="flex flex-col">
          <header className="flex h-16 items-center justify-between border-b px-6">
            <div className="flex items-center gap-2 lg:hidden">
              <SidebarTrigger />
              <h1 className="font-semibold">StageManager</h1>
            </div>
            <div className="flex items-center gap-4">
              <UserNav />
            </div>
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
