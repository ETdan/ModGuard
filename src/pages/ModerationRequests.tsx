import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import ModerationBadge from "@/components/ModerationBadge";
import { Check, Edit, FileText, X } from "lucide-react";
import {
  fetchRequestData,
  updateRequestData,
  deleteRequestData,
} from "@/services/supabase";

type ModerationType =
  | "toxicity"
  | "harassment"
  | "hate-speech"
  | "sexual"
  | "violence"
  | "spam";

// New type for the single flag object
type FlagObject = {
  type: ModerationType;
  score: number;
  flagged: boolean;
};

type ModerationRequest = {
  id: string;
  timestamp: string;
  content_type: "text" | "image";
  content: string;
  flags?: FlagObject;
  status: "flagged" | "clean" | "borderline";
  feedback?: string;
};

export default function ModerationRequests() {
  const [requests, setRequests] = useState<ModerationRequest[]>([]);
  // const [expandedRow, setExpandedRow] = useState<string | null>(null); // Not used in the provided code, can be removed if not needed elsewhere
  const [currentRequest, setCurrentRequest] =
    useState<ModerationRequest | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await fetchRequestData();
        // console.log("Fetched requests:", data); // Useful for debugging the new structure
        setRequests(data as ModerationRequest[]); // Assuming fetchRequestData returns the correct new structure
      } catch (error) {
        console.error("Fetch error:", error);
        toast({
          title: "Error fetching requests",
          description: "Failed to fetch moderation requests from the server.",
          variant: "destructive",
        });
      }
    };

    fetchRequests();
  }, []);

  const handleEditRequest = (request: ModerationRequest) => {
    setCurrentRequest(request);
    setEditMode(true);
    setFeedbackText(request.feedback || "");
  };

  const handleDeleteRequest = async (requestId: string) => {
    try {
      // Assuming you have a function to delete the request from the server
      await deleteRequestData(requestId); // Implement this function in your service layer
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
      toast({
        title: "Request deleted",
        description: `Moderation request ${requestId} has been deleted.`,
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error deleting request",
        description: "Failed to delete the moderation request.",
        variant: "destructive",
      });
    }
  };

  // Updated: Toggles the 'flagged' status of the single 'flags' object
  const toggleCurrentRequestFlag = () => {
    if (!currentRequest || !currentRequest.flags) {
      // If there are no flags on the current request, we can't toggle it.
      // Optionally, one could initialize a default flag object here if needed.
      console.warn(
        "Attempted to toggle flag on a request with no flags object."
      );
      return;
    }

    setCurrentRequest((prevRequest) => {
      if (!prevRequest || !prevRequest.flags) return prevRequest; // Should ideally not happen if initial check passed
      return {
        ...prevRequest,
        flags: {
          ...prevRequest.flags,
          flagged: !prevRequest.flags.flagged,
        },
      };
    });
  };

  const handleSaveChanges = async () => {
    if (!currentRequest) return;

    // Updated: Calculate new status based on the single flag object
    const isFlagged = currentRequest.flags
      ? currentRequest.flags.flagged
      : false;
    // This logic might override a 'borderline' status if the flag is toggled.
    // If 'borderline' needs to be preserved or set under other conditions, this logic might need adjustment.
    const newStatus = isFlagged ? "flagged" : "clean";

    const updatedRequest: ModerationRequest = {
      ...currentRequest,
      feedback: feedbackText || undefined,
      // currentRequest.flags already contains the latest toggled state
    };

    try {
      await updateRequestData(updatedRequest.id, updatedRequest);
      setRequests((prev) =>
        prev.map((req) => (req.id === updatedRequest.id ? updatedRequest : req))
      );
      setEditMode(false); // Keep dialog open, user can close it or make further edits.
      // Or, if preferred, close dialog: find the Dialog's open/onOpenChange prop and control it.
      // For simplicity, current behavior (dialog stays open) is maintained.
      setCurrentRequest(updatedRequest); // Ensure currentRequest reflects the saved state

      toast({
        title: "Request updated",
        description: `Moderation request ${updatedRequest.id} has been updated.`,
      });
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error updating request",
        description: "Failed to update the moderation request.",
        variant: "destructive",
      });
    }
  };

  const filteredRequests = requests.filter((request) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      request.id.toLowerCase().includes(searchLower) ||
      request.content.toLowerCase().includes(searchLower) ||
      request.status.toLowerCase().includes(searchLower) ||
      // Updated: Search in the single flag object's type
      (request.flags && request.flags.type.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Moderation Requests
              </h1>
              <p className="text-muted-foreground">
                View and manage your content moderation requests
              </p>
            </div>

            <div className="mt-4 md:mt-0 w-full md:w-64">
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base font-medium">
                Request History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Content Type</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Flags</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <React.Fragment key={request.id}>
                        <TableRow>
                          <TableCell className="font-mono text-xs">
                            {request.id}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {new Date(request.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {request.content_type == "text" ? (
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                <FileText className="h-3 w-3" />
                                <span>Text</span>
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                <FileText className="h-3 w-3" />{" "}
                                {/* Consider using an Image icon here */}
                                <span>Image</span>
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {request.content}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                request.status === "flagged"
                                  ? "destructive"
                                  : request.status === "borderline"
                                  ? "secondary"
                                  : "default"
                              }
                            >
                              {request.status.charAt(0).toUpperCase() +
                                request.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1 flex-wrap">
                              {/* Updated: Display single flag if it exists and is flagged */}
                              {request.flags && request.flags.flagged && (
                                <ModerationBadge
                                  type={request.flags.type}
                                  score={request.flags.score}
                                  showScore={false}
                                />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditRequest(request)}
                                    className="flex items-center gap-1"
                                  >
                                    <Edit className="h-3 w-3" />
                                    <span className="sr-only md:not-sr-only">
                                      Edit
                                    </span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      {editMode
                                        ? "Edit Moderation Request"
                                        : "Moderation Request Details"}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Request ID: {currentRequest?.id}
                                    </DialogDescription>
                                  </DialogHeader>

                                  {currentRequest && (
                                    <div className="space-y-6 py-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label className="text-muted-foreground text-sm">
                                            Timestamp
                                          </Label>
                                          <div className="font-medium">
                                            {new Date(
                                              currentRequest.timestamp
                                            ).toLocaleString()}
                                          </div>
                                        </div>
                                        <div>
                                          <Label className="text-muted-foreground text-sm">
                                            Content Type
                                          </Label>
                                          <div className="font-medium">
                                            {currentRequest.content_type ===
                                            "text"
                                              ? "Text"
                                              : "Image"}
                                          </div>
                                        </div>
                                      </div>

                                      <div>
                                        <Label className="text-muted-foreground text-sm">
                                          Content
                                        </Label>
                                        <div className="mt-1 p-3 bg-muted rounded-md">
                                          {currentRequest.content_type ===
                                          "text" ? (
                                            <p className="whitespace-pre-wrap">
                                              {currentRequest.content}
                                            </p>
                                          ) : (
                                            <div className="text-center p-8 bg-muted/50 border border-dashed border-muted-foreground/50 rounded-md">
                                              <p className="text-muted-foreground">
                                                Image preview not available
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      {/* Updated: Display details for the single flag object */}
                                      {currentRequest.flags ? (
                                        <div>
                                          <Label className="text-muted-foreground text-sm mb-2 block">
                                            Content Flag
                                          </Label>
                                          <div className="space-y-4">
                                            {(() => {
                                              // IIFE to use const for flag
                                              const flag =
                                                currentRequest.flags!;
                                              return (
                                                <div className="flex items-center justify-between">
                                                  <div className="flex items-center gap-2">
                                                    {editMode ? (
                                                      <Checkbox
                                                        id={`flag-${flag.type}`}
                                                        checked={flag.flagged}
                                                        onCheckedChange={
                                                          toggleCurrentRequestFlag
                                                        }
                                                      />
                                                    ) : flag.flagged ? (
                                                      <div className="h-4 w-4 rounded-sm bg-destructive flex items-center justify-center">
                                                        <Check className="h-3 w-3 text-white" />
                                                      </div>
                                                    ) : (
                                                      <div className="h-4 w-4 rounded-sm border border-border" />
                                                    )}
                                                    <Label
                                                      htmlFor={`flag-${flag.type}`}
                                                      className={`cursor-pointer ${
                                                        !editMode
                                                          ? "pointer-events-none"
                                                          : ""
                                                      }`}
                                                    >
                                                      <ModerationBadge
                                                        type={flag.type}
                                                        showScore={false}
                                                      />
                                                    </Label>
                                                  </div>

                                                  <div className="flex items-center gap-2">
                                                    <div className="w-full bg-muted rounded-full h-2 min-w-[100px]">
                                                      <div
                                                        className={`h-2 rounded-full ${
                                                          flag.score > 0.8
                                                            ? "bg-destructive"
                                                            : flag.score > 0.6
                                                            ? "bg-amber-500"
                                                            : "bg-green-500"
                                                        }`}
                                                        style={{
                                                          width: `${Math.round(
                                                            flag.score * 100
                                                          )}%`,
                                                        }}
                                                      ></div>
                                                    </div>
                                                    <span className="text-sm font-medium w-12 text-right">
                                                      {Math.round(
                                                        flag.score * 100
                                                      )}
                                                      %
                                                    </span>
                                                  </div>
                                                </div>
                                              );
                                            })()}
                                          </div>
                                        </div>
                                      ) : (
                                        <div>
                                          <Label className="text-muted-foreground text-sm mb-2 block">
                                            Content Flag
                                          </Label>
                                          <p className="text-muted-foreground text-sm">
                                            No flag data for this request.
                                          </p>
                                        </div>
                                      )}

                                      <div>
                                        <Label
                                          htmlFor="feedback"
                                          className="text-muted-foreground text-sm"
                                        >
                                          Feedback / Notes
                                        </Label>
                                        {editMode ? (
                                          <Textarea
                                            id="feedback"
                                            placeholder="Add optional feedback or notes about this moderation decision..."
                                            value={feedbackText}
                                            onChange={(e) =>
                                              setFeedbackText(e.target.value)
                                            }
                                            rows={3}
                                            className="mt-1"
                                          />
                                        ) : (
                                          <div className="mt-1 p-3 bg-muted rounded-md min-h-[80px]">
                                            {currentRequest.feedback || (
                                              <span className="text-muted-foreground">
                                                No feedback provided
                                              </span>
                                            )}
                                          </div>
                                        )}
                                      </div>

                                      <div className="flex justify-end gap-2">
                                        {editMode ? (
                                          <>
                                            <Button
                                              variant="outline"
                                              onClick={() => {
                                                setEditMode(false);
                                                // Optionally reset feedbackText if changes shouldn't persist from edit mode
                                                if (currentRequest)
                                                  setFeedbackText(
                                                    currentRequest.feedback ||
                                                      ""
                                                  );
                                              }}
                                            >
                                              Cancel
                                            </Button>
                                            <Button onClick={handleSaveChanges}>
                                              Save Changes
                                            </Button>
                                          </>
                                        ) : (
                                          <Button
                                            onClick={() => setEditMode(true)}
                                          >
                                            {" "}
                                            {/* Corrected: set to true to enable editing */}
                                            Edit Request
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              {/*<Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  handleEditRequest(request);
                                }}
                              />
                              */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="flex items-center gap-1"
                                  >
                                    <X className="h-3 w-3" />
                                    <span className="sr-only md:not-sr-only">
                                      Delete
                                    </span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-sm">
                                  <DialogHeader>
                                    <DialogTitle>Confirm Deletion</DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to delete this
                                      moderation request? This action cannot be
                                      undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="flex justify-end gap-2 mt-4">
                                    <Button variant="outline">Cancel</Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() => {
                                        handleDeleteRequest(request.id); // Call the delete function here
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              {/* <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditRequest(request)}
                                className="flex items-center gap-1"
                              >
                                <Edit className="h-3 w-3" />
                                <span className="sr-only md:not-sr-only">
                                  Edit
                                </span>
                              </Button> */}
                            </div>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}

                    {filteredRequests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <p>No matching requests found</p>
                            {searchTerm && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => setSearchTerm("")}
                              >
                                Clear search
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
