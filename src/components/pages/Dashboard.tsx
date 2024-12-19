import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { ProductsGrid } from "@/components/dashboard/ProductsGrid";
import { PERFORMANCE_METRICS } from "@/lib/constants";
import { 
  PhoneCall, 
  CalendarCheck, 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  AlertCircle,
  Package,
  Building2,
  FileCheck,
  Clock
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/formatters";
import { proposalService } from "@/services/proposalService";
import { customerService } from "@/services/customerService";
import { productService } from "@/services/productService";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function Dashboard() {
  const navigate = useNavigate();
  const [recentProposals, setRecentProposals] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [keyCustomers, setKeyCustomers] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Load recent proposals
    const proposals = await proposalService.getProposals();
    setRecentProposals(proposals.slice(0, 5));

    // Load top products
    const products = await productService.getProducts();
    setTopProducts(products.slice(0, 5));

    // Load key customers
    const customers = await customerService.getCustomers();
    setKeyCustomers(customers.slice(0, 5));

    // Mock sales data for the chart
    setSalesData([
      { month: 'Jan', sales: 4000 },
      { month: 'Feb', sales: 3000 },
      { month: 'Mar', sales: 5000 },
      { month: 'Apr', sales: 4500 },
      { month: 'May', sales: 6000 },
      { month: 'Jun', sales: 5500 },
    ]);
  };

  return (
    <div className="mx-auto space-y-8">
      {/* Welcome Section */}
      <section className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, John</h2>
        <p className="text-muted-foreground text-lg">
          Here's what's happening with your medical device sales today.
        </p>
      </section>

      {/* Key Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Revenue"
          value={formatCurrency(15000000)}
          icon={<TrendingUp className="h-4 w-4 text-green-500" />}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricsCard
          title="Active Proposals"
          value="28"
          icon={<FileText className="h-4 w-4 text-blue-500" />}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricsCard
          title="Pending Deals"
          value="45"
          icon={<Clock className="h-4 w-4 text-orange-500" />}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricsCard
          title="Critical Orders"
          value="3"
          icon={<AlertCircle className="h-4 w-4 text-red-500" />}
          trend={{ value: 2, isPositive: false }}
        />
      </section>

      {/* Sales Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
          <CardDescription>Monthly sales performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Proposals */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Proposals</CardTitle>
              <Button variant="ghost" onClick={() => navigate('/proposals')}>View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {recentProposals.map((proposal) => (
                  <TableRow key={proposal.id} className="cursor-pointer hover:bg-gray-50" 
                           onClick={() => navigate(`/proposals/${proposal.id}`)}>
                    <TableCell>
                      <div className="font-medium">{proposal.customer.name}</div>
                      <div className="text-sm text-gray-500">{proposal.number}</div>
                    </TableCell>
                    <TableCell>{formatCurrency(proposal.total)}</TableCell>
                    <TableCell>
                      <Badge>{proposal.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Key Customers */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Key Customers</CardTitle>
              <Button variant="ghost" onClick={() => navigate('/customers')}>View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {keyCustomers.map((customer) => (
                  <TableRow key={customer.id} className="cursor-pointer hover:bg-gray-50"
                           onClick={() => navigate(`/customers/${customer.id}`)}>
                    <TableCell>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.type}</div>
                    </TableCell>
                    <TableCell>{formatCurrency(customer.totalRevenue)}</TableCell>
                    <TableCell>
                      <Badge variant={customer.healthScore >= 80 ? "success" : "warning"}>
                        {customer.healthScore}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Top Products</CardTitle>
            <Button variant="ghost" onClick={() => navigate('/products')}>View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProducts.map((product) => (
              <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/products/${product.id}`)}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <Badge>{product.status}</Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold">{formatCurrency(product.pricing.basePrice)}</p>
                    <p className="text-sm text-gray-500">Base Price</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}