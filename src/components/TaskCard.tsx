import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
}

const priorityColors: Record<Priority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning text-warning-foreground",
  high: "bg-destructive text-destructive-foreground",
};

const statusColors: Record<Status, string> = {
  todo: "bg-secondary text-secondary-foreground",
  "in-progress": "bg-primary text-primary-foreground",
  done: "bg-success text-success-foreground",
};

export function TaskCard({ task, onToggleComplete, onDelete, onStatusChange }: TaskCardProps) {
  const isCompleted = task.status === "done";

  return (
    <Card
      className={cn(
        "group relative p-4 transition-all duration-200 hover:shadow-lg",
        isCompleted && "opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="pt-0.5">
          <GripVertical className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <Checkbox
          checked={isCompleted}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="mt-0.5"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              className={cn(
                "font-semibold text-card-foreground",
                isCompleted && "line-through"
              )}
            >
              {task.title}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity -mt-1 -mr-2"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          {task.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
            <Badge variant="outline" className={statusColors[task.status]}>
              {task.status}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
