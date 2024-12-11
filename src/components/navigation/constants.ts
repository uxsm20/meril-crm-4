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
    label: "Companies",
    title: "Companies",
    href: "/companies"
  },
  {
    icon: Package,
    label: "Products",
    title: "Products",
    href: "/products"
  },
  {
    icon: Users,
    label: "Contacts",
    title: "Contacts",
    href: "/contacts"
  },
  {
    icon: FileText,
    label: "Proposals",
    title: "Proposals",
    href: "/proposals"
  },
  {
    icon: PieChart,
    label: "Sales Pipeline",
    title: "Sales Pipeline",
    href: "/pipeline"
  }
];
