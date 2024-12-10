import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Package, IndianRupee } from "lucide-react";
import { PRODUCTS } from "@/lib/constants";
import { ProposalBuilder } from "./ProposalBuilder";

export function Products() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const allProducts = Object.entries(PRODUCTS).flatMap(([category, products]) =>
    products.map(product => ({
      ...product,
      categoryKey: category
    }))
  );

  const filteredProducts = allProducts.filter(
    product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showBuilder) {
    return <ProposalBuilder preselectedProduct={selectedProduct} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Browse and manage your medical device portfolio
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => setSelectedProduct(product)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">{product.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowBuilder(true);
                    setSelectedProduct(product);
                  }}
                >
                  Create Proposal
                </Button>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                {product.description}
              </p>

              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-1 font-medium">
                  <IndianRupee className="h-3 w-3" />
                  {product.price.toLocaleString("en-IN")}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}