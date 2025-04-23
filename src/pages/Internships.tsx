
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// Données d'exemple pour les stages
interface Internship {
  id: number;
  titre: string;
  entreprise: string;
  description: string;
  duree: string;
  dateDebut: string;
  etudiant: string | null;
  enseignant: string | null;
  statut: "Disponible" | "Attribué" | "En cours" | "Terminé";
}

const initialInternships: Internship[] = [
  {
    id: 1,
    titre: "Développement d'une application web",
    entreprise: "Tech Solutions",
    description: "Conception et développement d'une application web en utilisant React et Node.js.",
    duree: "3 mois",
    dateDebut: "2024-06-01",
    etudiant: "Marie Dupont",
    enseignant: "Philippe Dubois",
    statut: "Attribué",
  },
  {
    id: 2,
    titre: "Analyse de données pour l'IA",
    entreprise: "DataCore",
    description: "Analyse et préparation de données pour le machine learning.",
    duree: "4 mois",
    dateDebut: "2024-07-01",
    etudiant: null,
    enseignant: null,
    statut: "Disponible",
  },
  {
    id: 3,
    titre: "Sécurisation d'infrastructure réseau",
    entreprise: "SecureNet",
    description: "Audit et amélioration de la sécurité de l'infrastructure réseau.",
    duree: "2 mois",
    dateDebut: "2024-05-15",
    etudiant: "Thomas Petit",
    enseignant: "Amélie Lefevre",
    statut: "En cours",
  },
  {
    id: 4,
    titre: "Développement d'applications mobiles",
    entreprise: "MobileFirst",
    description: "Création d'une application mobile avec Flutter.",
    duree: "3 mois",
    dateDebut: "2024-06-15",
    etudiant: "Lucas Martin",
    enseignant: "Sophie Laurent",
    statut: "Attribué",
  },
  {
    id: 5,
    titre: "Conception d'une base de données",
    entreprise: "DBSystems",
    description: "Conception et implémentation d'une base de données pour un système de gestion.",
    duree: "2 mois",
    dateDebut: "2024-08-01",
    etudiant: null,
    enseignant: null,
    statut: "Disponible",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Disponible":
      return "bg-green-500 hover:bg-green-600";
    case "Attribué":
      return "bg-blue-500 hover:bg-blue-600";
    case "En cours":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "Terminé":
      return "bg-gray-500 hover:bg-gray-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

const Internships = () => {
  const [internships, setInternships] = useState<Internship[]>(initialInternships);
  const [newInternship, setNewInternship] = useState<Omit<Internship, "id">>({
    titre: "",
    entreprise: "",
    description: "",
    duree: "",
    dateDebut: "",
    etudiant: null,
    enseignant: null,
    statut: "Disponible",
  });
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleAddInternship = () => {
    const newId = Math.max(...internships.map((i) => i.id), 0) + 1;
    setInternships([...internships, { id: newId, ...newInternship }]);
    setNewInternship({
      titre: "",
      entreprise: "",
      description: "",
      duree: "",
      dateDebut: "",
      etudiant: null,
      enseignant: null,
      statut: "Disponible",
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Stage ajouté",
      description: "Le stage a été ajouté avec succès.",
    });
  };

  const handleEditInternship = () => {
    if (editingInternship) {
      setInternships(internships.map((i) => (i.id === editingInternship.id ? editingInternship : i)));
      setIsEditDialogOpen(false);
      toast({
        title: "Stage modifié",
        description: "Les informations ont été mises à jour.",
      });
    }
  };

  const handleDeleteInternship = (id: number) => {
    setInternships(internships.filter((i) => i.id !== id));
    setDeleteConfirmId(null);
    toast({
      title: "Stage supprimé",
      description: "Le stage a été supprimé avec succès.",
      variant: "destructive",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Stages</h1>
            <p className="text-muted-foreground">
              Gérez les offres de stages et leurs attributions.
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter un stage</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau stage</DialogTitle>
                <DialogDescription>
                  Veuillez remplir les informations du stage.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="titre">Titre</Label>
                    <Input
                      id="titre"
                      value={newInternship.titre}
                      onChange={(e) => setNewInternship({ ...newInternship, titre: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entreprise">Entreprise</Label>
                    <Input
                      id="entreprise"
                      value={newInternship.entreprise}
                      onChange={(e) => setNewInternship({ ...newInternship, entreprise: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newInternship.description}
                    onChange={(e) => setNewInternship({ ...newInternship, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duree">Durée</Label>
                    <Input
                      id="duree"
                      value={newInternship.duree}
                      onChange={(e) => setNewInternship({ ...newInternship, duree: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateDebut">Date de début</Label>
                    <Input
                      id="dateDebut"
                      type="date"
                      value={newInternship.dateDebut}
                      onChange={(e) => setNewInternship({ ...newInternship, dateDebut: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddInternship}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Date de début</TableHead>
                <TableHead>Étudiant</TableHead>
                <TableHead>Enseignant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internships.map((internship) => (
                <TableRow key={internship.id}>
                  <TableCell className="font-medium">{internship.titre}</TableCell>
                  <TableCell>{internship.entreprise}</TableCell>
                  <TableCell>{internship.duree}</TableCell>
                  <TableCell>{internship.dateDebut}</TableCell>
                  <TableCell>{internship.etudiant || "-"}</TableCell>
                  <TableCell>{internship.enseignant || "-"}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(internship.statut)}>{internship.statut}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingInternship(internship);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteConfirmId(internship.id)}
                        >
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Dialog open={deleteConfirmId === internship.id} onOpenChange={() => setDeleteConfirmId(null)}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirmer la suppression</DialogTitle>
                          <DialogDescription>
                            Êtes-vous sûr de vouloir supprimer ce stage ? Cette action est irréversible.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                            Annuler
                          </Button>
                          <Button variant="destructive" onClick={() => handleDeleteInternship(internship.id)}>
                            Supprimer
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le stage</DialogTitle>
            <DialogDescription>
              Modifiez les informations du stage.
            </DialogDescription>
          </DialogHeader>
          {editingInternship && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-titre">Titre</Label>
                  <Input
                    id="edit-titre"
                    value={editingInternship.titre}
                    onChange={(e) => setEditingInternship({ ...editingInternship, titre: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-entreprise">Entreprise</Label>
                  <Input
                    id="edit-entreprise"
                    value={editingInternship.entreprise}
                    onChange={(e) => setEditingInternship({ ...editingInternship, entreprise: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingInternship.description}
                  onChange={(e) => setEditingInternship({ ...editingInternship, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-duree">Durée</Label>
                  <Input
                    id="edit-duree"
                    value={editingInternship.duree}
                    onChange={(e) => setEditingInternship({ ...editingInternship, duree: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-dateDebut">Date de début</Label>
                  <Input
                    id="edit-dateDebut"
                    type="date"
                    value={editingInternship.dateDebut}
                    onChange={(e) => setEditingInternship({ ...editingInternship, dateDebut: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-etudiant">Étudiant</Label>
                  <Input
                    id="edit-etudiant"
                    value={editingInternship.etudiant || ""}
                    onChange={(e) => setEditingInternship({ ...editingInternship, etudiant: e.target.value || null })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-enseignant">Enseignant</Label>
                  <Input
                    id="edit-enseignant"
                    value={editingInternship.enseignant || ""}
                    onChange={(e) => setEditingInternship({ ...editingInternship, enseignant: e.target.value || null })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-statut">Statut</Label>
                <select
                  id="edit-statut"
                  value={editingInternship.statut}
                  onChange={(e) => setEditingInternship({ ...editingInternship, statut: e.target.value as any })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Attribué">Attribué</option>
                  <option value="En cours">En cours</option>
                  <option value="Terminé">Terminé</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditInternship}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Internships;
