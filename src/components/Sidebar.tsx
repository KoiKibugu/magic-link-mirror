import { LayoutDashboard, CheckSquare, Ticket, FileText, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: "dashboard" | "tasks" | "tickets" | "documents" | "audit") => void;
  userRole: string | null;
}

export const Sidebar = ({ activeView, setActiveView, userRole }: SidebarProps) => {
  const { signOut } = useAuth();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "tickets", label: "Tickets", icon: Ticket },
    { id: "documents", label: "Documents", icon: FileText },
  ];

  if (userRole === "admin") {
    menuItems.push({ id: "audit", label: "Audit Logs", icon: Shield });
  }

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">SavoS</h1>
        <p className="text-sm text-muted-foreground">Task Manager Pro</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                activeView === item.id && "bg-primary text-primary-foreground"
              )}
              onClick={() => setActiveView(item.id as any)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full justify-start" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};
