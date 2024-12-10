import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  description: string;
  subcategories: Array<{ name: string; color: string }>;
  icon: React.ReactNode;
}

const getTagStyles = (color: string) => {
  const styles = {
    red: "bg-red-500/10 text-red-500 ring-red-500/20",
    pink: "bg-pink-500/10 text-pink-500 ring-pink-500/20",
    rose: "bg-rose-500/10 text-rose-500 ring-rose-500/20",
    blue: "bg-blue-500/10 text-blue-500 ring-blue-500/20",
    sky: "bg-sky-500/10 text-sky-500 ring-sky-500/20",
    indigo: "bg-indigo-500/10 text-indigo-500 ring-indigo-500/20",
    green: "bg-green-500/10 text-green-500 ring-green-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20",
    teal: "bg-teal-500/10 text-teal-500 ring-teal-500/20",
    purple: "bg-purple-500/10 text-purple-500 ring-purple-500/20",
    violet: "bg-violet-500/10 text-violet-500 ring-violet-500/20",
    fuchsia: "bg-fuchsia-500/10 text-fuchsia-500 ring-fuchsia-500/20",
  };
  return styles[color as keyof typeof styles] || styles.blue;
};

export function ProductCard({ title, description, subcategories, icon }: ProductCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="flex flex-row items-center gap-6 px-6 py-6">
        <div className="rounded-lg bg-primary/10 p-3">{icon}</div>
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