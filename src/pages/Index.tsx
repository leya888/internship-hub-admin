
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-primary mb-4">StageManager</h1>
          <p className="text-xl text-gray-600">
            Plateforme de gestion des stages pour les établissements d'enseignement
          </p>
        </div>
        
        <div className="space-y-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Simplifiez la gestion des stages</h2>
            <p className="text-gray-600 mb-4">
              Notre application vous permet de gérer facilement les étudiants, les enseignants et les stages
              dans une interface intuitive et complète.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate("/login")} 
                className="px-8"
              >
                Connexion Administrateur
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Gestion des Étudiants</h3>
            <p className="text-gray-600">
              Suivez les informations et les parcours de vos étudiants.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Gestion des Enseignants</h3>
            <p className="text-gray-600">
              Organisez les responsabilités et les spécialités de vos enseignants.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Gestion des Stages</h3>
            <p className="text-gray-600">
              Gérez les offres, les attributions et les suivis des stages.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          <p>StageManager - Votre solution complète pour la gestion des stages</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
