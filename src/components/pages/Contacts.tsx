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
import { Search, Plus, Building2, Phone, Mail } from "lucide-react";

const CONTACTS = [
  {
    id: 1,
    name: "Dr. Rajesh Mehta",
    role: "Chief Cardiologist",
    hospital: "Apollo Hospitals, Mumbai",
    department: "Cardiology",
    phone: "+91 98765 43210",
    email: "rajesh.mehta@apollo.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Anjali Desai",
    role: "Head of Orthopedics",
    hospital: "Fortis Hospital, Bangalore",
    department: "Orthopedics",
    phone: "+91 98765 43211",
    email: "anjali.desai@fortis.com",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Suresh Kumar",
    role: "Director of Surgery",
    hospital: "Lilavati Hospital, Mumbai",
    department: "Surgery",
    phone: "+91 98765 43212",
    email: "suresh.kumar@lilavati.com",
    status: "Inactive",
  },
] as const;

export function Contacts() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contacts</h2>
          <p className="text-muted-foreground">
            Manage your healthcare professional contacts
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CONTACTS.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.role}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-1">
                      <p className="text-sm">{contact.hospital}</p>
                      <p className="text-xs text-muted-foreground">{contact.department}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3" />
                      {contact.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3" />
                      {contact.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={contact.status === "Active" ? "default" : "secondary"}>
                    {contact.status}
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