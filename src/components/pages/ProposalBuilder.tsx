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
  preselectedTemplate?: any;
  preselectedProposal?: {
    id: string;
    title: string;
    hospital: string;
    contact: string;
    amount: number;
    status: string;
    lastUpdated: string;
    description: string;
    products: Array<{
      id: string;
      name: string;
      subcategory: string;
      quantity: number;
      price: number;
    }>;
  };
  onBack: () => void;
}

export function ProposalBuilder({ preselectedTemplate, preselectedProposal, onBack }: ProposalBuilderProps) {
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [proposal, setProposal] = useState({
    title: preselectedProposal?.title || preselectedTemplate?.title || "",
    description: preselectedProposal?.description || preselectedTemplate?.description || "",
    hospital: preselectedProposal?.hospital || "",
    contact: preselectedProposal?.contact || "",
    amount: preselectedProposal?.amount || 0,
    products: preselectedProposal?.products || [],
    tags: preselectedTemplate?.tags || [],
    category: preselectedTemplate?.category || ""
  });

  const title = isEditing ? proposal.title : (proposal.title || "New Proposal");
  const status = "Draft";

  const handleSave = () => {
    // TODO: Implement save logic
    setIsEditing(false);
  };

  const calculateTotalAmount = () => {
    return proposal.products.reduce((total, product) => total + (product.price * product.quantity), 0);
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
        proposalId={"new"}
      />

      <AddProductDialog
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onAddProduct={(product, quantity) => {
          setProposal({
            ...proposal,
            products: [
              ...proposal.products,
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
                  value={proposal.title}
                  onChange={(e) => setProposal({ ...proposal, title: e.target.value })}
                  placeholder="Enter proposal title"
                />
              ) : (
                <p className="text-muted-foreground">{proposal.title || "-"}</p>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Category</p>
              {isEditing ? (
                <Input
                  value={proposal.category}
                  onChange={(e) => setProposal({ ...proposal, category: e.target.value })}
                  placeholder="Enter category"
                />
              ) : (
                <p className="text-muted-foreground">{proposal.category || "-"}</p>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Hospital</p>
              {isEditing ? (
                <Input
                  value={proposal.hospital}
                  onChange={(e) => setProposal({ ...proposal, hospital: e.target.value })}
                  placeholder="Enter hospital name"
                />
              ) : (
                <p className="text-muted-foreground">{proposal.hospital || "-"}</p>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Contact Person</p>
              {isEditing ? (
                <Input
                  value={proposal.contact}
                  onChange={(e) => setProposal({ ...proposal, contact: e.target.value })}
                  placeholder="Enter contact person"
                />
              ) : (
                <p className="text-muted-foreground">{proposal.contact || "-"}</p>
              )}
            </div>
            <div className="col-span-2 space-y-1">
              <p className="text-sm font-medium">Description</p>
              {isEditing ? (
                <Textarea
                  value={proposal.description}
                  onChange={(e) => setProposal({ ...proposal, description: e.target.value })}
                  placeholder="Enter proposal description"
                  className="min-h-[100px]"
                />
              ) : (
                <p className="text-muted-foreground">{proposal.description || "-"}</p>
              )}
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {proposal.tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
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
                {proposal.products?.map((product: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => {
                            const newProducts = [...proposal.products];
                            newProducts[index] = { ...product, quantity: parseInt(e.target.value) };
                            setProposal({ ...proposal, products: newProducts });
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
                            const newProducts = proposal.products.filter((_, i) => i !== index);
                            setProposal({ ...proposal, products: newProducts });
                          }}
                        >
                          ×
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                {(!proposal.products || proposal.products.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={isEditing ? 4 : 3} className="text-center text-muted-foreground">
                      No products added
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              {proposal.products && proposal.products.length > 0 && (
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={isEditing ? 3 : 2}>Total</TableCell>
                    <TableCell className="text-right">
                      ₹{proposal.products
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
                value={proposal.requirements}
                onChange={(e) => setProposal({ ...proposal, requirements: e.target.value })}
                placeholder="Enter requirements"
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-muted-foreground whitespace-pre-wrap">
                {proposal.requirements || "No requirements specified"}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm font-medium mb-2">Products</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subcategory</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proposal.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.subcategory}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>₹{product.price.toLocaleString()}</TableCell>
                    <TableCell>₹{(product.price * product.quantity).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Total Amount</TableCell>
                  <TableCell>₹{calculateTotalAmount().toLocaleString()}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}