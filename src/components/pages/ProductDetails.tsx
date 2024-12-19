import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../types/product";
import { productService } from "../../services/productService";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useToast } from "../ui/use-toast";
import { formatCurrency } from "../../utils";
import {
  ArrowLeft,
  Package,
  Edit,
  FileText,
  BarChart,
  Settings,
  AlertTriangle,
} from "lucide-react";

export function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (productId) {
      loadProduct();
      loadRelatedProducts();
    }
  }, [productId]);

  const loadProduct = async () => {
    if (!productId) return;

    try {
      const data = await productService.getProduct(productId);
      setProduct(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load product details",
        variant: "destructive",
      });
      navigate("/products");
    }
  };

  const loadRelatedProducts = async () => {
    if (!productId) return;

    try {
      const data = await productService.getRelatedProducts(productId);
      setRelatedProducts(data);
    } catch (error) {
      console.error("Failed to load related products", error);
    }
  };

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Discontinued":
        return "bg-red-100 text-red-800";
      case "Coming Soon":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!product) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/products")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-muted-foreground" />
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{product.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{product.category}</Badge>
                <Badge className={getStatusColor(product.status)}>
                  {product.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <Button onClick={() => navigate(`/products/${product.id}/edit`)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Product
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 text-lg font-semibold mb-2">
            <BarChart className="h-5 w-5" />
            Pricing
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Base Price</div>
              <div className="text-2xl font-bold">
                {formatCurrency(product.pricing.basePrice)}
              </div>
            </div>
            {product.pricing.discountedPrice && (
              <div>
                <div className="text-sm text-muted-foreground">
                  Discounted Price
                </div>
                <div className="text-2xl font-bold">
                  {formatCurrency(product.pricing.discountedPrice)}
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 text-lg font-semibold mb-2">
            <Settings className="h-5 w-5" />
            Inventory
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">In Stock</div>
              <div className="text-2xl font-bold">{product.inventory.inStock}</div>
            </div>
            <div className="flex items-center gap-2">
              {product.inventory.inStock <= product.inventory.reorderPoint && (
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              )}
              <div className="text-sm text-muted-foreground">
                Reorder Point: {product.inventory.reorderPoint}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 text-lg font-semibold mb-2">
            <FileText className="h-5 w-5" />
            Documents
          </div>
          <div className="space-y-2">
            {product.documents.map((doc) => (
              <a
                key={doc.url}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 hover:bg-muted rounded-md"
              >
                <div className="font-medium">{doc.name}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {doc.type}
                </div>
              </a>
            ))}
          </div>
        </Card>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="related">Related Products</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <p className="text-muted-foreground whitespace-pre-line">
              {product.description}
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
            <div className="space-y-4">
              {product.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 border-b last:border-0"
                >
                  <div className="font-medium">{spec.key}</div>
                  <div className="text-muted-foreground">
                    {spec.value} {spec.unit}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="related" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="p-4 cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/products/${relatedProduct.id}`)}
              >
                <div className="flex items-center gap-3">
                  <Package className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{relatedProduct.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(relatedProduct.pricing.basePrice)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
