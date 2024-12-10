import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface Company {
  id?: string;
  name: string;
  location: string;
  type: string;
  size: string;
  departments: string[];
  contacts: {
    name: string;
    role: string;
    phone: string;
    email: string;
  }[];
}

interface AddEditCompanyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (companyData: Company) => void;
  company?: Company;
}

export function AddEditCompanyDialog({
  isOpen,
  onClose,
  onSave,
  company,
}: AddEditCompanyDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "",
    size: "",
    departments: "",
    contacts: [{ name: "", role: "", phone: "", email: "" }],
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name,
        location: company.location,
        type: company.type,
        size: company.size,
        departments: company.departments.join(", "),
        contacts: company.contacts.length > 0 ? company.contacts : [{ name: "", role: "", phone: "", email: "" }],
      });
    } else {
      setFormData({
        name: "",
        location: "",
        type: "",
        size: "",
        departments: "",
        contacts: [{ name: "", role: "", phone: "", email: "" }],
      });
    }
  }, [company]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const departments = formData.departments
      .split(",")
      .map((dept) => dept.trim())
      .filter(Boolean);

    const contacts = formData.contacts.filter((contact) => contact.name || contact.email);

    onSave({
      ...(company?.id ? { id: company.id } : {}),
      ...formData,
      departments,
      contacts,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (index: number, field: string, value: string) => {
    const newContacts = [...formData.contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      contacts: newContacts,
    }));
  };

  const addContact = () => {
    setFormData((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { name: "", role: "", phone: "", email: "" }],
    }));
  };

  const removeContact = (index: number) => {
    if (formData.contacts.length > 1) {
      const newContacts = formData.contacts.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        contacts: newContacts,
      }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{company ? "Edit Company" : "Add New Company"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="e.g. Hospital, Clinic"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="e.g. 100-500 beds"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="departments">Departments (comma-separated)</Label>
            <Input
              id="departments"
              name="departments"
              value={formData.departments}
              onChange={handleChange}
              placeholder="e.g. Cardiology, Neurology, Orthopedics"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Contacts</Label>
              <Button type="button" variant="outline" size="sm" onClick={addContact}>
                Add Contact
              </Button>
            </div>
            {formData.contacts.map((contact, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                {formData.contacts.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => removeContact(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={contact.name}
                      onChange={(e) => handleContactChange(index, "name", e.target.value)}
                      placeholder="Contact name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input
                      value={contact.role}
                      onChange={(e) => handleContactChange(index, "role", e.target.value)}
                      placeholder="Contact role"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={contact.phone}
                      onChange={(e) => handleContactChange(index, "phone", e.target.value)}
                      placeholder="Phone number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={contact.email}
                      onChange={(e) => handleContactChange(index, "email", e.target.value)}
                      placeholder="Email address"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Company</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
