import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Clock, CheckCircle2, AlertCircle, ClipboardList, BarChart3 } from "lucide-react";

interface DashboardViewProps {
  userDepartment: any;
  userRole: string | null;
}

interface TaskStats {
  total: number;
  overdue: number;
  completed: number;
  open: number;
  byStatus: {
    pending: number;
    inProgress: number;
    review: number;
    completed: number;
  };
  byDepartment: Array<{ department: string; count: number }>;
}

export const DashboardView = ({ userDepartment, userRole }: DashboardViewProps) => {
  const [taskStats, setTaskStats] = useState<TaskStats>({
    total: 0,
    overdue: 0,
    completed: 0,
    open: 0,
    byStatus: { pending: 0, inProgress: 0, review: 0, completed: 0 },
    byDepartment: [],
  });

  useEffect(() => {
    fetchStats();
  }, [userDepartment]);

  const fetchStats = async () => {
    if (!userDepartment && userRole !== "admin") return;

    const filter = userRole === "admin" ? {} : { department_id: userDepartment?.id };

    const { data: tasks } = await supabase.from("tasks").select("*, departments(name, code)").match(filter);

    if (tasks) {
      const now = new Date();
      const completed = tasks.filter((t) => t.status === "done").length;
      const overdue = tasks.filter((t) => t.due_date && new Date(t.due_date) < now && t.status !== "done").length;
      const open = tasks.filter((t) => t.status !== "done").length;

      const byStatus = {
        pending: tasks.filter((t) => t.status === "todo").length,
        inProgress: tasks.filter((t) => t.status === "in-progress").length,
        review: tasks.filter((t) => t.status === "review").length,
        completed: tasks.filter((t) => t.status === "done").length,
      };

      const deptMap = new Map<string, number>();
      tasks.forEach((task) => {
        const deptName = task.departments?.name || "Unknown";
        deptMap.set(deptName, (deptMap.get(deptName) || 0) + 1);
      });
      const byDepartment = Array.from(deptMap.entries()).map(([department, count]) => ({
        department,
        count,
      }));

      setTaskStats({
        total: tasks.length,
        overdue,
        completed,
        open,
        byStatus,
        byDepartment,
      });
    }
  };

  const statCards = [
    { title: "Total Tasks", value: taskStats.total, icon: CheckSquare, color: "text-primary" },
    { title: "Overdue Tasks", value: taskStats.overdue, icon: AlertCircle, color: "text-destructive" },
    { title: "Completed Tasks", value: taskStats.completed, icon: CheckCircle2, color: "text-success" },
    { title: "Open Tasks", value: taskStats.open, icon: Clock, color: "text-warning" },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Tasks by Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pending</span>
              <span className="font-semibold">{taskStats.byStatus.pending}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">In Progress</span>
              <span className="font-semibold">{taskStats.byStatus.inProgress}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Review</span>
              <span className="font-semibold">{taskStats.byStatus.review}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Completed</span>
              <span className="font-semibold">{taskStats.byStatus.completed}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Tasks by Department
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {taskStats.byDepartment.length > 0 ? (
              taskStats.byDepartment.map((dept) => (
                <div key={dept.department} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{dept.department}</span>
                  <span className="font-semibold">{dept.count}</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No task data available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
