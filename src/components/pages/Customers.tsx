import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export function Customers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // TODO: Replace with actual data fetching
  const customers = [
    {
      id: "1",
      name: "Apollo Hospitals",
      type: "Hospital Chain",
      location: "Mumbai, Maharashtra",
      departments: ["Cardiology", "Orthopedics", "Neurology"],
      totalContacts: 12,
      activeDeals: 3,
    },
    {
      id: "2",
      name: "Max Healthcare",
      type: "Multi-Specialty Hospital",
      location: "Delhi, NCR",
      departments: ["Oncology", "Cardiology", "Pediatrics"],
      totalContacts: 8,
      activeDeals: 2,
    },
  ];

  const filteredCustomers = customers.filter(
    customer =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage your hospital and healthcare facility accounts
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Departments</TableHead>
              <TableHead>Contacts</TableHead>
              <TableHead>Active Deals</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow 
                key={customer.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/customers/${customer.id}`)}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {customer.location}
                      </div>
                      <Badge variant="outline" className="mt-1">
                        {customer.type}
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {customer.departments.map((dept) => (
                      <Badge key={dept} variant="secondary">
                        {dept}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <UsersIcon className="h-3 w-3 text-muted-foreground" />
                    <span>{customer.totalContacts}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="default">
                    {customer.activeDeals} deals
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
