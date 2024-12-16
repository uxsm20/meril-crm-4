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
          "bg-blue-50 text-blue-700 ring-blue-700/10": variant === "info",
          // Category badge (light blue)
          "bg-blue-50 text-blue-700 ring-blue-700/10": variant === "category",
          // Department badge (light blue)
          "bg-blue-50 text-blue-700 ring-blue-700/10": variant === "department",
          // Count badge (light blue)
          "bg-blue-50 text-blue-700 ring-blue-700/10": variant === "count",
          // Feature badge (light blue)
          "bg-blue-50 text-blue-700 ring-blue-700/10": variant === "feature",
        },
        className
      )}
      {...props}
    />
  );
}
