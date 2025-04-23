import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface Student {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  cin: string;
  classe: string;
}

const CLASSES = [
  "1ère TI",
  "2ème DSI",
  "2ème MDW",
  "3ème DSI",
  "3ème MDW"
] as const;

const initialStudents: Student[] = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Marie",
    email: "marie.dupont@example.com",
    cin: "12345678",
    classe: "2ème DSI",
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Lucas",
    email: "lucas.martin@example.com",
    cin: "98765432",
    classe: "2ème MDW",
  },
  {
    id: 3,
    nom: "Bernard",
    prenom: "Emma",
    email: "emma.bernard@example.com",
    cin: "34567890",
    classe: "1ère TI",
  },
  {
    id: 4,
    nom: "Petit",
    prenom: "Thomas",
    email: "thomas.petit@example.com",
    cin: "56789012",
    classe: "3ème DSI",
  },
  {
    id: 5,
    nom: "Richard",
    prenom: "Chloé",
    email: "chloe.richard@example.com",
    cin: "78901234",
    classe: "2ème DSI",
  },
];

const Students = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [newStudent, setNewStudent] = useState<Omit<Student, "id">>({
    nom: "",
    prenom: "",
    email: "",
    cin: "",
    classe: "",
  });
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const { toast } = useToast();

  const validateCIN = (cin: string) => {
    return /^\d{8}$/.test(cin);
  };

  const isCINUnique = (cin: string, excludeId?: number) => {
    return !students.some(student => student.cin === cin && student.id !== excludeId);
  };

  const handleAddStudent = () => {
    if (!validateCIN(newStudent.cin)) {
      toast({
        title: "Erreur",
        description: "Le CIN doit contenir exactement 8 chiffres.",
        variant: "destructive",
      });
      return;
    }

    if (!isCINUnique(newStudent.cin)) {
      toast({
        title: "Erreur",
        description: "Ce CIN existe déjà.",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...students.map((s) => s.id), 0) + 1;
    setStudents([...students, { id: newId, ...newStudent }]);
    setNewStudent({ nom: "", prenom: "", email: "", cin: "", classe: "" });
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
              Gérez les étudiants de votre établissement.
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
                <div className="space-y-2">
                  <Label htmlFor="cin">CIN (8 chiffres)</Label>
                  <Input
                    id="cin"
                    value={newStudent.cin}
                    onChange={(e) => setNewStudent({ ...newStudent, cin: e.target.value })}
                    maxLength={8}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="classe">Classe</Label>
                  <Select
                    value={newStudent.classe}
                    onValueChange={(value) => setNewStudent({ ...newStudent, classe: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une classe" />
                    </SelectTrigger>
                    <SelectContent>
                      {CLASSES.map((classe) => (
                        <SelectItem key={classe} value={classe}>
                          {classe}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <TableHead>CIN</TableHead>
                <TableHead>Classe</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.nom}</TableCell>
                  <TableCell>{student.prenom}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.cin}</TableCell>
                  <TableCell>{student.classe}</TableCell>
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
              <div className="space-y-2">
                <Label htmlFor="edit-cin">CIN</Label>
                <Input
                  id="edit-cin"
                  value={editingStudent.cin}
                  onChange={(e) => setEditingStudent({ ...editingStudent, cin: e.target.value })}
                  maxLength={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-classe">Classe</Label>
                <Select
                  value={editingStudent.classe}
                  onValueChange={(value) => setEditingStudent({ ...editingStudent, classe: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une classe" />
                  </SelectTrigger>
                  <SelectContent>
                    {CLASSES.map((classe) => (
                      <SelectItem key={classe} value={classe}>
                        {classe}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
