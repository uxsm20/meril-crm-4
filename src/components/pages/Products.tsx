import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Search, Plus, Package, IndianRupee } from "lucide-react";
import { AddProductDialog } from "../products/AddProductDialog";
import { ProposalBuilder } from "./ProposalBuilder";

const INITIAL_PRODUCTS = [
  {
    id: "1",
    name: "Myval™ THV System",
    category: "Transcatheter Heart Valves",
    description: "Next-generation transcatheter heart valve system",
    features: [
      "Unique hybrid honeycomb cell design",
      "Navigator™ delivery system",
      "Optimal radial strength"
    ],
    price: 250000
  },
  {
    id: "2",
    name: "Nexgen™ Coronary Stent",
    category: "Coronary Stents",
    description: "Advanced drug-eluting coronary stent system",
    features: [
      "Biodegradable polymer",
      "Thin strut design",
      "Rapid endothelialization"
    ],
    price: 35000
  },
  {
    id: "3",
    name: "Freedom™ Total Knee System",
    category: "Joint Reconstruction",
    description: "Comprehensive total knee replacement system",
    features: [
      "Anatomically optimized design",
      "Advanced bearing materials",
      "Precision instrumentation"
    ],
    price: 120000
  }
];

export function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showProposalBuilder, setShowProposalBuilder] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleAddProduct = (productData: any) => {
    if (productData.id) {
      // Editing existing product
      setProducts(products.map(p => 
        p.id === productData.id ? productData : p
      ));
    } else {
      // Adding new product
      const newProduct = {
        ...productData,
        id: (products.length + 1).toString()
      };
      setProducts([...products, newProduct]);
    }
    setShowAddDialog(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowAddDialog(true);
  };

  const handleCloseDialog = () => {
    setShowAddDialog(false);
    setEditingProduct(null);
  };

  const handleCreateProposal = (product: any) => {
    setSelectedProduct(product);
    setShowProposalBuilder(true);
  };

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showProposalBuilder) {
    return (
      <ProposalBuilder 
        preselectedProduct={selectedProduct}
        onBack={() => {
          setShowProposalBuilder(false);
          setSelectedProduct(null);
        }}
      />
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Browse and manage your medical device portfolio
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">{product.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(product);
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreateProposal(product);
                    }}
                  >
                    Create Proposal
                  </Button>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                {product.description}
              </p>

              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, index) => (
                    <CustomBadge key={index} variant="feature">
                      {feature}
                    </CustomBadge>
                  ))}
                </div>

                <div className="flex items-center gap-1 font-medium">
                  <IndianRupee className="h-4 w-4" />
                  {product.price.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <AddProductDialog
        isOpen={showAddDialog}
        onClose={handleCloseDialog}
        onSave={handleAddProduct}
        product={editingProduct}
      />
    </div>
  );
}