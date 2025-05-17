import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import supabase from "@/services/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from "@/components/Footer";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";

type ApiKey = {
  id: string;
  name: string;
  key: string;
  scopes: string[];
  created: string;
  lastUsed: string | null;
  user_id: string | null;
};

export default function ApiManagement() {
  const { toast } = useToast();
  const user_id = useUser().user?.id;
  const session = useUser()?.session;
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const { data: api_key, error } = await supabase
          .from("api_key")
          .select("*");

        if (error) {
          console.error("Error fetching API keys:", error);
          return;
        }

        if (api_key) {
          setApiKeys(api_key);
        }
      } catch (err) {
        console.error("Unexpected error fetching API keys:", err);
      }
    };

    fetchApiKeys();
  }, []);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyScopes, setNewKeyScopes] = useState<string[]>(["read"]);
  const [isRevealDialogOpen, setIsRevealDialogOpen] = useState(false);
  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please provide a name for your API key.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("api_key").insert([
        {
          name: newKeyName,
          scopes: newKeyScopes,
          user_id: user_id,
        },
      ]);

      if (error) {
        console.error("Error creating API key:", error);
        toast({
          title: "Error",
          description: "Failed to create API key. Please try again.",
          variant: "destructive",
        });
        return;
      }
      const { data: updatedKeys, error: fetchError } = await supabase
        .from("api_key")
        .select("*");

      if (fetchError) {
        console.error("Error fetching updated API keys:", fetchError);
        toast({
          title: "Error",
          description: "Failed to fetch updated API keys. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (updatedKeys) {
        setApiKeys(updatedKeys);
      }

      setIsCreateDialogOpen(false);
      setIsRevealDialogOpen(true);
      // fetchApiKeys();

      toast({
        title: "API Key Created",
        description: "Your new API key has been created successfully.",
      });
    } catch (err) {
      console.error("Unexpected error creating API key:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleScopeChange = (scope: string) => {
    setNewKeyScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const handleRevokeKey = async (id: string) => {
    try {
      const { error } = await supabase.from("api_key").delete().eq("id", id);
      if (error) {
        console.error("Error revoking API key:", error);
        toast({
          title: "Error",
          description: "Failed to revoke API key. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setApiKeys(apiKeys.filter((key) => key.id !== id));
      toast({
        title: "API Key Revoked",
        description: "The API key has been revoked successfully.",
      });
    } catch (err) {
      console.error("Unexpected error revoking API key:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKeys[apiKeys.length - 1]?.key);
    toast({
      title: "Copied to Clipboard",
      description: "API key copied to clipboard successfully.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                API Management
              </h1>
              <p className="text-muted-foreground">
                Create and manage your API keys
              </p>
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
                Use these keys to authenticate requests with our API. Keep your
                keys secure; do not share them in publicly accessible areas.
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
                          Last used:{" "}
                          {new Date(apiKey.lastUsed).toLocaleString()}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {apiKey.scopes.map((scope) => (
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
                            description:
                              "API key copied to clipboard successfully.",
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
                    Allows retrieval of moderation results and request history,
                    but cannot create new moderation requests.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">Write</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Allows creating new moderation requests and managing request
                    feedback. Includes all Read permissions.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">Admin</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Full administrative access, including managing API keys,
                    changing sensitivity thresholds, and account settings.
                    Includes all Read and Write permissions.
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
              Add a new API key to authenticate with our services. You'll only
              see the full key once upon creation.
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
                    checked={newKeyScopes.includes("read")}
                    onCheckedChange={() => handleScopeChange("read")}
                  />
                  <Label htmlFor="scope-read" className="font-normal">
                    Read (View moderation results)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="scope-write"
                    checked={newKeyScopes.includes("write")}
                    onCheckedChange={() => handleScopeChange("write")}
                  />
                  <Label htmlFor="scope-write" className="font-normal">
                    Write (Create moderation requests)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="scope-admin"
                    checked={newKeyScopes.includes("admin")}
                    onCheckedChange={() => handleScopeChange("admin")}
                  />
                  <Label htmlFor="scope-admin" className="font-normal">
                    Admin (Full administrative access)
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateKey}>Create API Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reveal Key Dialog */}
      <Dialog open={isRevealDialogOpen} onOpenChange={setIsRevealDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your New API Key</DialogTitle>
            <DialogDescription>
              This is the only time we'll show you this API key. Please save it
              somewhere safe.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="p-4 bg-muted rounded-md font-mono text-sm break-all">
              {apiKeys[apiKeys.length - 1]?.key}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCopyKey}>
              Copy Key
            </Button>
            <Button onClick={() => setIsRevealDialogOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
