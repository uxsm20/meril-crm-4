import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Search, Plus, Building2, MapPin, Users as UsersIcon } from "lucide-react";
import { COMPANIES } from "@/lib/constants";
import { ProposalBuilder } from "./ProposalBuilder";
import { CompanyDetails } from "@/components/companies/CompanyDetails";
import { AddEditCompanyDialog } from "@/components/companies/AddEditCompanyDialog";

export function Companies() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any>(null);
  const [companies, setCompanies] = useState(COMPANIES);

  const handleAddEditCompany = (companyData: any) => {
    if (companyData.id) {
      // Editing existing company
      setCompanies(companies.map(c => 
        c.id === companyData.id ? companyData : c
      ));
    } else {
      // Adding new company
      const newCompany = {
        ...companyData,
        id: (companies.length + 1).toString(),
        recentDeals: []
      };
      setCompanies([...companies, newCompany]);
    }
    setShowAddEdit(false);
    setEditingCompany(null);
  };

  const handleEdit = (company: any) => {
    setEditingCompany(company);
    setShowAddEdit(true);
  };

  const filteredCompanies = companies.filter(
    company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showBuilder) {
    return (
      <ProposalBuilder 
        preselectedCompany={selectedCompany}
        onBack={() => {
          setShowBuilder(false);
          setSelectedCompany(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Companies</h2>
          <p className="text-muted-foreground">
            Manage your hospital and healthcare facility accounts
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowAddEdit(true)}>
          <Plus className="h-4 w-4" />
          Add Company
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Departments</TableHead>
              <TableHead>Contacts</TableHead>
              <TableHead>Recent Deals</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{company.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {company.location}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {company.departments.map((dept) => (
                      <CustomBadge key={dept} variant="department">
                        {dept}
                      </CustomBadge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <UsersIcon className="h-3 w-3 text-muted-foreground" />
                    <span>{company.contacts.length}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {company.recentDeals.length > 0 ? (
                    <CustomBadge variant="count">
                      {company.recentDeals.length} deals
                    </CustomBadge>
                  ) : (
                    <span className="text-sm text-muted-foreground">No deals</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(company)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => {
                        setSelectedCompany(company);
                        setShowBuilder(true);
                      }}
                    >
                      Create Proposal
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CompanyDetails
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
        onCreateProposal={() => setShowBuilder(true)}
      />

      <AddEditCompanyDialog
        isOpen={showAddEdit}
        onClose={() => {
          setShowAddEdit(false);
          setEditingCompany(null);
        }}
        onSave={handleAddEditCompany}
        company={editingCompany}
      />
    </div>
  );
}