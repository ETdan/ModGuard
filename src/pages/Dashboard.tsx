import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UsageStatsCard from "@/components/dashboard/UsageStatsCard";
import FlagDistributionCard from "@/components/dashboard/FlagDistributionCard";
import RecentRequestsCard from "@/components/dashboard/RecentRequestsCard";
import { useEffect, useState } from "react";
import { fetchRequestData } from "@/services/supabase";
// Sample data for demonstration

type ModerationType =
  | "toxicity"
  | "harassment"
  | "hate-speech"
  | "sexual"
  | "violence"
  | "spam";

const flagDistribution = [
  { type: "toxicity" as ModerationType, value: 42 },
  { type: "harassment" as ModerationType, value: 21 },
  { type: "hate-speech" as ModerationType, value: 17 },
  { type: "sexual" as ModerationType, value: 8 },
  { type: "violence" as ModerationType, value: 7 },
  { type: "spam" as ModerationType, value: 5 },
];

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

export default function Dashboard() {
  const [recentRequests, setRecentRequests] = useState<RequestData[]>([]);

  useEffect(() => {
    const getRequestData = async () => {
      const data = await fetchRequestData();
      setRecentRequests(data);
    };

    getRequestData();
  }, []);

  const dailyData = recentRequests.map((request) => ({
    date: new Date(request.timestamp).toLocaleDateString(),
    requests: 1,
  }));

  const weeklyData = (() => {
    const today = new Date();
    const lastFourWeeks = Array.from({ length: 4 }, (_, i) => {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - i * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const weekRequests = recentRequests.filter((request) => {
        const requestDate = new Date(request.timestamp);
        return requestDate >= weekStart && requestDate <= weekEnd;
      }).length;

      return {
        date: `Week ${i + 1}`,
        requests: weekRequests,
      };
    });

    return lastFourWeeks.reverse();
  })();

  const monthlyData = (() => {
    const today = new Date();
    const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
      const month = today.getMonth() - i;
      const year = today.getFullYear();
      const monthName = new Date(year, month, 1).toLocaleString("default", {
        month: "short",
      });

      const monthRequests = recentRequests.filter((request) => {
        const requestDate = new Date(request.timestamp);
        return (
          requestDate.getMonth() === month && requestDate.getFullYear() === year
        );
      }).length;

      return {
        date: monthName,
        requests: monthRequests,
      };
    });

    return lastSixMonths.reverse();
  })();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor and manage your content moderation
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Tabs defaultValue="daily" className="col-span-full">
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              <TabsContent value="daily" className="mt-0">
                <UsageStatsCard
                  title="API Usage"
                  data={dailyData}
                  total={recentRequests.length}
                  period="Last 7 days"
                />
              </TabsContent>
              <TabsContent value="weekly" className="mt-0">
                <UsageStatsCard
                  title="API Usage"
                  data={weeklyData}
                  total={weeklyData.reduce(
                    (acc, curr) => acc + curr.requests,
                    0
                  )}
                  period="Last 4 weeks"
                />
              </TabsContent>
              <TabsContent value="monthly" className="mt-0">
                <UsageStatsCard
                  title="API Usage"
                  data={monthlyData}
                  total={monthlyData.reduce(
                    (acc, curr) => acc + curr.requests,
                    0
                  )}
                  period="Last 6 months"
                />
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Account</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Current Plan
                    </div>
                    <div className="text-lg font-medium">Pro</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Monthly Quota
                    </div>
                    <div className="text-lg font-medium">100,000 requests</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Quota Usage
                    </div>
                    <div className="text-lg font-medium">52,500 (52.5%)</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Renewal Date
                    </div>
                    <div className="text-lg font-medium">June 1, 2023</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <FlagDistributionCard data={flagDistribution} />

            <div className="col-span-full">
              <RecentRequestsCard requests={recentRequests} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
