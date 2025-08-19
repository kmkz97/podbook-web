import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Ready to create your first book?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform any RSS feed into beautifully formatted books. Perfect for offline reading, 
            content curation, and creating your personal library.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-border bg-background">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-foreground">Free Account</CardTitle>
              <CardDescription className="text-muted-foreground">
                Perfect for getting started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-left space-y-2 text-muted-foreground">
                <li>• Create up to 3 books per month</li>
                <li>• Basic formatting options</li>
                <li>• Standard export formats</li>
                <li>• Community support</li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full border-border text-foreground hover:bg-muted"
                asChild
              >
                <Link to="/signup">Start Free</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-background">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-foreground">Pro Account</CardTitle>
              <CardDescription className="text-muted-foreground">
                For power users and creators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-left space-y-2 text-muted-foreground">
                <li>• Unlimited books</li>
                <li>• Advanced formatting</li>
                <li>• Premium export formats</li>
                <li>• Priority support</li>
                <li>• Custom branding</li>
              </ul>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <Link to="/signup">Go Pro</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Already have an account?
          </p>
          <Button variant="ghost" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-muted-foreground hover:text-foreground text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
