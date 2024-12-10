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
import { Search, Plus, Building2, MapPin, Users as UsersIcon } from "lucide-react";
import { COMPANIES } from "@/lib/constants";
import { ProposalBuilder } from "./ProposalBuilder";
import { CompanyDetails } from "@/components/companies/CompanyDetails";

export function Companies() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = COMPANIES.filter(
    company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showBuilder) {
    return <ProposalBuilder preselectedCompany={selectedCompany} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Companies</h2>
          <p className="text-muted-foreground">
            Manage your hospital and healthcare facility accounts
          </p>
        </div>
        <Button className="gap-2">
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
              <TableRow key={company.id} className="cursor-pointer" onClick={() => setSelectedCompany(company)}>
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
                      <Badge key={dept} variant="secondary" className="text-xs">
                        {dept}
                      </Badge>
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
                    <div className="space-y-1">
                      {company.recentDeals.map((deal) => (
                        <div key={deal.id} className="text-sm">
                          <p className="font-medium">₹{(deal.amount / 100000).toFixed(2)}L</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(deal.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">No recent deals</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowBuilder(true);
                      setSelectedCompany(company);
                    }}
                  >
                    Create Proposal
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CompanyDetails
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
        onCreateProposal={() => {
          setShowBuilder(true);
        }}
      />
    </div>
  );
}