import { HeartPulse } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 animate-pulse rounded-lg bg-primary/20" />
        <HeartPulse className="h-8 w-8 text-primary relative" />
      </div>
      <div className="font-semibold text-xl tracking-tight">
        Meril<span className="text-primary">Life</span>
      </div>
    </div>
  );
}