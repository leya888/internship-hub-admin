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

interface Internship {
  id: number;
  etudiant: string;
  enseignant1: string;
  enseignant2: string;
  salle: string;
}

const initialInternships: Internship[] = [
  {
    id: 1,
    etudiant: "Marie Dupont",
    enseignant1: "Philippe Dubois",
    enseignant2: "Sophie Laurent",
    salle: "A101",
  },
  {
    id: 2,
    etudiant: "Lucas Martin",
    enseignant1: "Jean Moreau",
    enseignant2: "Amélie Lefevre",
    salle: "B202",
  },
  {
    id: 3,
    etudiant: "Emma Bernard",
    enseignant1: "Philippe Dubois",
    enseignant2: "Sophie Laurent",
    salle: "C303",
  },
];

const Internships = () => {
  const [internships, setInternships] = useState<Internship[]>(initialInternships);
  const [newInternship, setNewInternship] = useState<Omit<Internship, "id">>({
    etudiant: "",
    enseignant1: "",
    enseignant2: "",
    salle: "",
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
      etudiant: "",
      enseignant1: "",
      enseignant2: "",
      salle: "",
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
              Gérez les jurys de soutenance de stage.
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter un jury</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau jury</DialogTitle>
                <DialogDescription>
                  Veuillez remplir les informations du jury.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="etudiant">Étudiant</Label>
                  <Input
                    id="etudiant"
                    value={newInternship.etudiant}
                    onChange={(e) => setNewInternship({ ...newInternship, etudiant: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enseignant1">Enseignant 1</Label>
                  <Input
                    id="enseignant1"
                    value={newInternship.enseignant1}
                    onChange={(e) => setNewInternship({ ...newInternship, enseignant1: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enseignant2">Enseignant 2</Label>
                  <Input
                    id="enseignant2"
                    value={newInternship.enseignant2}
                    onChange={(e) => setNewInternship({ ...newInternship, enseignant2: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salle">Salle</Label>
                  <Input
                    id="salle"
                    value={newInternship.salle}
                    onChange={(e) => setNewInternship({ ...newInternship, salle: e.target.value })}
                  />
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

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Étudiant</TableHead>
                <TableHead>Enseignant 1</TableHead>
                <TableHead>Enseignant 2</TableHead>
                <TableHead>Salle</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internships.map((internship) => (
                <TableRow key={internship.id}>
                  <TableCell>{internship.etudiant}</TableCell>
                  <TableCell>{internship.enseignant1}</TableCell>
                  <TableCell>{internship.enseignant2}</TableCell>
                  <TableCell>{internship.salle}</TableCell>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le jury</DialogTitle>
            <DialogDescription>
              Modifiez les informations du jury.
            </DialogDescription>
          </DialogHeader>
          {editingInternship && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-etudiant">Étudiant</Label>
                <Input
                  id="edit-etudiant"
                  value={editingInternship.etudiant}
                  onChange={(e) => setEditingInternship({ ...editingInternship, etudiant: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-enseignant1">Enseignant 1</Label>
                <Input
                  id="edit-enseignant1"
                  value={editingInternship.enseignant1}
                  onChange={(e) => setEditingInternship({ ...editingInternship, enseignant1: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-enseignant2">Enseignant 2</Label>
                <Input
                  id="edit-enseignant2"
                  value={editingInternship.enseignant2}
                  onChange={(e) => setEditingInternship({ ...editingInternship, enseignant2: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-salle">Salle</Label>
                <Input
                  id="edit-salle"
                  value={editingInternship.salle}
                  onChange={(e) => setEditingInternship({ ...editingInternship, salle: e.target.value })}
                />
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
