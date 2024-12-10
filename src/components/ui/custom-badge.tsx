import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "category" | "department" | "count" | "feature";
}

export function CustomBadge({
  variant = "info",
  className,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
        {
          // Info badge (light blue)
          "bg-sky-50 text-sky-700 ring-sky-700/10": variant === "info",
          // Category badge (light violet)
          "bg-violet-50 text-violet-700 ring-violet-700/10": variant === "category",
          // Department badge (light indigo)
          "bg-indigo-50 text-indigo-700 ring-indigo-700/10": variant === "department",
          // Count badge (light slate)
          "bg-slate-100 text-slate-700 ring-slate-700/10": variant === "count",
          // Feature badge (light emerald)
          "bg-emerald-50 text-emerald-700 ring-emerald-700/10": variant === "feature",
        },
        className
      )}
      {...props}
    />
  );
}
