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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";
import { NAVIGATION_ITEMS } from "../navigation/constants";
import { TodaySchedule } from "../schedule/TodaySchedule";

const MOCK_USER = {
  name: "John Smith",
  role: "Admin",
  avatar: "https://github.com/shadcn.png",
  notifications: 3
};

export function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <Logo />
            <nav className="hidden md:flex items-center space-x-1">
              {NAVIGATION_ITEMS.map((item) => (
                <Link key={item.title} to={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "gap-2",
                      location.pathname === item.href 
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    <item.icon className={cn(
                      "h-4 w-4",
                      location.pathname === item.href 
                        ? "text-blue-500"
                        : "text-gray-500"
                    )} />
                    {item.title}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => {/* Add mobile menu handler */}}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <TodaySchedule />

            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-gray-600 hover:bg-gray-100 hidden md:flex"
            >
              <Bell className="h-5 w-5" />
              {MOCK_USER.notifications > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                  {MOCK_USER.notifications}
                </span>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-3 px-3 hover:bg-gray-100"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium leading-none text-gray-900">
                      {MOCK_USER.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {MOCK_USER.role}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-white border border-gray-200"
              >
                <DropdownMenuLabel className="text-gray-700">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                  Team
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem className="text-red-500 hover:bg-red-50">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}