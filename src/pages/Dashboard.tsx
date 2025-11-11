import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { TasksView } from "@/components/TasksView";
import { TicketsView } from "@/components/TicketsView";
import { DocumentsView } from "@/components/DocumentsView";
import { AuditLogsView } from "@/components/AuditLogsView";
import { DashboardView } from "@/components/DashboardView";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<"dashboard" | "tasks" | "tickets" | "documents" | "audit">("dashboard");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userDepartment, setUserDepartment] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else {
      fetchUserData();
    }
  }, [user, navigate]);

  const fetchUserData = async () => {
    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*, departments(*)")
      .eq("id", user.id)
      .single();

    if (profile) {
      setUserDepartment(profile.departments);
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);

    if (roles && roles.length > 0) {
      const hasAdmin = roles.some((r) => r.role === "admin");
      setUserRole(hasAdmin ? "admin" : roles[0].role);
    }
  };

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView userDepartment={userDepartment} userRole={userRole} />;
      case "tasks":
        return <TasksView userDepartment={userDepartment} />;
      case "tickets":
        return <TicketsView userDepartment={userDepartment} />;
      case "documents":
        return <DocumentsView userDepartment={userDepartment} />;
      case "audit":
        return <AuditLogsView />;
      default:
        return <DashboardView userDepartment={userDepartment} userRole={userRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} userRole={userRole} />
      <div className="flex-1 flex flex-col">
        <Header userDepartment={userDepartment} />
        <main className="flex-1 p-6 overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
