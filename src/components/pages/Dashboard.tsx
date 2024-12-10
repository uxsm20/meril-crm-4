import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { ProductsGrid } from "@/components/dashboard/ProductsGrid";
import { PERFORMANCE_METRICS } from "@/lib/constants";
import { PhoneCall, CalendarCheck, FileText, CheckCircle } from "lucide-react";

export function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Welcome Section */}
      <section className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, Priya</h2>
        <p className="text-muted-foreground text-lg">
          Here's what's happening with your medical device sales today.
        </p>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title={PERFORMANCE_METRICS.LEADS_CONTACTED}
          value="124"
          icon={<PhoneCall className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricsCard
          title={PERFORMANCE_METRICS.MEETINGS_SCHEDULED}
          value="45"
          icon={<CalendarCheck className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricsCard
          title={PERFORMANCE_METRICS.PROPOSALS_SENT}
          value="28"
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 5, isPositive: false }}
        />
        <MetricsCard
          title={PERFORMANCE_METRICS.DEALS_CLOSED}
          value="12"
          icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 15, isPositive: true }}
        />
      </section>

      {/* Products Section */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold tracking-tight">
            Medical Device Categories
          </h3>
          <p className="text-muted-foreground text-lg">
            Browse and manage your product portfolio
          </p>
        </div>
        <ProductsGrid />
      </section>
    </div>
  );
}