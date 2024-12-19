import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product, ProductCategory } from "../../types/product";
import { productService } from "../../services/productService";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";
import { ArrowLeft } from "lucide-react";

const categories: ProductCategory[] = [
  "Diagnostic Equipment",
  "Laboratory Supplies",
  "Medical Devices",
  "Consumables",
  "Software Solutions",
  "Services",
];

export function ProductForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!productId;

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "" as ProductCategory,
    status: "Active" as const,
    description: "",
    features: [""],
    specifications: [{ key: "", value: "", unit: "" }],
    pricing: {
      basePrice: 0,
      currency: "USD",
    },
    inventory: {
      inStock: 0,
      reorderPoint: 0,
      leadTime: 0,
    },
    images: [""],
  });

  useEffect(() => {
    if (isEditing) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    if (!productId) return;

    try {
      const product = await productService.getProduct(productId);
      if (product) {
        setFormData({
          name: product.name,
          sku: product.sku,
          category: product.category,
          status: product.status,
          description: product.description,
          features: product.features,
          specifications: product.specifications,
          pricing: product.pricing,
          inventory: product.inventory,
          images: product.images,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load product",
        variant: "destructive",
      });
      navigate("/products");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing && productId) {
        await productService.updateProduct(productId, formData);
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        await productService.createProduct(formData);
        toast({
          title: "Success",
          description: "Product created successfully",
        });
      }
      navigate("/products");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSpecificationChange = (
    index: number,
    field: keyof typeof formData.specifications[0],
    value: string
  ) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setFormData({ ...formData, specifications: newSpecs });
  };

  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { key: "", value: "", unit: "" }],
    });
  };

  const removeSpecification = (index: number) => {
    const newSpecs = formData.specifications.filter((_, i) => i !== index);
    setFormData({ ...formData, specifications: newSpecs });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/products")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {isEditing ? "Edit Product" : "Add Product"}
          </h2>
          <p className="text-muted-foreground">
            {isEditing
              ? "Update product information"
              : "Create a new product in the catalog"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">SKU</label>
                <Input
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={formData.category}
                  onValueChange={(value: ProductCategory) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Product["status"]) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Discontinued">Discontinued</SelectItem>
                    <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          <div className="space-y-4">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="Enter feature"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeFeature(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFeature}>
              Add Feature
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Specifications</h3>
          <div className="space-y-4">
            {formData.specifications.map((spec, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <Input
                  value={spec.key}
                  onChange={(e) =>
                    handleSpecificationChange(index, "key", e.target.value)
                  }
                  placeholder="Name"
                />
                <Input
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecificationChange(index, "value", e.target.value)
                  }
                  placeholder="Value"
                />
                <div className="flex gap-2">
                  <Input
                    value={spec.unit}
                    onChange={(e) =>
                      handleSpecificationChange(index, "unit", e.target.value)
                    }
                    placeholder="Unit"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeSpecification(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addSpecification}>
              Add Specification
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Pricing & Inventory</h3>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Base Price</label>
                <Input
                  type="number"
                  value={formData.pricing.basePrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: {
                        ...formData.pricing,
                        basePrice: parseFloat(e.target.value),
                      },
                    })
                  }
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Currency</label>
                <Select
                  value={formData.pricing.currency}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      pricing: { ...formData.pricing, currency: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">In Stock</label>
                <Input
                  type="number"
                  value={formData.inventory.inStock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      inventory: {
                        ...formData.inventory,
                        inStock: parseInt(e.target.value),
                      },
                    })
                  }
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Reorder Point</label>
                <Input
                  type="number"
                  value={formData.inventory.reorderPoint}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      inventory: {
                        ...formData.inventory,
                        reorderPoint: parseInt(e.target.value),
                      },
                    })
                  }
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Lead Time (days)</label>
                <Input
                  type="number"
                  value={formData.inventory.leadTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      inventory: {
                        ...formData.inventory,
                        leadTime: parseInt(e.target.value),
                      },
                    })
                  }
                  min="0"
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/products")}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
