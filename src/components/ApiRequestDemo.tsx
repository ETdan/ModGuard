
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ApiDemoProps = {
  apiEndpoint: string;
  requestData: string;
  responseData: string;
}

export default function ApiRequestDemo({ apiEndpoint, requestData, responseData }: ApiDemoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  
  const handleRunDemo = () => {
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      setShowResponse(true);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-foreground">{apiEndpoint}</h3>
        <Button 
          onClick={handleRunDemo} 
          size="sm"
          disabled={isLoading}
        >
          {isLoading ? "Running..." : "Run Example"}
        </Button>
      </div>
      
      <Card className="bg-[#1e1e1e] border-border">
        <CardContent className="p-4">
          <pre className="text-sm text-[#d4d4d4] overflow-x-auto">
            <code>{requestData}</code>
          </pre>
        </CardContent>
      </Card>
      
      {showResponse && (
        <div className="animate-fade-in">
          <h4 className="text-sm font-medium text-foreground mb-2">Response</h4>
          <Card className="bg-[#1e1e1e] border-border">
            <CardContent className="p-4">
              <pre className="text-sm text-[#d4d4d4] overflow-x-auto">
                <code>{responseData}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
