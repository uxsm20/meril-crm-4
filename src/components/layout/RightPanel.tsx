import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { TODAY_ACTIVITIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ActivityDetails } from "./ActivityDetails";

export function RightPanel() {
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  return (
    <>
      <div className="hidden xl:flex h-[calc(100vh-5rem)] w-80 flex-col fixed right-0 top-20 border-l border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
              <div className="space-y-4">
                {TODAY_ACTIVITIES.map((activity) => (
                  <Card
                    key={activity.id}
                    className="p-4 bg-background/50 hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedActivity(activity)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "mt-1 rounded-full p-2",
                        activity.status === "upcoming" ? "bg-blue-500/10" : "bg-yellow-500/10"
                      )}>
                        <activity.icon className={cn(
                          "h-4 w-4",
                          activity.status === "upcoming" ? "text-blue-500" : "text-yellow-500"
                        )} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <div className="flex items-center gap-2">
                          <time className="text-xs text-muted-foreground">{activity.time}</time>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{activity.type}</span>
                        </div>
                      </div>
                      <div className={cn(
                        "h-2 w-2 rounded-full mt-2",
                        activity.status === "upcoming" ? "bg-blue-500" : "bg-yellow-500"
                      )} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <ActivityDetails
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        activity={selectedActivity}
      />
    </>
  );
}