
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for recent stages - in a real app this would come from your backend
const recentStages = [
  { id: 1, etudiant: "Marie Dupont", date: "2025-04-20" },
  { id: 2, etudiant: "Lucas Martin", date: "2025-04-19" },
  { id: 3, etudiant: "Emma Bernard", date: "2025-04-18" },
  { id: 4, etudiant: "Thomas Petit", date: "2025-04-17" },
  { id: 5, etudiant: "Sophie Laurent", date: "2025-04-16" },
];

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue dans votre plateforme de gestion de stages.
        </p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Étudiants inscrits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">
                +5 ce mois-ci
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enseignants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                +2 ce mois-ci
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nombre de stages affectés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">
                +8 ce mois-ci
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Stages récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentStages.map((stage) => (
                  <div
                    key={stage.id}
                    className="flex items-center justify-between border-b py-2 last:border-0"
                  >
                    <div className="font-medium">{stage.etudiant}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(stage.date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
