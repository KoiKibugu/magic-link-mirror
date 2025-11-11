import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Ticket, FileText, TrendingUp } from "lucide-react";

interface DashboardViewProps {
  userDepartment: any;
  userRole: string | null;
}

export const DashboardView = ({ userDepartment, userRole }: DashboardViewProps) => {
  const [stats, setStats] = useState({
    tasks: 0,
    tickets: 0,
    documents: 0,
  });

  useEffect(() => {
    fetchStats();
  }, [userDepartment]);

  const fetchStats = async () => {
    if (!userDepartment && userRole !== "admin") return;

    const filter = userRole === "admin" ? {} : { department_id: userDepartment?.id };

    const [tasksRes, ticketsRes, documentsRes] = await Promise.all([
      supabase.from("tasks").select("*", { count: "exact", head: true }).match(filter),
      supabase.from("tickets").select("*", { count: "exact", head: true }).match(filter),
      supabase.from("document_submissions").select("*", { count: "exact", head: true }),
    ]);

    setStats({
      tasks: tasksRes.count || 0,
      tickets: ticketsRes.count || 0,
      documents: documentsRes.count || 0,
    });
  };

  const statCards = [
    { title: "Active Tasks", value: stats.tasks, icon: CheckSquare, color: "text-primary" },
    { title: "Open Tickets", value: stats.tickets, icon: Ticket, color: "text-warning" },
    { title: "Documents", value: stats.documents, icon: FileText, color: "text-accent" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your department activities and statistics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {userDepartment ? userDepartment.name : "All departments"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Activity tracking coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
