import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

interface AIInsightsProps {
  formData: any;
}

export function AIInsights({ formData }: AIInsightsProps) {
  // Simulated AI insights based on form data
  const getInsights = () => {
    if (!formData.category || !formData.requirements) {
      return {
        score: 0,
        recommendations: [],
        opportunities: [],
        risks: [],
      };
    }

    return {
      score: 85,
      recommendations: [
        "Include clinical data from recent studies",
        "Highlight post-sale support services",
        "Add customized training program details",
      ],
      opportunities: [
        "Hospital planning department expansion",
        "Recent funding approval received",
        "Competitor contract ending in 2 months",
      ],
      risks: [
        "Budget constraints mentioned",
        "Long approval process expected",
        "Multiple stakeholder buy-in needed",
      ],
    };
  };

  const insights = getInsights();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Deal Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          {insights.score > 0 ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Deal Score</span>
                  <Badge
                    variant="outline"
                    className={
                      insights.score >= 80
                        ? "bg-green-500/10 text-green-500"
                        : insights.score >= 60
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-red-500/10 text-red-500"
                    }
                  >
                    {insights.score}%
                  </Badge>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${insights.score}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Recommendations</span>
                  </div>
                  <ul className="space-y-2">
                    {insights.recommendations.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Opportunities</span>
                  </div>
                  <ul className="space-y-2">
                    {insights.opportunities.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">Risk Factors</span>
                  </div>
                  <ul className="space-y-2">
                    {insights.risks.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Fill in the proposal details to get AI-powered insights
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}