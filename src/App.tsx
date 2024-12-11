import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { RightPanel } from "@/components/layout/RightPanel";
import { Dashboard } from "@/components/pages/Dashboard";
import { Companies } from "@/components/pages/Companies";
import { Products } from "@/components/pages/Products";
import { Contacts } from "@/components/pages/Contacts";
import { Proposals } from "@/components/pages/Proposals";
import { SalesPipeline } from "@/components/pages/SalesPipeline";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <RightPanel />
        <main className="flex-1 xl:pr-80 pt-20">
          <div className="container px-6 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/proposals" element={<Proposals />} />
              <Route path="/pipeline" element={<SalesPipeline />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;