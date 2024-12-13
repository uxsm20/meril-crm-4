import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Globe, Phone, Mail } from "lucide-react";
import { ContactsList } from "@/components/customers/ContactsList";
import { DealsList } from "@/components/customers/DealsList";

export function CustomerDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("contacts");

  // TODO: Replace with actual data fetching
  const customer = {
    id: "1",
    name: "Apollo Hospitals",
    type: "Hospital Chain",
    location: "Mumbai, Maharashtra",
    website: "www.apollohospitals.com",
    phone: "+91 22 1234 5678",
    email: "info@apollohospitals.com",
    departments: ["Cardiology", "Orthopedics", "Neurology"],
  };

  return (
    <div className="space-y-6">
      {/* Customer Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-2xl font-semibold">{customer.name}</h2>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {customer.location}
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {customer.website}
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-sm">
            {customer.type}
          </Badge>
        </div>

        <div className="mt-4 flex gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            {customer.phone}
          </div>
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            {customer.email}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1">
          {customer.departments.map((dept) => (
            <Badge key={dept} variant="secondary">
              {dept}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
        </TabsList>
        <TabsContent value="contacts" className="space-y-4">
          <ContactsList customerId={id} />
        </TabsContent>
        <TabsContent value="deals" className="space-y-4">
          <DealsList customerId={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
