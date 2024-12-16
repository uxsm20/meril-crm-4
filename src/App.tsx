import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Dashboard } from "./components/pages/Dashboard";
import { SalesPipeline } from "./components/pages/SalesPipeline";
import { Products } from "./components/pages/Products";
import { Customers } from "./components/pages/Customers";
import { CustomerDetail } from "./components/pages/CustomerDetail";
import { DealDetail } from "./components/pages/DealDetail";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <div className="max-w-8xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            <Route path="/customers/:customerId/deals/:dealId" element={<DealDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sales-pipeline" element={<SalesPipeline />} />
          </Routes>
        </div>
      </main>
      <Toaster />
    </div>
  );
}