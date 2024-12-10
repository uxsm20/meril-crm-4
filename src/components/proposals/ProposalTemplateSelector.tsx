import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Users, ArrowRight } from "lucide-react";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  lastUpdated: string;
  successRate?: number;
  tags: string[];
}

const MOCK_TEMPLATES: Template[] = [
  {
    id: "1",
    title: "Standard Equipment Lease – Hospitals",
    description: "Complete leasing agreement template for medical equipment, including maintenance terms and compliance requirements.",
    category: "Equipment",
    lastUpdated: "2023-12-01",
    successRate: 85,
    tags: ["Hospital", "Equipment", "Lease"]
  },
  {
    id: "2",
    title: "Software Implementation – Private Clinics",
    description: "Comprehensive software deployment proposal including training and support services.",
    category: "Software",
    lastUpdated: "2023-11-28",
    successRate: 92,
    tags: ["Software", "Clinic", "Implementation"]
  },
  {
    id: "3",
    title: "Medical Device Distribution Agreement",
    description: "Template for medical device distribution partnerships with healthcare facilities.",
    category: "Distribution",
    lastUpdated: "2023-12-05",
    tags: ["Distribution", "Medical Device"]
  }
];

interface ProposalTemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
  onCreateNew: () => void;
}

export function ProposalTemplateSelector({ isOpen, onClose, onSelectTemplate, onCreateNew }: ProposalTemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTemplates = MOCK_TEMPLATES.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(MOCK_TEMPLATES.map(t => t.category)));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Select a Proposal Template</DialogTitle>
            <Button variant="secondary" onClick={onCreateNew}>
              Create Blank Proposal
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex flex-col gap-6">
          {/* Search and filters */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Template grid */}
          <div className="grid grid-cols-2 gap-4">
            {filteredTemplates.map(template => (
              <Card key={template.id} className="relative group">
                <CardHeader>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    {template.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Updated {template.lastUpdated}</span>
                    </div>
                    {template.successRate && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{template.successRate}% success rate</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => onSelectTemplate(template)}
                  >
                    Use This Template
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
