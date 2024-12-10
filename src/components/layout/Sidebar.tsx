import { Button } from "@/components/ui/button";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "./Logo";

export function Sidebar() {
  return (
    <div className="hidden lg:flex h-screen w-80 flex-col fixed left-0 top-0 border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-20 items-center px-6 border-b border-border/40">
        <Logo />
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-8 py-6">
          <nav className="space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <Button
                key={item.title}
                variant="ghost"
                className="w-full justify-start gap-3"
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Button>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
}