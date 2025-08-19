import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Rss, Settings, Sparkles, ArrowRight, CheckCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    rssUrl: "",
    projectTitle: "",
    description: "",
    bookFormat: "pdf",
    pageSize: "a4",
    includeImages: true,
    includeTOC: true,
    maxArticles: "50",
    dateRange: "30"
  });

  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rssValid, setRssValid] = useState<boolean | null>(null);

  const validateRSSFeed = async () => {
    if (!formData.rssUrl) return;
    
    setIsValidating(true);
    // Simulate RSS validation
    setTimeout(() => {
      setRssValid(true);
      setIsValidating(false);
      toast({
        title: "RSS Feed Validated",
        description: "Found 25 recent articles ready for conversion.",
      });
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate project creation
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Project Created Successfully",
        description: "Your RSS-to-book conversion has started.",
      });
      navigate("/processing/new");
    }, 2000);
  };

  const formatOptions = [
    { value: "pdf", label: "PDF", description: "Best for reading and printing" },
    { value: "epub", label: "EPUB", description: "Compatible with e-readers" },
    { value: "mobi", label: "MOBI", description: "Kindle compatible" }
  ];

  const pageSizeOptions = [
    { value: "a4", label: "A4 (8.3 × 11.7 in)" },
    { value: "letter", label: "Letter (8.5 × 11 in)" },
    { value: "a5", label: "A5 (5.8 × 8.3 in)" },
    { value: "pocket", label: "Pocket (4.25 × 6.87 in)" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
              Create New Book Project
            </h1>
            <p className="text-lg text-muted-foreground">
              Transform your favorite RSS feed into a beautifully formatted book
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* RSS Feed Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Rss className="h-5 w-5 mr-2 text-primary" />
                  RSS Feed Source
                </CardTitle>
                <CardDescription>
                  Enter the RSS feed URL you want to convert into a book
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="rss-url">RSS Feed URL</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="rss-url"
                      type="url"
                      placeholder="https://example.com/feed.xml"
                      value={formData.rssUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, rssUrl: e.target.value }))}
                      className={rssValid === true ? "border-success" : rssValid === false ? "border-destructive" : ""}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={validateRSSFeed}
                      disabled={!formData.rssUrl || isValidating}
                    >
                      {isValidating ? "Validating..." : "Validate"}
                    </Button>
                  </div>
                  {rssValid === true && (
                    <div className="flex items-center mt-2 text-success text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      RSS feed is valid and accessible
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="project-title">Project Title</Label>
                  <Input
                    id="project-title"
                    placeholder="My RSS Book Collection"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectTitle: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your book project..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Book Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  Book Configuration
                </CardTitle>
                <CardDescription>
                  Customize how your book will be formatted and structured
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Book Format</Label>
                    <Select value={formData.bookFormat} onValueChange={(value) => setFormData(prev => ({ ...prev, bookFormat: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formatOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-xs text-muted-foreground">{option.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Page Size</Label>
                    <Select value={formData.pageSize} onValueChange={(value) => setFormData(prev => ({ ...prev, pageSize: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {pageSizeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Content Options</h4>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-images"
                      checked={formData.includeImages}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeImages: !!checked }))}
                    />
                    <Label htmlFor="include-images" className="text-sm">
                      Include images from articles
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-toc"
                      checked={formData.includeTOC}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeTOC: !!checked }))}
                    />
                    <Label htmlFor="include-toc" className="text-sm">
                      Generate table of contents
                    </Label>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="max-articles">Maximum Articles</Label>
                    <Select value={formData.maxArticles} onValueChange={(value) => setFormData(prev => ({ ...prev, maxArticles: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25 articles</SelectItem>
                        <SelectItem value="50">50 articles</SelectItem>
                        <SelectItem value="100">100 articles</SelectItem>
                        <SelectItem value="200">200 articles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="date-range">Date Range</Label>
                    <Select value={formData.dateRange} onValueChange={(value) => setFormData(prev => ({ ...prev, dateRange: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                        <SelectItem value="365">Last year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview & Create */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-primary" />
                  Ready to Create
                </CardTitle>
                <CardDescription>
                  Review your settings and start the book generation process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{formData.bookFormat.toUpperCase()}</Badge>
                    <Badge variant="secondary">{formData.pageSize.toUpperCase()}</Badge>
                    <Badge variant="secondary">Max {formData.maxArticles} articles</Badge>
                    <Badge variant="secondary">{formData.dateRange} days</Badge>
                  </div>

                  <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
                    <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground mb-1">Processing Time</p>
                      <p className="text-muted-foreground">
                        Book generation typically takes 5-15 minutes depending on the number of articles and complexity. 
                        You'll receive an email notification when it's ready.
                      </p>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full gradient-primary"
                    disabled={!formData.rssUrl || !formData.projectTitle || isSubmitting}
                  >
                    {isSubmitting ? (
                      "Creating Project..."
                    ) : (
                      <>
                        Create Book Project
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewProject;