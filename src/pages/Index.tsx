import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApiRequestDemo from "@/components/ApiRequestDemo";

export default function Index() {
  const textModerationRequest = `POST /api/v1/moderate/text HTTP/1.1
Host: api.modguard.com
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "text": "You're such an idiot, nobody likes you!",
  "options": {
    "threshold": 0.7,
    "categories": ["toxicity", "harassment", "hate-speech"]
  }
}`;

  const textModerationResponse = `HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "flagged",
  "flags": [
    {
      "type": "toxicity",
      "score": 0.92,
      "flagged": true
    },
    {
      "type": "harassment",
      "score": 0.87,
      "flagged": true
    },
    {
      "type": "hate-speech",
      "score": 0.31,
      "flagged": false
    }
  ],
  "summary": "Content contains toxic language and harassment.",
  "requestId": "req_7f8e9a2b3c4d5e6f",
  "timestamp": "${new Date().toISOString()}"
}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-background py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6">
                <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl md:text-6xl">
                  <span className="block">Detect and prevent</span>
                  <span className="block text-primary">toxic content</span>
                  <span className="block">in real-time</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  ModGuard's AI-powered content moderation API helps you keep
                  your platform safe. Detect toxicity, hate speech, harassment,
                  and more through our simple API.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/signup">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link to="/documentation">
                    <Button variant="outline" size="lg">
                      View Documentation
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-12 lg:mt-0 lg:col-span-6">
                <div className="bg-secondary/30 border border-secondary p-6 rounded-lg shadow-lg">
                  <ApiRequestDemo
                    apiEndpoint="/api/v1/moderate/text"
                    requestData={textModerationRequest}
                    responseData={textModerationResponse}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="bg-muted py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Powerful Content Moderation Features
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to keep your platform safe and welcoming
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Text Moderation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Detect toxicity, hate speech, harassment, and more in text
                    content with high accuracy. Our models are constantly
                    trained on the latest data.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Image Moderation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Automatically detect NSFW images, violence, and other
                    inappropriate visual content to protect your users and
                    brand.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Real-time API</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Low-latency API designed for real-time moderation needs.
                    Integrate with our SDKs for Python, JavaScript, and more.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Comprehensive Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Track moderation activity, review flagged content, and get
                    insights into content patterns across your platform.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customizable Thresholds</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Set your own sensitivity levels for different types of
                    content and categories of violations.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Human Review Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Review borderline content with our human-in-the-loop tools
                    to improve accuracy and reduce false positives.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-background py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-2xl px-6 py-12 sm:px-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-primary-foreground">
                  Ready to clean up your platform?
                </h2>
                <p className="mt-4 text-lg text-primary-foreground/80">
                  Start moderating content in minutes with our simple API.
                </p>
                <div className="mt-8">
                  <Link to="/signup">
                    <Button variant="secondary" size="lg">
                      Sign Up Free
                    </Button>
                  </Link>
                </div>
                <p className="mt-4 text-sm text-primary-foreground/70">
                  No credit card required. 1,000 API calls included in free
                  plan.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
