
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Tableau de bord",
    href: "/dashboard",
  },
  {
    title: "Étudiants",
    href: "/students",
  },
  {
    title: "Enseignants",
    href: "/teachers",
  },
  {
    title: "Stages",
    href: "/internships",
  },
];

export function MainNav() {
  const location = useLocation();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
            location.pathname === item.href || 
            (item.href !== "/dashboard" && location.pathname.startsWith(item.href))
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
