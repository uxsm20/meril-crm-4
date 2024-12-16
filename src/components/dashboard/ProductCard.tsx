import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  description: string;
  subcategories: Array<{ name: string; color: string }>;
  icon: React.ReactNode;
}

const getTagStyles = (color: string) => {
  // Always return blue style regardless of the color prop
  return "bg-blue-500/10 text-blue-500 ring-blue-500/20";
};

export function ProductCard({ title, description, subcategories, icon }: ProductCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="flex flex-row items-center gap-6 px-6 py-6">
        <div className="rounded-lg bg-blue-100 p-3">{icon}</div>
        <div>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          {subcategories.map((subcategory) => (
            <span
              key={subcategory.name}
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset",
                getTagStyles(subcategory.color)
              )}
            >
              {subcategory.name}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}