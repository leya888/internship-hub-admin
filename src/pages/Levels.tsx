
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface Class {
  id: number;
  name: string;
  level: string;
  specialization: string | null;
  description: string | null;
}

const LEVELS = ["1ere", "2eme", "3eme"] as const;
const SPECIALIZATIONS = {
  "1ere": ["TI"],
  "2eme": ["DSI", "MDW"],
  "3eme": ["DSI", "MDW"]
};

const Levels = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [activeTab, setActiveTab] = useState<string>("1ere");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>(SPECIALIZATIONS["1ere"]);
  const { toast } = useToast();
  
  const [newClass, setNewClass] = useState<Omit<Class, "id">>({
    name: "",
    level: "1ere",
    specialization: "TI",
    description: ""
  });
  
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  // Simulated data - in a real application, this would come from an API
  useEffect(() => {
    // Placeholder for API call
    const mockClasses: Class[] = [
      { id: 1, name: "TI-1", level: "1ere", specialization: "TI", description: "Première année" },
      { id: 2, name: "DSI-2-A", level: "2eme", specialization: "DSI", description: "Deuxième année DSI" },
      { id: 3, name: "MDW-2-A", level: "2eme", specialization: "MDW", description: "Deuxième année MDW" },
      { id: 4, name: "DSI-3-A", level: "3eme", specialization: "DSI", description: "Troisième année DSI" },
      { id: 5, name: "MDW-3-A", level: "3eme", specialization: "MDW", description: "Troisième année MDW" }
    ];
    setClasses(mockClasses);
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedSpecializations(SPECIALIZATIONS[value as keyof typeof SPECIALIZATIONS]);
  };

  const handleAddClass = () => {
    // Validate class name
    if (!newClass.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la classe est requis.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call
    const newId = Math.max(...classes.map((c) => c.id), 0) + 1;
    const classToAdd = { id: newId, ...newClass };
    setClasses([...classes, classToAdd]);
    setNewClass({
      name: "",
      level: activeTab as "1ere" | "2eme" | "3eme",
      specialization: selectedSpecializations[0],
      description: ""
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Classe ajoutée",
      description: "La classe a été ajoutée avec succès.",
    });
  };

  const handleEditClass = () => {
    if (editingClass) {
      setClasses(classes.map((c) => (c.id === editingClass.id ? editingClass : c)));
      setIsEditDialogOpen(false);
      toast({
        title: "Classe modifiée",
        description: "Les informations ont été mises à jour.",
      });
    }
  };

  const handleDeleteClass = (id: number) => {
    setClasses(classes.filter((c) => c.id !== id));
    setDeleteConfirmId(null);
    toast({
      title: "Classe supprimée",
      description: "La classe a été supprimée avec succès.",
      variant: "destructive",
    });
  };

  const filteredClasses = classes.filter(c => c.level === activeTab);

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Gestion des Niveaux</h1>
            <p className="text-muted-foreground">
              Gérez les classes par niveau d'étude.
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter une classe</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle classe</DialogTitle>
                <DialogDescription>
                  Veuillez remplir les informations de la classe.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom de la classe</Label>
                  <Input
                    id="name"
                    value={newClass.name}
                    onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Niveau</Label>
                  <Select
                    value={newClass.level}
                    onValueChange={(value) => {
                      const newSpecializations = SPECIALIZATIONS[value as keyof typeof SPECIALIZATIONS];
                      setNewClass({ 
                        ...newClass, 
                        level: value as "1ere" | "2eme" | "3eme",
                        specialization: newSpecializations[0] 
                      });
                      setSelectedSpecializations(newSpecializations);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Spécialisation</Label>
                  <Select
                    value={newClass.specialization || ""}
                    onValueChange={(value) => setNewClass({ ...newClass, specialization: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une spécialisation" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedSpecializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newClass.description || ""}
                    onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddClass}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="1ere">1ère année</TabsTrigger>
            <TabsTrigger value="2eme">2ème année</TabsTrigger>
            <TabsTrigger value="3eme">3ème année</TabsTrigger>
          </TabsList>
          
          {LEVELS.map((level) => (
            <TabsContent key={level} value={level} className="border rounded-md p-4">
              <h2 className="text-xl font-semibold mb-4">Classes {level}</h2>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Spécialisation</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClasses.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                          Aucune classe pour ce niveau. Ajoutez-en une !
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredClasses.map((cls) => (
                        <TableRow key={cls.id}>
                          <TableCell>{cls.name}</TableCell>
                          <TableCell>{cls.specialization}</TableCell>
                          <TableCell>{cls.description}</TableCell>
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
                                    setEditingClass(cls);
                                    setSelectedSpecializations(SPECIALIZATIONS[cls.level as keyof typeof SPECIALIZATIONS]);
                                    setIsEditDialogOpen(true);
                                  }}
                                >
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => setDeleteConfirmId(cls.id)}
                                >
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>

                            <Dialog open={deleteConfirmId === cls.id} onOpenChange={() => setDeleteConfirmId(null)}>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Confirmer la suppression</DialogTitle>
                                  <DialogDescription>
                                    Êtes-vous sûr de vouloir supprimer cette classe ? Cette action est irréversible.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                                    Annuler
                                  </Button>
                                  <Button variant="destructive" onClick={() => handleDeleteClass(cls.id)}>
                                    Supprimer
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la classe</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la classe.
            </DialogDescription>
          </DialogHeader>
          {editingClass && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nom de la classe</Label>
                <Input
                  id="edit-name"
                  value={editingClass.name}
                  onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-level">Niveau</Label>
                <Select
                  value={editingClass.level}
                  onValueChange={(value) => {
                    const newSpecializations = SPECIALIZATIONS[value as keyof typeof SPECIALIZATIONS];
                    setEditingClass({ 
                      ...editingClass, 
                      level: value as "1ere" | "2eme" | "3eme",
                      specialization: newSpecializations[0] 
                    });
                    setSelectedSpecializations(newSpecializations);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-specialization">Spécialisation</Label>
                <Select
                  value={editingClass.specialization || ""}
                  onValueChange={(value) => setEditingClass({ ...editingClass, specialization: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une spécialisation" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedSpecializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingClass.description || ""}
                  onChange={(e) => setEditingClass({ ...editingClass, description: e.target.value || null })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditClass}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Levels;
