
import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

// Types des stages
type InternshipType = "initiation" | "perfectionnement" | "pfe";

// Classes des étudiants
type StudentClass = "1TI" | "2DSI" | "2MDW" | "3DSI" | "3MDW";

// Définition d'un étudiant
interface Student {
  id: number;
  nom: string;
  prenom: string;
  classe: StudentClass;
  cin: string;
}

// Définition d'un enseignant
interface Teacher {
  id: number;
  nom: string;
  prenom: string;
  cin: string;
}

// Définition d'un stage
interface Internship {
  id: number;
  etudiant: string;
  enseignant1: string;
  enseignant2: string;
  salle: string;
  type?: InternshipType;
  etudiantId?: number;
}

// Données simulées pour les étudiants
const mockStudents: Student[] = [
  { id: 1, nom: "Dupont", prenom: "Marie", classe: "1TI", cin: "12345678" },
  { id: 2, nom: "Martin", prenom: "Lucas", classe: "1TI", cin: "23456789" },
  { id: 3, nom: "Bernard", prenom: "Emma", classe: "2DSI", cin: "34567890" },
  { id: 4, nom: "Petit", prenom: "Thomas", classe: "2MDW", cin: "45678901" },
  { id: 5, nom: "Laurent", prenom: "Sophie", classe: "2MDW", cin: "56789012" },
  { id: 6, nom: "Girard", prenom: "Paul", classe: "3DSI", cin: "67890123" },
  { id: 7, nom: "Leroy", prenom: "Julie", classe: "3MDW", cin: "78901234" },
  { id: 8, nom: "Moreau", prenom: "Antoine", classe: "3DSI", cin: "89012345" },
];

// Données simulées pour les enseignants
const mockTeachers: Teacher[] = [
  { id: 1, nom: "Dubois", prenom: "Philippe", cin: "11223344" },
  { id: 2, nom: "Moreau", prenom: "Jean", cin: "22334455" },
  { id: 3, nom: "Laurent", prenom: "Sophie", cin: "33445566" },
  { id: 4, nom: "Lefevre", prenom: "Amélie", cin: "44556677" },
  { id: 5, nom: "Garcia", prenom: "Michel", cin: "55667788" },
];

// Liste des salles disponibles
const availableRooms = [
  "B01", "B02", "B03", "B04", "B05", "B06",
  "B101", "B102", "B103", "B104", "B105", "B106", "B107"
];

// Données initiales des stages
const initialInternships: Internship[] = [
  {
    id: 1,
    etudiant: "Marie Dupont",
    enseignant1: "Philippe Dubois",
    enseignant2: "Sophie Laurent",
    salle: "B101",
    type: "initiation",
    etudiantId: 1
  },
  {
    id: 2,
    etudiant: "Lucas Martin",
    enseignant1: "Jean Moreau",
    enseignant2: "Amélie Lefevre",
    salle: "B02",
    type: "initiation",
    etudiantId: 2
  },
  {
    id: 3,
    etudiant: "Emma Bernard",
    enseignant1: "Philippe Dubois",
    enseignant2: "Sophie Laurent",
    salle: "B103",
    type: "perfectionnement",
    etudiantId: 3
  },
];

