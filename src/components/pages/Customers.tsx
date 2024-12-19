import { useState, useEffect } from "react";
import { Customer } from "../../types/customer";
import { CustomerList } from "../customers/CustomerList";
import { CustomerDetails } from "../customers/CustomerDetails";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { customerService } from "../../services/customerService";
import { useToast } from "../ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await customerService.getCustomers();
      setCustomers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load customers",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    setCustomerToDelete(customerId);
  };

  const confirmDelete = async () => {
    if (!customerToDelete) return;

    try {
      // TODO: Implement delete in customerService
      // await customerService.deleteCustomer(customerToDelete);
      setCustomers(customers.filter((c) => c.id !== customerToDelete));
      setCustomerToDelete(null);
      setSelectedCustomer(null);
      toast({
        title: "Success",
        description: "Customer deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive",
      });
    }
  };

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

      <CustomerList
        customers={customers}
        onView={setSelectedCustomer}
        onEdit={setSelectedCustomer}
        onDelete={handleDeleteCustomer}
      />

      {selectedCustomer && (
        <CustomerDetails
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onEdit={setSelectedCustomer}
          onDelete={handleDeleteCustomer}
        />
      )}

      <AlertDialog open={!!customerToDelete} onOpenChange={() => setCustomerToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the customer
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
