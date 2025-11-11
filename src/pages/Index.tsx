import { useState } from "react";
import { TaskCard, Task, Status } from "@/components/TaskCard";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { TaskFilters } from "@/components/TaskFilters";
import { useToast } from "@/hooks/use-toast";
import { CheckSquare } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design new landing page",
      description: "Create mockups for the new product landing page with modern design",
      priority: "high",
      status: "in-progress",
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Review pull requests",
      description: "Check and approve pending PRs from the team",
      priority: "medium",
      status: "todo",
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Update documentation",
      description: "Add API documentation for new endpoints",
      priority: "low",
      status: "done",
      createdAt: new Date(),
    },
  ]);
  const [filter, setFilter] = useState<Status | "all">("all");

  const handleAddTask = (taskData: {
    title: string;
    description: string;
    priority: Task["priority"];
    status: Status;
  }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
    toast({
      title: "Task created",
      description: "Your new task has been added successfully.",
    });
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "done" ? "todo" : "done" as Status }
          : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed.",
      variant: "destructive",
    });
  };

  const handleStatusChange = (id: string, status: Status) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)));
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  const counts = {
    all: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary rounded-lg">
              <CheckSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Task Manager</h1>
          </div>
          <p className="text-muted-foreground">
            Organize your work and get things done
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <TaskFilters
            activeFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
          <AddTaskDialog onAdd={handleAddTask} />
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <CheckSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                No tasks found
              </h3>
              <p className="text-muted-foreground">
                {filter === "all"
                  ? "Create your first task to get started"
                  : `No ${filter} tasks at the moment`}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
