import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  userDepartment: any;
}

export const Header = ({ userDepartment }: HeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-foreground">Welcome, {user?.user_metadata?.full_name || user?.email}</h2>
        {userDepartment && (
          <Badge variant="secondary">
            {userDepartment.code} - {userDepartment.name}
          </Badge>
        )}
      </div>
      <ThemeToggle />
    </header>
  );
};
