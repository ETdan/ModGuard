import React, { useState } from "react";
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModerationBadge from "@/components/ModerationBadge";
import { Check, Edit, Eye, FileText, X } from "lucide-react";

type ModerationType =
  | "toxicity"
  | "harassment"
  | "hate-speech"
  | "sexual"
  | "violence"
  | "spam";

type ModerationRequest = {
  id: string;
  timestamp: string;
  contentType: "text" | "image";
  content: string;
  flags: Array<{
    type: ModerationType;
    score: number;
    flagged: boolean;
  }>;
  status: "flagged" | "clean" | "borderline";
  feedback?: string;
};

// Sample data
const sampleRequests: ModerationRequest[] = [
  {
    id: "req_1234567890",
    timestamp: "2023-07-15T14:32:10Z",
    contentType: "text",
    content: "You're such a stupid idiot! I can't believe how dumb you are.",
    flags: [
      { type: "toxicity", score: 0.92, flagged: true },
      { type: "harassment", score: 0.85, flagged: true },
      { type: "hate-speech", score: 0.45, flagged: false },
      { type: "sexual", score: 0.12, flagged: false },
      { type: "violence", score: 0.08, flagged: false },
      { type: "spam", score: 0.05, flagged: false },
    ],
    status: "flagged",
  },
  {
    id: "req_2345678901",
    timestamp: "2023-07-15T13:45:22Z",
    contentType: "text",
    content:
      "I disagree with your opinion on this matter. Let's discuss further.",
    flags: [
      { type: "toxicity", score: 0.15, flagged: false },
      { type: "harassment", score: 0.12, flagged: false },
      { type: "hate-speech", score: 0.05, flagged: false },
      { type: "sexual", score: 0.01, flagged: false },
      { type: "violence", score: 0.02, flagged: false },
      { type: "spam", score: 0.08, flagged: false },
    ],
    status: "clean",
  },
  {
    id: "req_3456789012",
    timestamp: "2023-07-15T12:18:45Z",
    contentType: "image",
    content: "profile_picture.jpg",
    flags: [
      { type: "sexual", score: 0.68, flagged: false },
      { type: "violence", score: 0.12, flagged: false },
      { type: "hate-speech", score: 0.05, flagged: false },
    ],
    status: "borderline",
    feedback:
      "Image is borderline inappropriate but not explicit enough to flag.",
  },
  {
    id: "req_4567890123",
    timestamp: "2023-07-15T11:03:12Z",
    contentType: "text",
    content:
      "I hate all people from that country. They should all go back where they came from!",
    flags: [
      { type: "toxicity", score: 0.78, flagged: true },
      { type: "harassment", score: 0.65, flagged: true },
      { type: "hate-speech", score: 0.92, flagged: true },
      { type: "sexual", score: 0.05, flagged: false },
      { type: "violence", score: 0.35, flagged: false },
      { type: "spam", score: 0.02, flagged: false },
    ],
    status: "flagged",
  },
  {
    id: "req_5678901234",
    timestamp: "2023-07-15T10:27:33Z",
    contentType: "text",
    content:
      "Don't miss this amazing opportunity! Click now to claim your prize: www.definitely-not-a-scam.com",
    flags: [
      { type: "toxicity", score: 0.25, flagged: false },
      { type: "harassment", score: 0.15, flagged: false },
      { type: "hate-speech", score: 0.05, flagged: false },
      { type: "sexual", score: 0.08, flagged: false },
      { type: "violence", score: 0.02, flagged: false },
      { type: "spam", score: 0.95, flagged: true },
    ],
    status: "flagged",
  },
  {
    id: "req_6789012345",
    timestamp: "2023-07-15T09:15:42Z",
    contentType: "text",
    content: "Thank you for your help with this issue. I really appreciate it.",
    flags: [
      { type: "toxicity", score: 0.02, flagged: false },
      { type: "harassment", score: 0.01, flagged: false },
      { type: "hate-speech", score: 0.01, flagged: false },
      { type: "sexual", score: 0.01, flagged: false },
      { type: "violence", score: 0.01, flagged: false },
      { type: "spam", score: 0.15, flagged: false },
    ],
    status: "clean",
  },
];

export default function ModerationRequests() {
  const [requests, setRequests] = useState<ModerationRequest[]>(sampleRequests);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [currentRequest, setCurrentRequest] =
    useState<ModerationRequest | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  const handleViewRequest = (request: ModerationRequest) => {
    setCurrentRequest(request);
    setEditMode(false);
    setFeedbackText(request.feedback || "");
  };

  const handleEditRequest = (request: ModerationRequest) => {
    setCurrentRequest(request);
    setEditMode(true);
    setFeedbackText(request.feedback || "");
  };

  const toggleFlag = (flagType: ModerationType) => {
    if (!currentRequest) return;

    setCurrentRequest({
      ...currentRequest,
      flags: currentRequest.flags.map((flag) =>
        flag.type === flagType ? { ...flag, flagged: !flag.flagged } : flag
      ),
    });
  };

  const handleSaveChanges = () => {
    if (!currentRequest) return;

    // Calculate new status based on flags
    const anyFlagged = currentRequest.flags.some((flag) => flag.flagged);
    const newStatus = anyFlagged ? "flagged" : "clean";

    const updatedRequest = {
      ...currentRequest,
      status: newStatus,
      feedback: feedbackText || undefined,
    };

    // Update the request in the list
    setRequests((prev) =>
      prev.map((req) => (req.id === updatedRequest.id ? updatedRequest : req))
    );

    setEditMode(false);
    setCurrentRequest(updatedRequest);

    toast({
      title: "Request updated",
      description: `Moderation request ${updatedRequest.id} has been updated.`,
    });
  };

  const filteredRequests = requests.filter((request) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      request.id.toLowerCase().includes(searchLower) ||
      request.content.toLowerCase().includes(searchLower) ||
      request.status.toLowerCase().includes(searchLower) ||
      request.flags.some((flag) =>
        flag.type.toLowerCase().includes(searchLower)
      )
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
                            {request.contentType === "text" ? (
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
                                <FileText className="h-3 w-3" />
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
                              {request.flags
                                .filter((flag) => flag.flagged)
                                .map((flag, idx) => (
                                  <ModerationBadge
                                    key={idx}
                                    type={flag.type}
                                    score={flag.score}
                                    showScore={false}
                                  />
                                ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewRequest(request)}
                                    className="flex items-center gap-1"
                                  >
                                    <Eye className="h-3 w-3" />
                                    <span className="sr-only md:not-sr-only">
                                      View
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
                                            {currentRequest.contentType ===
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
                                          {currentRequest.contentType ===
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

                                      <div>
                                        <Label className="text-muted-foreground text-sm mb-2 block">
                                          Content Flags
                                        </Label>
                                        <div className="space-y-4">
                                          {currentRequest.flags.map(
                                            (flag, idx) => (
                                              <div
                                                key={idx}
                                                className="flex items-center justify-between"
                                              >
                                                <div className="flex items-center gap-2">
                                                  {editMode ? (
                                                    <Checkbox
                                                      id={`flag-${flag.type}`}
                                                      checked={flag.flagged}
                                                      onCheckedChange={() =>
                                                        toggleFlag(flag.type)
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
                                                    className="cursor-pointer"
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
                                            )
                                          )}
                                        </div>
                                      </div>

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
                                              onClick={() => setEditMode(false)}
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
                                            Edit Request
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>

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
