import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ModerationBadge from "../ModerationBadge";

type ModerationType =
  | "toxicity"
  | "harassment"
  | "hate-speech"
  | "sexual"
  | "violence"
  | "spam";

type FlagObject = {
  type: ModerationType;
  score: number;
  flagged: boolean;
};

type RequestData = {
  id: string;
  timestamp: string;
  content_type: "text" | "image";
  content: string;
  flags?: FlagObject;
  status: "flagged" | "clean" | "borderline";
  feedback?: string;
};

type RecentRequestsCardProps = {
  requests: RequestData[];
};

export default function RecentRequestsCard({
  requests,
}: RecentRequestsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Recent Requests</CardTitle>
        <Link to="/dashboard/requests">
          <Button variant="ghost" size="sm" className="text-xs">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="max-w-[200px] truncate">
                  {request.content}
                </TableCell>
                <TableCell>
                  {request.content_type === "text" ? "Text" : "Image"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {request.flags && request.flags.flagged && (
                      <ModerationBadge
                        type={request.flags.type}
                        score={request.flags.score}
                        showScore={false}
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(request.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Link to={`/dashboard/requests/${request.id}`}>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
