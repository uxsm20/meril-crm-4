import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { ProductSelector } from "@/components/proposals/ProductSelector";
import { AIInsights } from "@/components/proposals/AIInsights";
import { ProposalPreview } from "@/components/proposals/ProposalPreview";
import { generateSuggestions, generateRequirements } from "@/lib/ai";
import { useDebounce } from "@/hooks/use-debounce";
import { History, ArrowLeft } from "lucide-react";
import { ProposalVersionHistory } from "../proposals/ProposalVersionHistory";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { AddProductDialog } from "../proposals/AddProductDialog";

interface ProposalBuilderProps {
  preselectedCompany?: any;
  preselectedProduct?: any;
  preselectedProposal?: any;
  onBack?: () => void;
}

export function ProposalBuilder({ preselectedCompany, preselectedProduct, preselectedProposal, onBack }: ProposalBuilderProps) {
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: preselectedProposal?.title || "",
    hospital: preselectedProposal?.hospital || "",
    contact: preselectedProposal?.contact || "",
    products: preselectedProposal?.products || [],
    requirements: preselectedProposal?.requirements || ""
  });

  const title = isEditing ? formData.title : (preselectedProposal?.title || "New Proposal");
  const status = preselectedProposal?.status || "Draft";

  const handleSave = () => {
    // TODO: Implement save logic
    setIsEditing(false);
  };

  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">
              {status} • Last saved 2 mins ago
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowVersionHistory(true)}
          >
            <History className="h-4 w-4" />
          </Button>
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Proposal</Button>
          )}
        </div>
      </div>

      <ProposalVersionHistory
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
        proposalId={preselectedProposal?.id || "new"}
      />

      <AddProductDialog
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onAddProduct={(product, quantity) => {
          setFormData({
            ...formData,
            products: [
              ...formData.products,
              {
                id: product.id,
                subcategory: product.name,
                quantity,
                price: product.price
              }
            ]
          });
        }}
        products={[
          {
            id: "1",
            name: "Cardiovascular Monitor",
            category: "Monitoring",
            description: "Advanced cardiovascular monitoring system",
            features: ["Real-time monitoring", "ECG", "Blood pressure"],
            price: 150000,
            categoryKey: "monitoring"
          },
          {
            id: "2",
            name: "Surgical Light",
            category: "Surgery",
            description: "High-intensity surgical lighting system",
            features: ["LED", "Adjustable intensity", "Shadow control"],
            price: 80000,
            categoryKey: "surgery"
          },
          {
            id: "3",
            name: "Patient Bed",
            category: "Furniture",
            description: "Electric hospital bed with adjustable positions",
            features: ["Electric controls", "Height adjustable", "Side rails"],
            price: 120000,
            categoryKey: "furniture"
          }
        ]}
      />

      <div className="mt-8 space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-sm font-medium">Title</p>
              {isEditing ? (
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter proposal title"
                />
              ) : (
                <p className="text-muted-foreground">{formData.title || "-"}</p>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Status</p>
              <Badge variant={status === "Draft" ? "secondary" : status === "Pending" ? "default" : "success"}>
                {status}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Hospital</p>
              {isEditing ? (
                <Input
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                  placeholder="Enter hospital name"
                />
              ) : (
                <p className="text-muted-foreground">{formData.hospital || "-"}</p>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Contact Person</p>
              {isEditing ? (
                <Input
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="Enter contact person"
                />
              ) : (
                <p className="text-muted-foreground">{formData.contact || "-"}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Products</h3>
            {isEditing && (
              <Button variant="outline" size="sm" onClick={() => setShowAddProduct(true)}>
                Add Product
              </Button>
            )}
          </div>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  {isEditing && <TableHead className="w-[100px]"></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.products?.map((product: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{product.subcategory}</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => {
                            const newProducts = [...formData.products];
                            newProducts[index] = { ...product, quantity: parseInt(e.target.value) };
                            setFormData({ ...formData, products: newProducts });
                          }}
                          className="w-20"
                        />
                      ) : (
                        product.quantity
                      )}
                    </TableCell>
                    <TableCell className="text-right">₹{product.price.toLocaleString()}</TableCell>
                    {isEditing && (
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            const newProducts = formData.products.filter((_, i) => i !== index);
                            setFormData({ ...formData, products: newProducts });
                          }}
                        >
                          ×
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                {(!formData.products || formData.products.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={isEditing ? 4 : 3} className="text-center text-muted-foreground">
                      No products added
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              {formData.products && formData.products.length > 0 && (
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={isEditing ? 3 : 2}>Total</TableCell>
                    <TableCell className="text-right">
                      ₹{formData.products
                        .reduce((total: number, p: any) => total + (p.price * p.quantity), 0)
                        .toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Requirements</h3>
          <div className="rounded-lg border p-4">
            {isEditing ? (
              <Textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="Enter requirements"
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-muted-foreground whitespace-pre-wrap">
                {formData.requirements || "No requirements specified"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}