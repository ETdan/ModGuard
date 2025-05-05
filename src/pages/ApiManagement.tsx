
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type ApiKey = {
  id: string;
  name: string;
  key: string;
  scopes: string[];
  created: string;
  lastUsed: string | null;
};

export default function ApiManagement() {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk_prod_2a3b4c5d6e7f8g9h',
      scopes: ['read', 'write'],
      created: '2023-04-10T15:30:00Z',
      lastUsed: '2023-05-05T14:22:10Z'
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'sk_dev_9h8g7f6e5d4c3b2a',
      scopes: ['read'],
      created: '2023-04-20T12:15:00Z',
      lastUsed: '2023-05-04T09:45:32Z'
    },
    {
      id: '3',
      name: 'Test Environment',
      key: 'sk_test_5d6e7f8g9h1a2b3c',
      scopes: ['read', 'write', 'admin'],
      created: '2023-05-01T08:00:00Z',
      lastUsed: null
    }
  ]);
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyScopes, setNewKeyScopes] = useState<string[]>(['read']);
  const [isRevealDialogOpen, setIsRevealDialogOpen] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState('');
  
  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please provide a name for your API key.",
        variant: "destructive"
      });
      return;
    }
    
    // Generate a mock key for demonstration
    const mockKey = `sk_${Math.random().toString(36).substring(2, 15)}`;
    
    const newKey: ApiKey = {
      id: Math.random().toString(36).substring(2, 9),
      name: newKeyName,
      key: mockKey,
      scopes: newKeyScopes,
      created: new Date().toISOString(),
      lastUsed: null
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewlyCreatedKey(mockKey);
    setIsCreateDialogOpen(false);
    setIsRevealDialogOpen(true);
    
    // Reset form
    setNewKeyName('');
    setNewKeyScopes(['read']);
  };
  
  const handleScopeChange = (scope: string) => {
    setNewKeyScopes(prev => 
      prev.includes(scope)
        ? prev.filter(s => s !== scope)
        : [...prev, scope]
    );
  };
  
  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast({
      title: "API Key Revoked",
      description: "The API key has been revoked successfully.",
    });
  };
  
  const handleCopyKey = () => {
    navigator.clipboard.writeText(newlyCreatedKey);
    toast({
      title: "Copied to Clipboard",
      description: "API key copied to clipboard successfully.",
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">API Management</h1>
              <p className="text-muted-foreground">Create and manage your API keys</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                Create API Key
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Your API Keys</CardTitle>
              <CardDescription>
                Use these keys to authenticate requests with our API. Keep your keys secure; do not share them in publicly accessible areas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div 
                    key={apiKey.id}
                    className="p-4 border border-border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="font-medium">{apiKey.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Created: {new Date(apiKey.created).toLocaleDateString()}
                      </div>
                      {apiKey.lastUsed && (
                        <div className="text-sm text-muted-foreground">
                          Last used: {new Date(apiKey.lastUsed).toLocaleString()}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {apiKey.scopes.map(scope => (
                          <span 
                            key={scope}
                            className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                          >
                            {scope}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Button
                        variant="outline"
                        className="text-sm h-8"
                        onClick={() => {
                          navigator.clipboard.writeText(apiKey.key);
                          toast({
                            title: "Copied to Clipboard",
                            description: "API key copied to clipboard successfully.",
                          });
                        }}
                      >
                        Copy Key
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleRevokeKey(apiKey.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>API Key Permissions</CardTitle>
              <CardDescription>
                Understanding the different permission scopes for your API keys
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Read</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Allows retrieval of moderation results and request history, but cannot create new moderation requests.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">Write</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Allows creating new moderation requests and managing request feedback. Includes all Read permissions.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">Admin</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Full administrative access, including managing API keys, changing sensitivity thresholds, and account settings. Includes all Read and Write permissions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Create Key Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New API Key</DialogTitle>
            <DialogDescription>
              Add a new API key to authenticate with our services. You'll only see the full key once upon creation.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Key Name</Label>
              <Input
                id="name"
                placeholder="Production API Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="scope-read" 
                    checked={newKeyScopes.includes('read')}
                    onCheckedChange={() => handleScopeChange('read')}
                  />
                  <Label htmlFor="scope-read" className="font-normal">Read (View moderation results)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="scope-write" 
                    checked={newKeyScopes.includes('write')}
                    onCheckedChange={() => handleScopeChange('write')}
                  />
                  <Label htmlFor="scope-write" className="font-normal">Write (Create moderation requests)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="scope-admin" 
                    checked={newKeyScopes.includes('admin')}
                    onCheckedChange={() => handleScopeChange('admin')}
                  />
                  <Label htmlFor="scope-admin" className="font-normal">Admin (Full administrative access)</Label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateKey}>
              Create API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reveal Key Dialog */}
      <Dialog open={isRevealDialogOpen} onOpenChange={setIsRevealDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your New API Key</DialogTitle>
            <DialogDescription>
              This is the only time we'll show you this API key. Please save it somewhere safe.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="p-4 bg-muted rounded-md font-mono text-sm break-all">
              {newlyCreatedKey}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCopyKey}>
              Copy Key
            </Button>
            <Button onClick={() => setIsRevealDialogOpen(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
}
