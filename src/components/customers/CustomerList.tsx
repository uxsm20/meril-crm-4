import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import {
  MoreHorizontal,
  Search,
  Building2,
  Phone,
  Mail,
  MapPin,
  ArrowUpDown,
} from "lucide-react";
import { Customer, CustomerType, CustomerSegment } from "../../types/customer";
import { formatCurrency, formatDate } from "../../utils";
import { useNavigate } from "react-router-dom";

interface CustomerListProps {
  customers: Customer[];
  onEdit?: (customer: Customer) => void;
  onDelete?: (customerId: string) => void;
  onView?: (customer: Customer) => void;
}

type SortField = "name" | "type" | "segment" | "healthScore" | "totalRevenue" | "activeDeals";
type SortOrder = "asc" | "desc";

export function CustomerList({
  customers,
  onEdit,
  onDelete,
  onView,
}: CustomerListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<CustomerType | "all">("all");
  const [segmentFilter, setSegmentFilter] = useState<CustomerSegment | "all">("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const navigate = useNavigate();

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredAndSortedCustomers = useMemo(() => {
    let result = [...customers];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (customer) =>
          customer.name.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.phone.includes(query)
      );
    }

    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((customer) => customer.type === typeFilter);
    }

    // Apply segment filter
    if (segmentFilter !== "all") {
      result = result.filter((customer) => customer.segment === segmentFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "type":
          comparison = a.type.localeCompare(b.type);
          break;
        case "segment":
          comparison = a.segment.localeCompare(b.segment);
          break;
        case "healthScore":
          comparison = a.healthScore - b.healthScore;
          break;
        case "totalRevenue":
          comparison = a.totalRevenue - b.totalRevenue;
          break;
        case "activeDeals":
          comparison = a.activeDeals - b.activeDeals;
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [customers, searchQuery, typeFilter, segmentFilter, sortField, sortOrder]);

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getSegmentColor = (segment: CustomerSegment) => {
    switch (segment) {
      case "Enterprise":
        return "bg-purple-100 text-purple-800";
      case "Mid-Market":
        return "bg-blue-100 text-blue-800";
      case "Small Business":
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleRowClick = (customer: Customer) => {
    navigate(`/customers/${customer.id}`);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {/* Type Filter */}
          <Select
            value={typeFilter}
            onValueChange={(value) => setTypeFilter(value as CustomerType | "all")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Hospital">Hospital</SelectItem>
              <SelectItem value="Clinic">Clinic</SelectItem>
              <SelectItem value="Laboratory">Laboratory</SelectItem>
            </SelectContent>
          </Select>

          {/* Segment Filter */}
          <Select
            value={segmentFilter}
            onValueChange={(value) => setSegmentFilter(value as CustomerSegment | "all")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
              <SelectItem value="Mid-Market">Mid-Market</SelectItem>
              <SelectItem value="Small Business">Small Business</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1"
                >
                  Customer
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("type")}
                  className="flex items-center gap-1"
                >
                  Type
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("segment")}
                  className="flex items-center gap-1"
                >
                  Segment
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("healthScore")}
                  className="flex items-center gap-1"
                >
                  Health Score
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("totalRevenue")}
                  className="flex items-center gap-1"
                >
                  Total Revenue
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("activeDeals")}
                  className="flex items-center gap-1"
                >
                  Active Deals
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                onClick={() => handleRowClick(customer)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell>
                  <div className="font-medium">{customer.name}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {customer.address}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="h-3 w-3" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      {customer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    {customer.type}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getSegmentColor(customer.segment)}>
                    {customer.segment}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getHealthScoreColor(customer.healthScore)}>
                    {customer.healthScore}%
                  </Badge>
                </TableCell>
                <TableCell>{formatCurrency(customer.totalRevenue)}</TableCell>
                <TableCell>{customer.activeDeals}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onView?.(customer)}>
                        View Details
                      </DropdownMenuItem>
                      {onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(customer)}>
                          Edit Customer
                        </DropdownMenuItem>
                      )}
                      {onDelete && (
                        <DropdownMenuItem
                          onClick={() => onDelete(customer.id)}
                          className="text-red-600"
                        >
                          Delete Customer
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
