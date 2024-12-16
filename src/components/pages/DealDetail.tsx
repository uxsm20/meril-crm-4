import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeftIcon, CalendarIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { dealService } from "../../services/dealService";
import { Deal, Activity, Proposal, DealFile } from "../../types/deal";
import { ActivityForm } from "../deals/ActivityForm";
import { ProposalForm } from "../deals/ProposalForm";
import { DealForm } from "../deals/DealForm";
import { useToast } from "../ui/use-toast";

export function DealDetail() {
  const { customerId, dealId } = useParams();
  const { toast } = useToast();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [files, setFiles] = useState<DealFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activityFormOpen, setActivityFormOpen] = useState(false);
  const [proposalFormOpen, setProposalFormOpen] = useState(false);
  const [dealFormOpen, setDealFormOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();
  const [selectedProposal, setSelectedProposal] = useState<Proposal | undefined>();

  useEffect(() => {
    if (!customerId || !dealId) return;

    const fetchDealData = async () => {
      try {
        const [dealData, activitiesData, proposalsData, filesData] = await Promise.all([
          dealService.getDeal(customerId, dealId),
          dealService.getActivities(dealId),
          dealService.getProposals(dealId),
          dealService.getFiles(dealId),
        ]);

        setDeal(dealData);
        setActivities(activitiesData);
        setProposals(proposalsData);
        setFiles(filesData);
      } catch (error) {
        console.error('Error fetching deal data:', error);
        toast({
          title: "Error",
          description: "Failed to load deal data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDealData();
  }, [customerId, dealId]);

  const handleActivitySubmit = async (data: Partial<Activity>) => {
    if (!dealId) return;

    try {
      if (selectedActivity) {
        const updated = await dealService.updateActivity(dealId, selectedActivity.id, data);
        setActivities(activities.map(a => a.id === updated.id ? updated : a));
        toast({
          title: "Success",
          description: "Activity updated successfully",
        });
      } else {
        const created = await dealService.createActivity(dealId, data as Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>);
        setActivities([created, ...activities]);
        toast({
          title: "Success",
          description: "Activity created successfully",
        });
      }
    } catch (error) {
      console.error('Error submitting activity:', error);
      toast({
        title: "Error",
        description: "Failed to save activity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleProposalSubmit = async (data: Partial<Proposal>) => {
    if (!dealId) return;

    try {
      if (selectedProposal) {
        const updated = await dealService.updateProposal(dealId, selectedProposal.id, data);
        setProposals(proposals.map(p => p.id === updated.id ? updated : p));
        toast({
          title: "Success",
          description: "Proposal updated successfully",
        });
      } else {
        const created = await dealService.createProposal(dealId, data as Omit<Proposal, 'id' | 'createdAt' | 'lastModified'>);
        setProposals([created, ...proposals]);
        toast({
          title: "Success",
          description: "Proposal created successfully",
        });
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
      toast({
        title: "Error",
        description: "Failed to save proposal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDealSubmit = async (data: Partial<Deal>) => {
    if (!customerId || !dealId) return;

    try {
      const updated = await dealService.updateDeal(customerId, dealId, data);
      setDeal(updated);
      toast({
        title: "Success",
        description: "Deal updated successfully",
      });
    } catch (error) {
      console.error('Error updating deal:', error);
      toast({
        title: "Error",
        description: "Failed to update deal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!dealId || !event.target.files?.[0]) return;

    try {
      const file = event.target.files[0];
      const uploaded = await dealService.uploadFile(dealId, file);
      setFiles([uploaded, ...files]);
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading || !deal) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to={`/customers/${customerId}`}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Customer
          </Link>
          <h1 className="text-2xl font-bold">{deal.title}</h1>
          <Badge variant={deal.stage === "Proposal" ? "yellow" : "blue"}>
            {deal.stage}
          </Badge>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setDealFormOpen(true)}>
            Edit Deal
          </Button>
          <Button onClick={() => {
            setSelectedProposal(undefined);
            setProposalFormOpen(true);
          }}>
            Create Proposal
          </Button>
        </div>
      </div>

      {/* Deal Summary */}
      <Card className="p-6">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Deal Value</h3>
            <p className="mt-1 text-lg font-semibold">
              ${deal.value.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Probability</h3>
            <p className="mt-1 text-lg font-semibold">{deal.probability}%</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Expected Close</h3>
            <p className="mt-1 text-lg font-semibold">
              {new Date(deal.expectedCloseDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500">Description</h3>
          <p className="mt-1 text-gray-900">{deal.description}</p>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="activities" className="w-full">
        <TabsList>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Activities</h2>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedActivity(undefined);
                  setActivityFormOpen(true);
                }}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Schedule Activity
              </Button>
            </div>
            <div className="space-y-4">
              {activities.map((activity) => (
                <Card key={activity.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{activity.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {activity.type} • {new Date(activity.date).toLocaleDateString()}
                      </p>
                      <p className="mt-2 text-gray-700">{activity.notes}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedActivity(activity);
                        setActivityFormOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="proposals" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Proposals</h2>
              <Button onClick={() => {
                setSelectedProposal(undefined);
                setProposalFormOpen(true);
              }}>
                <DocumentIcon className="h-4 w-4 mr-2" />
                Create New Proposal
              </Button>
            </div>
            <div className="space-y-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        Proposal v{proposal.version}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {proposal.status} • Last modified{" "}
                        {new Date(proposal.lastModified).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedProposal(proposal);
                          setProposalFormOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="files" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Files & Documents</h2>
              <div>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" as="span">
                    Upload File
                  </Button>
                </label>
              </div>
            </div>
            {files.length > 0 ? (
              <div className="space-y-4">
                {files.map((file) => (
                  <Card key={file.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{file.name}</h3>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024).toFixed(2)} KB • Uploaded{" "}
                          {new Date(file.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" as="a" href={file.url} target="_blank">
                        Download
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6">
                <div className="text-center text-gray-500">
                  <DocumentIcon className="h-12 w-12 mx-auto" />
                  <p className="mt-2">No files uploaded yet</p>
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="mt-4" as="span">
                      Upload your first file
                    </Button>
                  </label>
                </div>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Forms */}
      <ActivityForm
        dealId={dealId!}
        activity={selectedActivity}
        isOpen={activityFormOpen}
        onClose={() => {
          setActivityFormOpen(false);
          setSelectedActivity(undefined);
        }}
        onSubmit={handleActivitySubmit}
      />

      <ProposalForm
        dealId={dealId!}
        proposal={selectedProposal}
        isOpen={proposalFormOpen}
        onClose={() => {
          setProposalFormOpen(false);
          setSelectedProposal(undefined);
        }}
        onSubmit={handleProposalSubmit}
      />

      <DealForm
        deal={deal}
        isOpen={dealFormOpen}
        onClose={() => setDealFormOpen(false)}
        onSubmit={handleDealSubmit}
      />
    </div>
  );
}
