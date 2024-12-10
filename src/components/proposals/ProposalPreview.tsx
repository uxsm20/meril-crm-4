import { Card, CardContent } from "@/components/ui/card";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { IndianRupee } from "lucide-react";

interface ProposalPreviewProps {
  data: any;
}

export function ProposalPreview({ data }: ProposalPreviewProps) {
  const categoryData = PRODUCT_CATEGORIES[data.category as keyof typeof PRODUCT_CATEGORIES];
  const totalAmount = data.products.reduce(
    (sum: number, product: any) => sum + product.quantity * product.price,
    0
  );

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold">{data.title}</h3>
            <p className="text-muted-foreground mt-1">
              Proposal for {data.hospital}
            </p>
          </div>

          <div className="grid gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Contact Information</h4>
              <p className="text-sm">{data.contact}</p>
              <p className="text-sm text-muted-foreground">{data.hospital}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Category</h4>
              <p className="text-sm">{categoryData?.title}</p>
              <p className="text-sm text-muted-foreground">
                {categoryData?.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Requirements</h4>
              <p className="text-sm whitespace-pre-wrap">{data.requirements}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-4">Selected Products</h4>
          <div className="space-y-4">
            {data.products.map((product: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div>
                  <p className="font-medium">{product.subcategory}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {product.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 font-medium">
                    <IndianRupee className="h-3 w-3" />
                    {product.price.toLocaleString("en-IN")}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total:{" "}
                    <span className="font-medium">
                      ₹{(product.quantity * product.price).toLocaleString("en-IN")}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg border bg-primary/5">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Amount</span>
              <div className="text-right">
                <div className="flex items-center gap-1 text-lg font-bold">
                  <IndianRupee className="h-4 w-4" />
                  {totalAmount.toLocaleString("en-IN")}
                </div>
                <p className="text-sm text-muted-foreground">
                  {(totalAmount / 100000).toFixed(2)}L INR
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}