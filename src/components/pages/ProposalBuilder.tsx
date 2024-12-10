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

interface ProposalBuilderProps {
  preselectedCompany?: any;
  preselectedProduct?: any;
}

export function ProposalBuilder({ preselectedCompany, preselectedProduct }: ProposalBuilderProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    hospital: preselectedCompany?.name || "",
    contact: preselectedCompany?.contacts[0]?.name || "",
    category: preselectedProduct?.categoryKey || "",
    products: preselectedProduct ? [{
      subcategory: preselectedProduct.category,
      quantity: 1,
      price: preselectedProduct.price
    }] : [],
    requirements: "",
  });

  const debouncedTitle = useDebounce(formData.title, 500);

  useEffect(() => {
    if (debouncedTitle) {
      const suggestions = generateSuggestions(debouncedTitle);
      setFormData(prev => ({
        ...prev,
        ...suggestions,
        // Don't override preselected values
        hospital: prev.hospital || suggestions.hospital || "",
        contact: prev.contact || suggestions.contact || "",
        category: prev.category || suggestions.category || "",
        products: prev.products.length ? prev.products : suggestions.products || [],
      }));
    }
  }, [debouncedTitle]);

  useEffect(() => {
    if (formData.category && !formData.requirements) {
      const requirements = generateRequirements(formData.category);
      setFormData(prev => ({
        ...prev,
        requirements
      }));
    }
  }, [formData.category]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create New Proposal</h2>
        <p className="text-muted-foreground mt-2">
          Build a customized proposal with AI-powered insights
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`p-4 rounded-lg border ${
              step === i
                ? "bg-primary/10 border-primary"
                : "bg-background border-border"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  step === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i}
              </span>
              <span
                className={
                  step === i ? "font-medium" : "text-muted-foreground"
                }
              >
                {i === 1
                  ? "Basic Information"
                  : i === 2
                  ? "Product Selection"
                  : "Review & Generate"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Proposal Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="e.g., Cardiovascular Equipment Bundle for Apollo Hospitals"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="hospital">Hospital</Label>
                    <Input
                      id="hospital"
                      value={formData.hospital}
                      onChange={(e) =>
                        setFormData({ ...formData, hospital: e.target.value })
                      }
                      placeholder="e.g., Apollo Hospitals, Mumbai"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="contact">Contact Person</Label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      placeholder="e.g., Dr. Rajesh Mehta"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="category">Product Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(PRODUCT_CATEGORIES).map(([key, category]) => (
                          <SelectItem key={key} value={key}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) =>
                        setFormData({ ...formData, requirements: e.target.value })
                      }
                      placeholder="Describe the specific requirements and needs..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <ProductSelector
              category={formData.category}
              selectedProducts={formData.products}
              onProductsChange={(products) =>
                setFormData({ ...formData, products })
              }
            />
          )}

          {step === 3 && <ProposalPreview data={formData} />}

          <div className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button
              className="ml-auto"
              onClick={step === 3 ? undefined : handleNext}
            >
              {step === 3 ? "Generate Proposal" : "Next"}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <AIInsights formData={formData} />
        </div>
      </div>
    </div>
  );
}