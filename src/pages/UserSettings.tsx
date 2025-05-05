
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function UserSettings() {
  const [email, setEmail] = useState("johndoe@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [tipsBest, setTipsBest] = useState(false);
  
  const [toxicityThreshold, setToxicityThreshold] = useState(0.7);
  const [harassmentThreshold, setHarassmentThreshold] = useState(0.65);
  const [hateThreshold, setHateThreshold] = useState(0.6);
  const [sexualThreshold, setSexualThreshold] = useState(0.8);
  const [violenceThreshold, setViolenceThreshold] = useState(0.75);
  const [spamThreshold, setSpamThreshold] = useState(0.85);
  
  const [autoRejectToxic, setAutoRejectToxic] = useState(false);
  const [autoRejectViolence, setAutoRejectViolence] = useState(true);
  const [autoRejectHate, setAutoRejectHate] = useState(true);
  const [autoRejectSexual, setAutoRejectSexual] = useState(true);
  
  const handleUpdateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please ensure your passwords match."
      });
      return;
    }
    
    toast({
      title: "Account updated",
      description: "Your account details have been updated successfully."
    });
  };
  
  const handleUpdateNotifications = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been saved."
    });
  };
  
  const handleUpdateModerationSettings = () => {
    toast({
      title: "Moderation settings updated",
      description: "Your moderation settings have been saved."
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">User Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and settings</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <Tabs defaultValue="account" orientation="vertical" className="h-full">
                <TabsList className="flex flex-col h-full w-full bg-card rounded-lg border border-border p-1">
                  <TabsTrigger value="account" className="justify-start w-full">
                    Account
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="justify-start w-full">
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="moderation" className="justify-start w-full">
                    Moderation Settings
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="md:col-span-9">
              <Tabs defaultValue="account">
                <TabsContent value="account" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Update your account details and password</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleUpdateAccount} className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                              id="currentPassword"
                              type="password"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                              id="newPassword"
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button type="submit">Save Changes</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Email Notifications</CardTitle>
                      <CardDescription>Manage which emails you receive</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Enable or disable all email notifications</p>
                          </div>
                          <Switch
                            id="emailNotifications"
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="weeklyReports" className="font-medium">Weekly Summary Reports</Label>
                              <p className="text-sm text-muted-foreground">Get a weekly summary of your moderation activity</p>
                            </div>
                            <Switch
                              id="weeklyReports"
                              checked={weeklyReports}
                              onCheckedChange={setWeeklyReports}
                              disabled={!emailNotifications}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="criticalAlerts" className="font-medium">Critical Alerts</Label>
                              <p className="text-sm text-muted-foreground">Receive alerts for critical events like API key changes or suspicious activity</p>
                            </div>
                            <Switch
                              id="criticalAlerts"
                              checked={criticalAlerts}
                              onCheckedChange={setCriticalAlerts}
                              disabled={!emailNotifications}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="tipsBest" className="font-medium">Tips & Best Practices</Label>
                              <p className="text-sm text-muted-foreground">Receive occasional emails about tips, best practices, and new features</p>
                            </div>
                            <Switch
                              id="tipsBest"
                              checked={tipsBest}
                              onCheckedChange={setTipsBest}
                              disabled={!emailNotifications}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleUpdateNotifications}>Save Preferences</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="moderation" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Moderation Thresholds</CardTitle>
                      <CardDescription>Set your content moderation sensitivity thresholds</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="toxicity-threshold">Toxicity Threshold: {toxicityThreshold.toFixed(2)}</Label>
                            <Badge variant="outline">{Math.round(toxicityThreshold * 100)}%</Badge>
                          </div>
                          <Slider
                            id="toxicity-threshold"
                            min={0.1}
                            max={0.9}
                            step={0.05}
                            value={[toxicityThreshold]}
                            onValueChange={(value) => setToxicityThreshold(value[0])}
                          />
                          <p className="text-xs text-muted-foreground">Lower values will flag more content as toxic</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="harassment-threshold">Harassment Threshold: {harassmentThreshold.toFixed(2)}</Label>
                            <Badge variant="outline">{Math.round(harassmentThreshold * 100)}%</Badge>
                          </div>
                          <Slider
                            id="harassment-threshold"
                            min={0.1}
                            max={0.9}
                            step={0.05}
                            value={[harassmentThreshold]}
                            onValueChange={(value) => setHarassmentThreshold(value[0])}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="hate-threshold">Hate Speech Threshold: {hateThreshold.toFixed(2)}</Label>
                            <Badge variant="outline">{Math.round(hateThreshold * 100)}%</Badge>
                          </div>
                          <Slider
                            id="hate-threshold"
                            min={0.1}
                            max={0.9}
                            step={0.05}
                            value={[hateThreshold]}
                            onValueChange={(value) => setHateThreshold(value[0])}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="sexual-threshold">Sexual Content Threshold: {sexualThreshold.toFixed(2)}</Label>
                            <Badge variant="outline">{Math.round(sexualThreshold * 100)}%</Badge>
                          </div>
                          <Slider
                            id="sexual-threshold"
                            min={0.1}
                            max={0.9}
                            step={0.05}
                            value={[sexualThreshold]}
                            onValueChange={(value) => setSexualThreshold(value[0])}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="violence-threshold">Violence Threshold: {violenceThreshold.toFixed(2)}</Label>
                            <Badge variant="outline">{Math.round(violenceThreshold * 100)}%</Badge>
                          </div>
                          <Slider
                            id="violence-threshold"
                            min={0.1}
                            max={0.9}
                            step={0.05}
                            value={[violenceThreshold]}
                            onValueChange={(value) => setViolenceThreshold(value[0])}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="spam-threshold">Spam Threshold: {spamThreshold.toFixed(2)}</Label>
                            <Badge variant="outline">{Math.round(spamThreshold * 100)}%</Badge>
                          </div>
                          <Slider
                            id="spam-threshold"
                            min={0.1}
                            max={0.9}
                            step={0.05}
                            value={[spamThreshold]}
                            onValueChange={(value) => setSpamThreshold(value[0])}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Auto-Rejection Settings</CardTitle>
                      <CardDescription>Configure which content types are automatically rejected</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="autoRejectToxic" className="font-medium">Auto-reject Toxic Content</Label>
                            <p className="text-sm text-muted-foreground">Automatically reject content that exceeds the toxicity threshold</p>
                          </div>
                          <Switch
                            id="autoRejectToxic"
                            checked={autoRejectToxic}
                            onCheckedChange={setAutoRejectToxic}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="autoRejectViolence" className="font-medium">Auto-reject Violent Content</Label>
                            <p className="text-sm text-muted-foreground">Automatically reject content that exceeds the violence threshold</p>
                          </div>
                          <Switch
                            id="autoRejectViolence"
                            checked={autoRejectViolence}
                            onCheckedChange={setAutoRejectViolence}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="autoRejectHate" className="font-medium">Auto-reject Hate Speech</Label>
                            <p className="text-sm text-muted-foreground">Automatically reject content that exceeds the hate speech threshold</p>
                          </div>
                          <Switch
                            id="autoRejectHate"
                            checked={autoRejectHate}
                            onCheckedChange={setAutoRejectHate}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="autoRejectSexual" className="font-medium">Auto-reject Sexual Content</Label>
                            <p className="text-sm text-muted-foreground">Automatically reject content that exceeds the sexual content threshold</p>
                          </div>
                          <Switch
                            id="autoRejectSexual"
                            checked={autoRejectSexual}
                            onCheckedChange={setAutoRejectSexual}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleUpdateModerationSettings}>Save Settings</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
