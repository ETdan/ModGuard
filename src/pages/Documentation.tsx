
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApiRequestDemo from "@/components/ApiRequestDemo";
import { FileText, Key } from "lucide-react";

export default function Documentation() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">API Documentation</h1>
            <p className="text-muted-foreground">Learn how to integrate our content moderation API into your application</p>
          </div>
          
          <Tabs defaultValue="auth" className="space-y-8">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl">
              <TabsTrigger value="auth">Authentication</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="limits">Rate Limits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="auth" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">Authentication</CardTitle>
                  </div>
                  <CardDescription>
                    Learn how to authenticate your API requests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">API Keys</h3>
                    <p className="text-muted-foreground mb-4">
                      All requests to the API must include your API key in the header. You can manage your API keys in your 
                      <a href="/api-management" className="text-primary hover:underline ml-1">API Management dashboard</a>.
                    </p>
                    
                    <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                      <pre>Authorization: Bearer YOUR_API_KEY</pre>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Securing Your API Key</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Never expose your API key in client-side code</li>
                      <li>Use environment variables to store your API key</li>
                      <li>Rotate your API keys periodically</li>
                      <li>Set appropriate permissions for each API key</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="endpoints" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">API Endpoints</CardTitle>
                  </div>
                  <CardDescription>
                    Explore the available API endpoints for content moderation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Text Moderation</h3>
                    <p className="text-muted-foreground mb-4">
                      Analyze text content for toxic, harmful, or inappropriate content.
                    </p>
                    
                    <div className="rounded-md overflow-hidden border border-border mb-4">
                      <div className="bg-muted p-3 flex justify-between items-center">
                        <span className="font-medium">POST /api/v1/moderate/text</span>
                        <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-md">200 OK</span>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground mb-4">Request Body:</p>
                        <div className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto mb-4">
                          <pre>{JSON.stringify({
                            text: "Your text content to analyze",
                            options: {
                              threshold: 0.7,
                              categories: ["toxicity", "harassment", "hate-speech", "sexual", "violence", "spam"]
                            }
                          }, null, 2)}</pre>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">Response:</p>
                        <div className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
                          <pre>{JSON.stringify({
                            id: "mod_1234567890",
                            timestamp: "2023-06-15T14:32:10Z",
                            status: "flagged",
                            flags: [
                              { type: "toxicity", score: 0.85, flagged: true },
                              { type: "harassment", score: 0.72, flagged: true },
                              { type: "hate-speech", score: 0.35, flagged: false },
                              { type: "sexual", score: 0.12, flagged: false },
                              { type: "violence", score: 0.05, flagged: false },
                              { type: "spam", score: 0.22, flagged: false }
                            ],
                            summary: "Content contains toxic and harassing language."
                          }, null, 2)}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Image Moderation</h3>
                    <p className="text-muted-foreground mb-4">
                      Analyze images for inappropriate or unsafe content.
                    </p>
                    
                    <div className="rounded-md overflow-hidden border border-border">
                      <div className="bg-muted p-3 flex justify-between items-center">
                        <span className="font-medium">POST /api/v1/moderate/image</span>
                        <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-md">200 OK</span>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground mb-4">Request Body:</p>
                        <div className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto mb-4">
                          <pre>{JSON.stringify({
                            image_url: "https://example.com/image.jpg",
                            // Or base64 encoded image
                            // image_data: "base64_encoded_image_data",
                            options: {
                              threshold: 0.7,
                              categories: ["sexual", "violence", "hate-speech"]
                            }
                          }, null, 2)}</pre>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">Response:</p>
                        <div className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
                          <pre>{JSON.stringify({
                            id: "mod_0987654321",
                            timestamp: "2023-06-15T14:35:22Z",
                            status: "clean",
                            flags: [
                              { type: "sexual", score: 0.12, flagged: false },
                              { type: "violence", score: 0.05, flagged: false },
                              { type: "hate-speech", score: 0.01, flagged: false }
                            ],
                            summary: "Image appears to be appropriate."
                          }, null, 2)}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="examples" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Code Examples</CardTitle>
                  <CardDescription>
                    See examples of how to integrate our API in different languages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">cURL</h3>
                    <ApiRequestDemo 
                      apiEndpoint="POST /api/v1/moderate/text"
                      requestData={`curl -X POST \\
  https://api.moderationplatform.com/api/v1/moderate/text \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Check out this amazing offer! Click now!",
    "options": {
      "threshold": 0.7,
      "categories": ["spam", "toxicity"]
    }
  }'`}
                      responseData={`{
  "id": "mod_1234567890",
  "timestamp": "2023-06-15T14:32:10Z",
  "status": "flagged",
  "flags": [
    { "type": "spam", "score": 0.82, "flagged": true },
    { "type": "toxicity", "score": 0.12, "flagged": false }
  ],
  "summary": "Content appears to be spam."
}`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">JavaScript</h3>
                    <ApiRequestDemo 
                      apiEndpoint="POST /api/v1/moderate/text"
                      requestData={`const response = await fetch('https://api.moderationplatform.com/api/v1/moderate/text', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'Check out this amazing offer! Click now!',
    options: {
      threshold: 0.7,
      categories: ['spam', 'toxicity']
    }
  })
});

const data = await response.json();
console.log(data);`}
                      responseData={`{
  "id": "mod_1234567890",
  "timestamp": "2023-06-15T14:32:10Z",
  "status": "flagged",
  "flags": [
    { "type": "spam", "score": 0.82, "flagged": true },
    { "type": "toxicity", "score": 0.12, "flagged": false }
  ],
  "summary": "Content appears to be spam."
}`}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Python</h3>
                    <ApiRequestDemo 
                      apiEndpoint="POST /api/v1/moderate/text"
                      requestData={`import requests
import json

url = "https://api.moderationplatform.com/api/v1/moderate/text"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "text": "Check out this amazing offer! Click now!",
    "options": {
        "threshold": 0.7,
        "categories": ["spam", "toxicity"]
    }
}

response = requests.post(url, headers=headers, data=json.dumps(payload))
data = response.json()
print(data)`}
                      responseData={`{
  "id": "mod_1234567890",
  "timestamp": "2023-06-15T14:32:10Z",
  "status": "flagged",
  "flags": [
    { "type": "spam", "score": 0.82, "flagged": true },
    { "type": "toxicity", "score": 0.12, "flagged": false }
  ],
  "summary": "Content appears to be spam."
}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="limits" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Rate Limits</CardTitle>
                  <CardDescription>
                    Understand the rate limits for different API plans
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto rounded-md border border-border">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted text-foreground">
                        <tr>
                          <th scope="col" className="px-6 py-3 font-medium">Plan</th>
                          <th scope="col" className="px-6 py-3 font-medium">Requests per day</th>
                          <th scope="col" className="px-6 py-3 font-medium">Requests per second</th>
                          <th scope="col" className="px-6 py-3 font-medium">Burst limit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border">
                          <th scope="row" className="px-6 py-4 font-medium">Free</th>
                          <td className="px-6 py-4">1,000</td>
                          <td className="px-6 py-4">5</td>
                          <td className="px-6 py-4">10</td>
                        </tr>
                        <tr className="border-b border-border">
                          <th scope="row" className="px-6 py-4 font-medium">Pro</th>
                          <td className="px-6 py-4">100,000</td>
                          <td className="px-6 py-4">20</td>
                          <td className="px-6 py-4">50</td>
                        </tr>
                        <tr>
                          <th scope="row" className="px-6 py-4 font-medium">Enterprise</th>
                          <td className="px-6 py-4">Unlimited</td>
                          <td className="px-6 py-4">100+</td>
                          <td className="px-6 py-4">200+</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium">Rate Limit Headers</h3>
                    <p className="text-muted-foreground">
                      Each API response includes headers to help you monitor your rate limit usage:
                    </p>
                    
                    <div className="bg-muted p-4 rounded-md text-sm font-mono">
                      <pre>X-RateLimit-Limit: 100000
X-RateLimit-Remaining: 99950
X-RateLimit-Reset: 1623790800</pre>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">X-RateLimit-Limit:</span> The maximum number of requests you're permitted to make per day.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">X-RateLimit-Remaining:</span> The number of requests remaining in the current rate limit window.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">X-RateLimit-Reset:</span> The time at which the current rate limit window resets in Unix epoch seconds.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
