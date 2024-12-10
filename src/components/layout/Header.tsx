import { Bell, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOCK_USER, NAVIGATION_ITEMS } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

interface HeaderProps {
  currentPage: 'dashboard' | 'companies' | 'products' | 'contacts' | 'proposals';
  onPageChange: (page: 'dashboard' | 'companies' | 'products' | 'contacts' | 'proposals') => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center space-x-1">
            {NAVIGATION_ITEMS.map((item) => (
              <Button
                key={item.title}
                variant="ghost"
                className={cn(
                  "gap-2",
                  currentPage === item.href.replace('/', '') && "bg-accent text-accent-foreground"
                )}
                onClick={() => onPageChange(item.href.replace('/', '') as any)}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {MOCK_USER.notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {MOCK_USER.notifications}
              </span>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
                  <AvatarFallback>PS</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium leading-none">{MOCK_USER.name}</p>
                  <p className="text-xs text-muted-foreground">{MOCK_USER.role}</p>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}