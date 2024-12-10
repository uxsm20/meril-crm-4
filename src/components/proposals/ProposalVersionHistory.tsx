import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { History, ArrowLeft, ArrowRight, RotateCcw, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface VersionChange {
  type: "added" | "removed" | "modified";
  section: string;
  description: string;
}

interface Version {
  id: string;
  versionNumber: string;
  timestamp: string;
  editor: {
    name: string;
    avatar?: string;
  };
  changes: VersionChange[];
  comments?: {
    id: string;
    user: string;
    text: string;
    timestamp: string;
  }[];
}

// Mock data for demonstration
const MOCK_VERSIONS: Version[] = [
  {
    id: "v3",
    versionNumber: "1.2",
    timestamp: "2023-12-10T10:30:00",
    editor: {
      name: "Alex Thompson",
    },
    changes: [
      {
        type: "modified",
        section: "Pricing",
        description: "Updated equipment lease terms"
      },
      {
        type: "added",
        section: "Terms",
        description: "Added maintenance clause"
      }
    ],
    comments: [
      {
        id: "c1",
        user: "Legal Team",
        text: "New maintenance clause needs review",
        timestamp: "2023-12-10T10:35:00"
      }
    ]
  },
  {
    id: "v2",
    versionNumber: "1.1",
    timestamp: "2023-12-09T15:45:00",
    editor: {
      name: "Sarah Miller",
    },
    changes: [
      {
        type: "modified",
        section: "Product List",
        description: "Added optional accessories"
      }
    ]
  },
  {
    id: "v1",
    versionNumber: "1.0",
    timestamp: "2023-12-08T09:00:00",
    editor: {
      name: "John Doe",
    },
    changes: [
      {
        type: "added",
        section: "Initial Version",
        description: "Created proposal from template"
      }
    ]
  }
];

interface ProposalVersionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  proposalId: string;
}

export function ProposalVersionHistory({ isOpen, onClose, proposalId }: ProposalVersionHistoryProps) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  const handleVersionSelect = (versionId: string) => {
    setSelectedVersion(versionId);
  };

  const handleRevertVersion = (versionId: string) => {
    // TODO: Implement revert logic
    console.log("Reverting to version:", versionId);
  };

  const getChangeTypeColor = (type: VersionChange["type"]) => {
    switch (type) {
      case "added":
        return "bg-green-500/10 text-green-700";
      case "removed":
        return "bg-red-500/10 text-red-700";
      case "modified":
        return "bg-yellow-500/10 text-yellow-700";
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[600px] sm:max-w-[600px]">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Version History
            </SheetTitle>
          </div>
        </SheetHeader>

        <Tabs defaultValue="versions" className="mt-6">
          <TabsList>
            <TabsTrigger value="versions">Versions</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          <TabsContent value="versions" className="mt-4">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-4">
                {MOCK_VERSIONS.map((version) => (
                  <div
                    key={version.id}
                    className={cn(
                      "rounded-lg border p-4 transition-colors cursor-pointer hover:border-primary",
                      selectedVersion === version.id && "border-primary"
                    )}
                    onClick={() => handleVersionSelect(version.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">Version {version.versionNumber}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(version.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {version.editor.name}
                        </span>
                        {version.comments && version.comments.length > 0 && (
                          <Badge variant="secondary" className="gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {version.comments.length}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {version.changes.map((change, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "text-sm rounded-md p-2",
                            getChangeTypeColor(change.type)
                          )}
                        >
                          <span className="font-medium">{change.section}:</span>{" "}
                          {change.description}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="comments" className="mt-4">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-4">
                {MOCK_VERSIONS.map(
                  (version) =>
                    version.comments &&
                    version.comments.map((comment) => (
                      <div key={comment.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{comment.user}</span>
                          <time className="text-sm text-muted-foreground">
                            {new Date(comment.timestamp).toLocaleString()}
                          </time>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
