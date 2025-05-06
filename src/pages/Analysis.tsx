import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModerationBadge from "@/components/ModerationBadge";

type ModerationType =
  | "toxicity"
  | "harassment"
  | "hate-speech"
  | "sexual"
  | "violence"
  | "spam";
type ModerationResult = {
  status: "flagged" | "clean" | "borderline";
  flags: Array<{
    type: ModerationType;
    score: number;
    flagged: boolean;
  }>;
  summary: string;
  requestId: string;
  timestamp: string;
};

export default function Analysis() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [threshold, setThreshold] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ModerationResult | null>(null);

  const handleTextSubmit = () => {
    if (!text.trim()) return;

    setIsLoading(true);

    // Simulate API call to moderation service
    setTimeout(() => {
      // Generate demo result based on text content
      const hasOffensiveWords =
        text.toLowerCase().includes("idiot") ||
        text.toLowerCase().includes("stupid") ||
        text.toLowerCase().includes("hate");

      const hasProfanity =
        text.toLowerCase().includes("fuck") ||
        text.toLowerCase().includes("shit") ||
        text.toLowerCase().includes("damn");

      const hasViolence =
        text.toLowerCase().includes("kill") ||
        text.toLowerCase().includes("die") ||
        text.toLowerCase().includes("hurt");

      const hasSpam =
        text.toLowerCase().includes("buy now") ||
        text.toLowerCase().includes("click here") ||
        text.toLowerCase().includes("www.");

      const flags = [
        {
          type: "toxicity" as ModerationType,
          score: hasOffensiveWords ? 0.85 : Math.random() * 0.4,
          flagged: hasOffensiveWords,
        },
        {
          type: "harassment" as ModerationType,
          score: hasOffensiveWords ? 0.78 : Math.random() * 0.3,
          flagged: hasOffensiveWords && threshold <= 0.8,
        },
        {
          type: "hate-speech" as ModerationType,
          score: Math.random() * 0.3,
          flagged: false,
        },
        {
          type: "violence" as ModerationType,
          score: hasViolence ? 0.82 : Math.random() * 0.2,
          flagged: hasViolence && threshold <= 0.85,
        },
        {
          type: "spam" as ModerationType,
          score: hasSpam ? 0.9 : Math.random() * 0.2,
          flagged: hasSpam && threshold <= 0.95,
        },
      ];

      const anyFlagged = flags.some((flag) => flag.flagged);

      const mockResult: ModerationResult = {
        status: anyFlagged ? "flagged" : "clean",
        flags,
        summary: anyFlagged
          ? `Content ${hasProfanity ? "contains profanity" : ""} ${
              hasOffensiveWords
                ? (hasProfanity ? "and" : "") + " may be offensive or toxic"
                : ""
            } ${
              hasViolence
                ? (hasProfanity || hasOffensiveWords ? "and" : "") +
                  " contains violent language"
                : ""
            } ${
              hasSpam
                ? (hasProfanity || hasOffensiveWords || hasViolence
                    ? "and"
                    : "") + " appears to be spam"
                : ""
            }.`
          : "Content appears to be clean.",
        requestId: `req_${Math.random().toString(36).substring(2, 10)}`,
        timestamp: new Date().toISOString(),
      };

      setResult(mockResult);
      setIsLoading(false);
    }, 1000);
  };

  const handleImageSubmit = () => {
    if (!imageUrl.trim()) return;

    setIsLoading(true);

    // Simulate API call for image moderation
    setTimeout(() => {
      // Mock result
      const mockResult: ModerationResult = {
        status: "clean",
        flags: [
          {
            type: "sexual" as ModerationType,
            score: 0.15,
            flagged: false,
          },
          {
            type: "violence" as ModerationType,
            score: 0.08,
            flagged: false,
          },
        ],
        summary: "Image appears to be appropriate.",
        requestId: `req_${Math.random().toString(36).substring(2, 10)}`,
        timestamp: new Date().toISOString(),
      };

      setResult(mockResult);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              Content Analysis
            </h1>
            <p className="text-muted-foreground">
              Test our moderation API with your content
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Test Moderation</CardTitle>
                <CardDescription>
                  Submit content to test our moderation API in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="text" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="image">Image</TabsTrigger>
                  </TabsList>

                  <TabsContent value="text" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content">Enter text to analyze</Label>
                      <Textarea
                        id="content"
                        placeholder="Type or paste text here..."
                        rows={6}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="threshold">
                          Sensitivity Threshold: {threshold}
                        </Label>
                      </div>
                      <Slider
                        id="threshold"
                        min={0.1}
                        max={0.9}
                        step={0.1}
                        value={[threshold]}
                        onValueChange={(value) => setThreshold(value[0])}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>More Permissive</span>
                        <span>More Strict</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleTextSubmit}
                      disabled={!text.trim() || isLoading}
                      className="w-full"
                    >
                      {isLoading ? "Analyzing..." : "Analyze Text"}
                    </Button>
                  </TabsContent>

                  <TabsContent value="image" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="image-url">Image URL</Label>
                      <Input
                        id="image-url"
                        placeholder="https://example.com/image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Or upload an image</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <p className="text-sm text-muted-foreground">
                          Drag and drop an image, or click to select a file
                        </p>
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="file-upload"
                        />
                        <Label
                          htmlFor="file-upload"
                          className="mt-2 inline-block cursor-pointer"
                        >
                          <Button variant="outline" type="button">
                            Upload Image
                          </Button>
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="image-threshold">
                          Sensitivity Threshold: {threshold}
                        </Label>
                      </div>
                      <Slider
                        id="image-threshold"
                        min={0.1}
                        max={0.9}
                        step={0.1}
                        value={[threshold]}
                        onValueChange={(value) => setThreshold(value[0])}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>More Permissive</span>
                        <span>More Strict</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleImageSubmit}
                      disabled={!imageUrl.trim() || isLoading}
                      className="w-full"
                    >
                      {isLoading ? "Analyzing..." : "Analyze Image"}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Moderation Result</CardTitle>
                <CardDescription>
                  View detailed analysis of the submitted content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="h-10 w-10 border-t-2 border-primary rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-muted-foreground">
                        Analyzing content...
                      </p>
                    </div>
                  </div>
                ) : result ? (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            result.status === "flagged"
                              ? "bg-destructive"
                              : result.status === "borderline"
                              ? "bg-amber-500"
                              : "bg-green-500"
                          }`}
                        />
                        <span className="font-medium">
                          Status:{" "}
                          {result.status.charAt(0).toUpperCase() +
                            result.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{result.summary}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">
                        Category Analysis:
                      </h3>
                      <div className="space-y-3">
                        {result.flags.map((flag, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between">
                              <ModerationBadge type={flag.type} />
                              <span
                                className={`text-sm font-medium ${
                                  flag.flagged
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {Math.round(flag.score * 100)}%
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  flag.flagged
                                    ? "bg-destructive"
                                    : flag.score > threshold * 0.8
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                                }`}
                                style={{ width: `${flag.score * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Request ID:
                          </span>
                          <span className="ml-1 font-mono">
                            {result.requestId}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Timestamp:
                          </span>
                          <span className="ml-1">
                            {new Date(result.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-center">
                    <div>
                      <p className="text-muted-foreground mb-2">
                        No content analyzed yet
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Submit content on the left to see moderation results
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
