
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

// Données d'exemple pour les étudiants
interface Student {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  formation: string;
  annee: string;
}

const initialStudents: Student[] = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Marie",
    email: "marie.dupont@example.com",
    formation: "Informatique",
    annee: "3ème année",
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Lucas",
    email: "lucas.martin@example.com",
    formation: "Électronique",
    annee: "2ème année",
  },
  {
    id: 3,
    nom: "Bernard",
    prenom: "Emma",
    email: "emma.bernard@example.com",
    formation: "Informatique",
    annee: "1ère année",
  },
  {
    id: 4,
    nom: "Petit",
    prenom: "Thomas",
    email: "thomas.petit@example.com",
    formation: "Réseaux",
    annee: "3ème année",
  },
  {
    id: 5,
    nom: "Richard",
    prenom: "Chloé",
    email: "chloe.richard@example.com",
    formation: "Informatique",
    annee: "2ème année",
  },
];

const Students = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [newStudent, setNewStudent] = useState<Omit<Student, "id">>({
    nom: "",
    prenom: "",
    email: "",
    formation: "",
    annee: "",
  });
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleAddStudent = () => {
    const newId = Math.max(...students.map((s) => s.id), 0) + 1;
    setStudents([...students, { id: newId, ...newStudent }]);
    setNewStudent({ nom: "", prenom: "", email: "", formation: "", annee: "" });
    setIsAddDialogOpen(false);
    toast({
      title: "Étudiant ajouté",
      description: "L'étudiant a été ajouté avec succès.",
    });
  };

  const handleEditStudent = () => {
    if (editingStudent) {
      setStudents(students.map((s) => (s.id === editingStudent.id ? editingStudent : s)));
      setIsEditDialogOpen(false);
      toast({
        title: "Étudiant modifié",
        description: "Les informations ont été mises à jour.",
      });
    }
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter((s) => s.id !== id));
    setDeleteConfirmId(null);
    toast({
      title: "Étudiant supprimé",
      description: "L'étudiant a été supprimé avec succès.",
      variant: "destructive",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Étudiants</h1>
            <p className="text-muted-foreground">
              Gérez les étudiants inscrits dans votre établissement.
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter un étudiant</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel étudiant</DialogTitle>
                <DialogDescription>
                  Veuillez remplir les informations de l'étudiant.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input
                      id="nom"
                      value={newStudent.nom}
                      onChange={(e) => setNewStudent({ ...newStudent, nom: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input
                      id="prenom"
                      value={newStudent.prenom}
                      onChange={(e) => setNewStudent({ ...newStudent, prenom: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="formation">Formation</Label>
                    <Input
                      id="formation"
                      value={newStudent.formation}
                      onChange={(e) => setNewStudent({ ...newStudent, formation: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annee">Année</Label>
                    <Input
                      id="annee"
                      value={newStudent.annee}
                      onChange={(e) => setNewStudent({ ...newStudent, annee: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddStudent}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Formation</TableHead>
                <TableHead>Année</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.nom}</TableCell>
                  <TableCell>{student.prenom}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.formation}</TableCell>
                  <TableCell>{student.annee}</TableCell>
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
                            setEditingStudent(student);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteConfirmId(student.id)}
                        >
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Dialog open={deleteConfirmId === student.id} onOpenChange={() => setDeleteConfirmId(null)}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirmer la suppression</DialogTitle>
                          <DialogDescription>
                            Êtes-vous sûr de vouloir supprimer cet étudiant ? Cette action est irréversible.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                            Annuler
                          </Button>
                          <Button variant="destructive" onClick={() => handleDeleteStudent(student.id)}>
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
            <DialogTitle>Modifier l'étudiant</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'étudiant.
            </DialogDescription>
          </DialogHeader>
          {editingStudent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-nom">Nom</Label>
                  <Input
                    id="edit-nom"
                    value={editingStudent.nom}
                    onChange={(e) => setEditingStudent({ ...editingStudent, nom: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-prenom">Prénom</Label>
                  <Input
                    id="edit-prenom"
                    value={editingStudent.prenom}
                    onChange={(e) => setEditingStudent({ ...editingStudent, prenom: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingStudent.email}
                  onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-formation">Formation</Label>
                  <Input
                    id="edit-formation"
                    value={editingStudent.formation}
                    onChange={(e) => setEditingStudent({ ...editingStudent, formation: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-annee">Année</Label>
                  <Input
                    id="edit-annee"
                    value={editingStudent.annee}
                    onChange={(e) => setEditingStudent({ ...editingStudent, annee: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditStudent}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Students;
