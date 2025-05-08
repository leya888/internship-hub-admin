import { Routes, Route } from 'react-router-dom';
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Students from "@/pages/Students";
import Teachers from "@/pages/Teachers";
import Internships from "@/pages/Internships";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Levels from "@/pages/Levels";

function App() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/internships" element={<Internships />} />
      <Route path="/levels" element={<Levels />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
