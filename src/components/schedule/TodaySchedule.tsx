import { Calendar, Video, CheckSquare } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const SCHEDULE_ITEMS = [
  {
    title: "Meeting with Dr. Rajesh Mehta",
    time: "10:00 AM",
    type: "Video Call",
    icon: Video,
  },
  {
    title: "Follow-up: Orthopedic Proposal",
    time: "2:30 PM",
    type: "Task",
    icon: CheckSquare,
  },
];

export function TodaySchedule() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-600 hover:bg-gray-100 hidden md:flex"
        >
          <Calendar className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl font-semibold">
            <Calendar className="h-5 w-5 text-blue-500" />
            Today's Schedule
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {SCHEDULE_ITEMS.map((item, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <item.icon className="h-4 w-4 text-blue-500" />
                <span>{item.type}</span>
              </div>
              <div className="mt-2 text-sm font-medium text-gray-500">
                {item.time}
              </div>
            </Card>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
