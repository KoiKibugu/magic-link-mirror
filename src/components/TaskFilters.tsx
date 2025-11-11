import { Button } from "@/components/ui/button";
import { Status } from "./TaskCard";
import { cn } from "@/lib/utils";

interface TaskFiltersProps {
  activeFilter: Status | "all";
  onFilterChange: (filter: Status | "all") => void;
  counts: {
    all: number;
    todo: number;
    inProgress: number;
    done: number;
  };
}

export function TaskFilters({ activeFilter, onFilterChange, counts }: TaskFiltersProps) {
  const filters = [
    { value: "all" as const, label: "All Tasks", count: counts.all },
    { value: "todo" as const, label: "To Do", count: counts.todo },
    { value: "in-progress" as const, label: "In Progress", count: counts.inProgress },
    { value: "done" as const, label: "Done", count: counts.done },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? "default" : "outline"}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "gap-2",
            activeFilter === filter.value && "shadow-sm"
          )}
        >
          {filter.label}
          <span
            className={cn(
              "text-xs px-1.5 py-0.5 rounded-full",
              activeFilter === filter.value
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {filter.count}
          </span>
        </Button>
      ))}
    </div>
  );
}
