import * as React from "react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Tableau de bord
      </Link>
      <Link
        to="/students"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Étudiants
      </Link>
      <Link
        to="/teachers"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Enseignants
      </Link>
      <Link
        to="/internships"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Stages
      </Link>
      <Link
        to="/levels"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Niveaux
      </Link>
    </nav>
  );
}
