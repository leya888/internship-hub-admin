
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simuler une connexion réussie - à remplacer par un appel à l'API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Admin par défaut (à remplacer par une vérification réelle)
      if (email === "admin@example.com" && password === "admin123") {
        localStorage.setItem("isAuthenticated", "true");
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté",
        });
        navigate("/dashboard");
      } else {
        throw new Error("Identifiants invalides");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message || "Veuillez vérifier vos identifiants",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            StageManager
          </h1>
          <p className="text-violet-600/80">Système de Gestion des Stages</p>
        </div>
        
        <Card className="backdrop-blur-sm border-violet-100 shadow-lg shadow-violet-100/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              Connexion Administrateur
            </CardTitle>
            <CardDescription className="text-center text-violet-600/80">
              Entrez vos identifiants pour accéder au tableau de bord
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-violet-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="border-violet-100 focus:border-violet-300 focus:ring-violet-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-violet-700">
                  Mot de passe
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-violet-100 focus:border-violet-300 focus:ring-violet-200 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-400 hover:text-violet-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-md shadow-violet-200"
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-4 text-center text-sm text-violet-600/80">
          <p>
            Identifiants par défaut : admin@example.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
