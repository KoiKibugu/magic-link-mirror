import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { taskSchema } from "@/lib/validationSchemas";

interface TasksViewProps {
  userDepartment: any;
}

export const TasksView = ({ userDepartment }: TasksViewProps) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();
    fetchDepartments();
    fetchUsers();
  }, [userDepartment]);

  const fetchDepartments = async () => {
    const { data } = await supabase.from("departments").select("*").order("name");
    if (data) setDepartments(data);
  };

  const fetchUsers = async () => {
    const { data } = await supabase.from("profiles").select("id, full_name, email");
    if (data) setUsers(data);
  };

  const fetchTasks = async () => {
    if (!userDepartment) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("department_id", userDepartment.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setTasks(data);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Validate input data
      const validatedData = taskSchema.parse({
        title,
        description: description || undefined,
        email: email || undefined,
        priority,
        status,
        department_id: selectedDepartment || userDepartment?.id,
        created_by: user.id,
        assigned_to: assignee || null,
        due_date: dueDate || null,
      });

      const { data, error } = await supabase.functions.invoke('create-task-with-notification', {
        body: validatedData,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: assignee 
          ? "Task created and notification sent to assignee"
          : "Task created successfully",
      });
      setOpen(false);
      setTitle("");
      setDescription("");
      setPriority("medium");
      setStatus("todo");
      setSelectedDepartment("");
      setAssignee("");
      setDueDate("");
      setEmail("");
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.errors?.[0]?.message || error.message,
        variant: "destructive",
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive";
      case "medium":
        return "bg-warning";
      case "low":
        return "bg-success";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Tasks</h1>
          <p className="text-muted-foreground">Manage your department tasks</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="assignee">Assignee</Label>
                <Select value={assignee} onValueChange={setAssignee}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.full_name || u.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="assignee@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Create Task
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No tasks yet. Create your first task to get started.
            </CardContent>
          </Card>
        ) : (
          tasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{task.description}</p>
                <Badge variant="outline">{task.status}</Badge>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
