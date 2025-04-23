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

interface Teacher {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  cin: string;
}

const initialTeachers: Teacher[] = [
  {
    id: 1,
    nom: "Dubois",
    prenom: "Philippe",
    email: "philippe.dubois@example.com",
    cin: "12345678",
  },
  {
    id: 2,
    nom: "Laurent",
    prenom: "Sophie",
    email: "sophie.laurent@example.com",
    cin: "98765432",
  },
  {
    id: 3,
    nom: "Moreau",
    prenom: "Jean",
    email: "jean.moreau@example.com",
    cin: "32145678",
  },
  {
    id: 4,
    nom: "Lefevre",
    prenom: "Amélie",
    email: "amelie.lefevre@example.com",
    cin: "65432187",
  },
];

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [newTeacher, setNewTeacher] = useState<Omit<Teacher, "id">>({
    nom: "",
    prenom: "",
    email: "",
    cin: "",
  });
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const { toast } = useToast();

  const validateCIN = (cin: string) => {
    return /^\d{8}$/.test(cin);
  };

  const isCINUnique = (cin: string, excludeId?: number) => {
    return !teachers.some(teacher => teacher.cin === cin && teacher.id !== excludeId);
  };

  const handleAddTeacher = () => {
    if (!validateCIN(newTeacher.cin)) {
      toast({
        title: "Erreur",
        description: "Le CIN doit contenir exactement 8 chiffres.",
        variant: "destructive",
      });
      return;
    }

    if (!isCINUnique(newTeacher.cin)) {
      toast({
        title: "Erreur",
        description: "Ce CIN existe déjà.",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...teachers.map((t) => t.id), 0) + 1;
    setTeachers([...teachers, { id: newId, ...newTeacher }]);
    setNewTeacher({ nom: "", prenom: "", email: "", cin: "" });
    setIsAddDialogOpen(false);
    toast({
      title: "Enseignant ajouté",
      description: "L'enseignant a été ajouté avec succès.",
    });
  };

  const handleEditTeacher = () => {
    if (editingTeacher) {
      setTeachers(teachers.map((t) => (t.id === editingTeacher.id ? editingTeacher : t)));
      setIsEditDialogOpen(false);
      toast({
        title: "Enseignant modifié",
        description: "Les informations ont été mises à jour.",
      });
    }
  };

  const handleDeleteTeacher = (id: number) => {
    setTeachers(teachers.filter((t) => t.id !== id));
    setDeleteConfirmId(null);
    toast({
      title: "Enseignant supprimé",
      description: "L'enseignant a été supprimé avec succès.",
      variant: "destructive",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Enseignants</h1>
            <p className="text-muted-foreground">
              Gérez les enseignants de votre établissement.
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter un enseignant</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel enseignant</DialogTitle>
                <DialogDescription>
                  Veuillez remplir les informations de l'enseignant.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input
                      id="nom"
                      value={newTeacher.nom}
                      onChange={(e) => setNewTeacher({ ...newTeacher, nom: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input
                      id="prenom"
                      value={newTeacher.prenom}
                      onChange={(e) => setNewTeacher({ ...newTeacher, prenom: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cin">CIN (8 chiffres)</Label>
                  <Input
                    id="cin"
                    value={newTeacher.cin}
                    onChange={(e) => setNewTeacher({ ...newTeacher, cin: e.target.value })}
                    maxLength={8}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddTeacher}>Ajouter</Button>
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.nom}</TableCell>
                  <TableCell>{teacher.prenom}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.cin}</TableCell>
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
                            setEditingTeacher(teacher);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteConfirmId(teacher.id)}
                        >
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Dialog open={deleteConfirmId === teacher.id} onOpenChange={() => setDeleteConfirmId(null)}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirmer la suppression</DialogTitle>
                          <DialogDescription>
                            Êtes-vous sûr de vouloir supprimer cet enseignant ? Cette action est irréversible.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                            Annuler
                          </Button>
                          <Button variant="destructive" onClick={() => handleDeleteTeacher(teacher.id)}>
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
            <DialogTitle>Modifier l'enseignant</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'enseignant.
            </DialogDescription>
          </DialogHeader>
          {editingTeacher && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-nom">Nom</Label>
                  <Input
                    id="edit-nom"
                    value={editingTeacher.nom}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, nom: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-prenom">Prénom</Label>
                  <Input
                    id="edit-prenom"
                    value={editingTeacher.prenom}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, prenom: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingTeacher.email}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-cin">CIN</Label>
                <Input
                  id="edit-cin"
                  value={editingTeacher.cin}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, cin: e.target.value })}
                  maxLength={8}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditTeacher}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Teachers;
