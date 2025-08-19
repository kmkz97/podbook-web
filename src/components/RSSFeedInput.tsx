import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rss, BookOpen, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RSSFeedInput = () => {
  const [feedUrl, setFeedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedUrl.trim()) return;

    setIsLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Book Generation Started!",
        description: "Your RSS feed is being converted into a beautiful book. We'll notify you when it's ready.",
      });
      setFeedUrl("");
    }, 2000);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Convert Your First RSS Feed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter any RSS feed URL below and watch as Inprint transforms it into a professionally formatted book.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rss className="w-5 h-5 text-accent" />
                RSS Feed Input
              </CardTitle>
              <CardDescription>
                Paste your RSS feed URL to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="url"
                  placeholder="https://example.com/feed.xml"
                  value={feedUrl}
                  onChange={(e) => setFeedUrl(e.target.value)}
                  className="text-lg py-6"
                />
                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Converting to Book...
                    </>
                  ) : (
                    <>
                      <BookOpen className="mr-2 w-5 h-5" />
                      Convert to Book
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Your Generated Book
              </CardTitle>
              <CardDescription>
                Preview how your book will look
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-6 text-center">
                <div className="w-24 h-32 bg-gradient-accent rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Your Book Title</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Generated from your RSS feed
                </p>
                <Button variant="outline" size="sm" disabled>
                  <Download className="mr-2 w-4 h-4" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RSSFeedInput;