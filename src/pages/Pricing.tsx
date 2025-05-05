
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type PlanType = "monthly" | "annual";
type PlanTier = "free" | "pro" | "enterprise";

interface PlanFeature {
  title: string;
  tiers: {
    [key in PlanTier]: string | boolean;
  };
}

export default function Pricing() {
  const [planType, setPlanType] = useState<PlanType>("monthly");
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  
  const planPricing = {
    free: { monthly: "$0", annual: "$0" },
    pro: { monthly: "$49", annual: "$39" },
    enterprise: { monthly: "$199", annual: "$159" },
  };
  
  const planFeatures: PlanFeature[] = [
    {
      title: "API Requests/month",
      tiers: { free: "10,000", pro: "100,000", enterprise: "1,000,000+" }
    },
    {
      title: "Text Analysis",
      tiers: { free: true, pro: true, enterprise: true }
    },
    {
      title: "Image Analysis",
      tiers: { free: "Limited", pro: true, enterprise: true }
    },
    {
      title: "API Keys",
      tiers: { free: "1", pro: "5", enterprise: "Unlimited" }
    },
    {
      title: "Request History",
      tiers: { free: "7 days", pro: "30 days", enterprise: "1 year" }
    },
    {
      title: "Data Export",
      tiers: { free: false, pro: true, enterprise: true }
    },
    {
      title: "Custom Moderation Rules",
      tiers: { free: false, pro: true, enterprise: true }
    },
    {
      title: "Team Access",
      tiers: { free: false, pro: "Up to 3", enterprise: "Unlimited" }
    },
    {
      title: "Priority Support",
      tiers: { free: false, pro: "Email", enterprise: "Email & Phone" }
    },
    {
      title: "SLA Guarantee",
      tiers: { free: false, pro: false, enterprise: true }
    },
  ];
  
  const handleSelectPlan = (tier: PlanTier) => {
    if (isAuthenticated) {
      // If authenticated, redirect to billing page or update plan
      navigate("/settings");
    } else {
      // If not authenticated, redirect to signup
      navigate("/signup");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
                Choose the plan that fits your needs. All plans include our core moderation features.
              </p>
              
              <div className="flex items-center space-x-4 mt-6">
                <Button
                  variant={planType === "monthly" ? "default" : "outline"}
                  onClick={() => setPlanType("monthly")}
                >
                  Monthly
                </Button>
                <Button
                  variant={planType === "annual" ? "default" : "outline"}
                  onClick={() => setPlanType("annual")}
                >
                  Annual
                  <Badge variant="secondary" className="ml-2">Save 20%</Badge>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {/* Free Plan */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>For individuals and small projects</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{planPricing.free[planType]}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2">
                    {planFeatures.map((feature) => (
                      <li key={feature.title} className="flex items-start">
                        {feature.tiers.free ? (
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        ) : (
                          <span className="h-5 w-5 text-gray-300 mr-2">—</span>
                        )}
                        <span>
                          {feature.title}
                          {typeof feature.tiers.free === "string" && (
                            <span className="text-muted-foreground ml-1">
                              ({feature.tiers.free})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleSelectPlan("free")}
                  >
                    {user?.plan === "free" ? "Current Plan" : "Get Started"}
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Pro Plan */}
              <Card className="flex flex-col border-primary">
                <CardHeader className="bg-primary/5">
                  <Badge className="w-fit mb-2">Popular</Badge>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{planPricing.pro[planType]}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2">
                    {planFeatures.map((feature) => (
                      <li key={feature.title} className="flex items-start">
                        {feature.tiers.pro ? (
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        ) : (
                          <span className="h-5 w-5 text-gray-300 mr-2">—</span>
                        )}
                        <span>
                          {feature.title}
                          {typeof feature.tiers.pro === "string" && (
                            <span className="text-muted-foreground ml-1">
                              ({feature.tiers.pro})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => handleSelectPlan("pro")}
                  >
                    {user?.plan === "pro" ? "Current Plan" : "Upgrade to Pro"}
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Enterprise Plan */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large organizations and high volume</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{planPricing.enterprise[planType]}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2">
                    {planFeatures.map((feature) => (
                      <li key={feature.title} className="flex items-start">
                        {feature.tiers.enterprise ? (
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        ) : (
                          <span className="h-5 w-5 text-gray-300 mr-2">—</span>
                        )}
                        <span>
                          {feature.title}
                          {typeof feature.tiers.enterprise === "string" && (
                            <span className="text-muted-foreground ml-1">
                              ({feature.tiers.enterprise})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleSelectPlan("enterprise")}
                  >
                    {user?.plan === "enterprise" ? "Current Plan" : "Contact Sales"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Need a custom plan? Have questions?
              </p>
              <Link to="/contact">
                <Button variant="link">Contact our sales team</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
