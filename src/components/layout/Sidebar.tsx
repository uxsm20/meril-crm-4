import { Button } from "@/components/ui/button";
import { NAVIGATION_ITEMS } from "../navigation/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Building2, Package, Users, FileText, PieChart } from "lucide-react";

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden lg:flex h-screen w-80 flex-col fixed left-0 top-0 border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-20 items-center px-6 border-b border-border/40">
        <Logo />
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-8 py-6">
          <nav className="space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <Link key={item.label} to={item.href}>
                <Button
                  variant={location.pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
}