const Internships = () => {
  // État des stages
  const [internships, setInternships] = useState<Internship[]>(initialInternships);
  
  // État pour l'ajout d'un nouveau stage
  const [newInternship, setNewInternship] = useState<Partial<Internship>>({
    type: undefined,
    etudiantId: undefined,
    salle: "",
    enseignant1: "",
    enseignant2: "",
  });
  
  // État pour la liste filtrée d'étudiants basée sur le type de stage sélectionné
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  
  // États pour la modification et suppression de stages
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  
  const { toast } = useToast();

  // Filtre les étudiants en fonction du type de stage sélectionné
  useEffect(() => {
    if (newInternship.type) {
      let filtered: Student[] = [];
      switch (newInternship.type) {
        case "initiation":
          filtered = mockStudents.filter(student => student.classe === "1TI");
          break;
        case "perfectionnement":
          filtered = mockStudents.filter(student => 
            student.classe === "2DSI" || student.classe === "2MDW"
          );
          break;
        case "pfe":
          filtered = mockStudents.filter(student => 
            student.classe === "3DSI" || student.classe === "3MDW"
          );
          break;
        default:
          filtered = [];
      }
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  }, [newInternship.type]);

  // Sélectionne aléatoirement deux enseignants et une salle
  const assignRandomTeachersAndRoom = () => {
    // Mélange les enseignants et en sélectionne deux
    const shuffledTeachers = [...mockTeachers].sort(() => 0.5 - Math.random());
    const selectedTeachers = shuffledTeachers.slice(0, 2);
    
    // Mélange les salles et en sélectionne une
    const shuffledRooms = [...availableRooms].sort(() => 0.5 - Math.random());
    const selectedRoom = shuffledRooms[0];
    
    return {
      enseignant1: `${selectedTeachers[0].prenom} ${selectedTeachers[0].nom}`,
      enseignant2: `${selectedTeachers[1].prenom} ${selectedTeachers[1].nom}`,
      salle: selectedRoom
    };
  };

  // Gère la sélection d'un étudiant
  const handleStudentSelection = (studentId: number) => {
    const selectedStudent = mockStudents.find(s => s.id === Number(studentId));
    if (!selectedStudent) return;

    const { enseignant1, enseignant2, salle } = assignRandomTeachersAndRoom();

    setNewInternship({
      ...newInternship,
      etudiantId: selectedStudent.id,
      etudiant: `${selectedStudent.prenom} ${selectedStudent.nom}`,
      enseignant1,
      enseignant2,
      salle
    });
  };

  // Ajoute un nouveau stage
  const handleAddInternship = () => {
    if (!newInternship.etudiantId || !newInternship.type || !newInternship.salle) {
      toast({
        title: "Information incomplète",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...internships.map((i) => i.id), 0) + 1;
    setInternships([...internships, { id: newId, ...newInternship as Internship }]);
    
    // Réinitialisation du formulaire
    setNewInternship({
      type: undefined,
      etudiantId: undefined,
      salle: "",
      enseignant1: "",
      enseignant2: "",
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
              Gérez les soutenances de stages.
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter un stage</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau stage</DialogTitle>
                <DialogDescription>
                  Veuillez remplir les informations du stage.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type de stage</Label>
                  <Select
                    onValueChange={(value: InternshipType) => 
                      setNewInternship({ ...newInternship, type: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="initiation">Initiation</SelectItem>
                      <SelectItem value="perfectionnement">Perfectionnement</SelectItem>
                      <SelectItem value="pfe">PFE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {newInternship.type && (
                  <div className="space-y-2">
                    <Label htmlFor="student">Étudiant</Label>
                    <Select
                      onValueChange={(value) => handleStudentSelection(Number(value))}
                      disabled={filteredStudents.length === 0}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner un étudiant" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredStudents.map((student) => (
                          <SelectItem key={student.id} value={student.id.toString()}>
                            {student.prenom} {student.nom} ({student.classe})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {newInternship.etudiantId && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="enseignant1">Enseignant 1</Label>
                      <div className="p-2 border rounded-md bg-muted">
                        {newInternship.enseignant1}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="enseignant2">Enseignant 2</Label>
                      <div className="p-2 border rounded-md bg-muted">
                        {newInternship.enseignant2}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salle">Salle</Label>
                      <div className="p-2 border rounded-md bg-muted">
                        {newInternship.salle}
                      </div>
                    </div>
                  </>
                )}
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
                <TableHead>Type</TableHead>
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
                  <TableCell>{internship.type}</TableCell>
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
            <DialogTitle>Modifier le stage</DialogTitle>
            <DialogDescription>
              Modifiez les informations du stage.
            </DialogDescription>
          </DialogHeader>
          {editingInternship && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-etudiant">Étudiant</Label>
                <div className="p-2 border rounded-md bg-muted">
                  {editingInternship.etudiant}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-type">Type de stage</Label>
                <div className="p-2 border rounded-md bg-muted">
                  {editingInternship.type}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-enseignant1">Enseignant 1</Label>
                <Select
                  value={editingInternship.enseignant1}
                  onValueChange={(value) => setEditingInternship({ 
                    ...editingInternship, 
                    enseignant1: value 
                  })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTeachers.map((teacher) => (
                      <SelectItem 
                        key={teacher.id} 
                        value={`${teacher.prenom} ${teacher.nom}`}
                      >
                        {teacher.prenom} {teacher.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-enseignant2">Enseignant 2</Label>
                <Select
                  value={editingInternship.enseignant2}
                  onValueChange={(value) => setEditingInternship({ 
                    ...editingInternship, 
                    enseignant2: value 
                  })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTeachers.map((teacher) => (
                      <SelectItem 
                        key={teacher.id} 
                        value={`${teacher.prenom} ${teacher.nom}`}
                      >
                        {teacher.prenom} {teacher.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-salle">Salle</Label>
                <Select
                  value={editingInternship.salle}
                  onValueChange={(value) => setEditingInternship({ 
                    ...editingInternship, 
                    salle: value 
                  })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRooms.map((room) => (
                      <SelectItem key={room} value={room}>
                        {room}
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
            <Button onClick={handleEditInternship}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Internships;
