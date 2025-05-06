import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UsageStatsCard from "@/components/dashboard/UsageStatsCard";
import FlagDistributionCard from "@/components/dashboard/FlagDistributionCard";
import RecentRequestsCard from "@/components/dashboard/RecentRequestsCard";

// Sample data for demonstration
const dailyData = [
  { date: "Mon", requests: 320 },
  { date: "Tue", requests: 280 },
  { date: "Wed", requests: 450 },
  { date: "Thu", requests: 390 },
  { date: "Fri", requests: 610 },
  { date: "Sat", requests: 320 },
  { date: "Sun", requests: 280 },
];

const weeklyData = [
  { date: "Week 1", requests: 2100 },
  { date: "Week 2", requests: 1900 },
  { date: "Week 3", requests: 2400 },
  { date: "Week 4", requests: 2800 },
];

const monthlyData = [
  { date: "Jan", requests: 6500 },
  { date: "Feb", requests: 5900 },
  { date: "Mar", requests: 8700 },
  { date: "Apr", requests: 9400 },
  { date: "May", requests: 11200 },
  { date: "Jun", requests: 10800 },
];

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

type RequestData = {
  id: string;
  timestamp: string;
  contentType: "text" | "image";
  content: string;
  flags: Array<{
    type: ModerationType;
    score: number;
  }>;
  status: "flagged" | "clean" | "borderline";
};

const recentRequests: RequestData[] = [
  {
    id: "1",
    timestamp: "2023-05-05T14:22:10Z",
    contentType: "text",
    content: "You're such a stupid idiot!",
    flags: [
      { type: "toxicity", score: 0.92 },
      { type: "harassment", score: 0.78 },
    ],
    status: "flagged",
  },
  {
    id: "2",
    timestamp: "2023-05-05T14:15:43Z",
    contentType: "text",
    content: "I disagree with your opinion on this matter.",
    flags: [],
    status: "clean",
  },
  {
    id: "3",
    timestamp: "2023-05-05T14:10:19Z",
    contentType: "image",
    content: "profile_picture.jpg",
    flags: [{ type: "sexual", score: 0.65 }],
    status: "borderline",
  },
  {
    id: "4",
    timestamp: "2023-05-05T14:05:02Z",
    contentType: "text",
    content: "I hate people like you! You should die!",
    flags: [
      { type: "toxicity", score: 0.95 },
      { type: "hate-speech", score: 0.87 },
      { type: "violence", score: 0.82 },
    ],
    status: "flagged",
  },
  {
    id: "5",
    timestamp: "2023-05-05T13:58:31Z",
    contentType: "text",
    content: "Check out this awesome deal! www.scam-link.com",
    flags: [{ type: "spam", score: 0.88 }],
    status: "flagged",
  },
];

export default function Dashboard() {
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
            <div className="mt-4 md:mt-0">
              <Tabs defaultValue="daily">
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Tabs defaultValue="daily" className="col-span-full">
              <TabsContent value="daily" className="mt-0">
                <UsageStatsCard
                  title="API Usage"
                  data={dailyData}
                  total={2650}
                  period="Last 7 days"
                />
              </TabsContent>
              <TabsContent value="weekly" className="mt-0">
                <UsageStatsCard
                  title="API Usage"
                  data={weeklyData}
                  total={9200}
                  period="Last 4 weeks"
                />
              </TabsContent>
              <TabsContent value="monthly" className="mt-0">
                <UsageStatsCard
                  title="API Usage"
                  data={monthlyData}
                  total={52500}
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
