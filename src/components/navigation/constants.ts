import { LayoutDashboard, Building2, Package, Users, FileText, PieChart } from "lucide-react";

export const NAVIGATION_ITEMS = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    icon: Building2,
    label: "Customers",
    title: "Customers",
    href: "/customers"
  },
  {
    icon: Package,
    label: "Products",
    title: "Products",
    href: "/products"
  },
  {
    icon: PieChart,
    label: "Sales Pipeline",
    title: "Sales Pipeline",
    href: "/sales-pipeline"
  }
];
