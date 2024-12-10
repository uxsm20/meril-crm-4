import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { RightPanel } from "@/components/layout/RightPanel";
import { Dashboard } from "@/components/pages/Dashboard";
import { Companies } from "@/components/pages/Companies";
import { Products } from "@/components/pages/Products";
import { Contacts } from "@/components/pages/Contacts";
import { Proposals } from "@/components/pages/Proposals";

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'companies' | 'products' | 'contacts' | 'proposals'>('dashboard');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <RightPanel />
      
      <main className="xl:pr-80 pt-20">
        <div className="container px-6 py-8">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'companies' && <Companies />}
          {currentPage === 'products' && <Products />}
          {currentPage === 'contacts' && <Contacts />}
          {currentPage === 'proposals' && <Proposals />}
        </div>
      </main>
    </div>
  );
}

export default App;