import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Dashboard } from "./components/pages/Dashboard";
import { SalesPipeline } from "./components/pages/SalesPipeline";
import { Products } from "./components/pages/Products";
import { Customers } from "./components/pages/Customers";
import { CustomerDetail } from "./components/pages/CustomerDetail";
import { DealDetail } from "./components/pages/DealDetail";
import { CustomerPage } from "./components/pages/CustomerPage";
import { Toaster } from "./components/ui/toaster";
import { ProductCatalog } from "./components/pages/ProductCatalog";
import { ProductForm } from "./components/pages/ProductForm";
import { ProductDetails } from "./components/pages/ProductDetails";

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
            <Route path="/customers/:customerId" element={<CustomerPage />} />
            <Route path="/customers/:customerId/deals/:dealId" element={<DealDetail />} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/products/:productId/edit" element={<ProductForm />} />
            <Route path="/sales-pipeline" element={<SalesPipeline />} />
          </Routes>
        </div>
      </main>
      <Toaster />
    </div>
  );
}