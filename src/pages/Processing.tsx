import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Download, 
  AlertCircle, 
  Rss,
  FileText,
  Image,
  Layers,
  Sparkles
} from "lucide-react";

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  icon: typeof Clock;
}

const Processing = () => {
  const { id } = useParams();
  const [progress, setProgress] = useState(15);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [projectInfo] = useState({
    id: id || 'new',
    title: 'Tech News Weekly',
    rssUrl: 'https://example.com/tech-news',
    format: 'PDF',
    articlesFound: 25,
    estimatedPages: 120,
    startTime: new Date().toISOString()
  });

  const [steps, setSteps] = useState<ProcessingStep[]>([
    {
      id: '1',
      title: 'Fetching RSS Feed',
      description: 'Downloading and parsing RSS feed content',
      status: 'completed',
      icon: Rss
    },
    {
      id: '2',
      title: 'Processing Articles',
      description: 'Extracting and cleaning article content',
      status: 'processing',
      icon: FileText
    },
    {
      id: '3',
      title: 'Processing Images',
      description: 'Downloading and optimizing images',
      status: 'pending',
      icon: Image
    },
    {
      id: '4',
      title: 'Generating Layout',
      description: 'Creating book structure and formatting',
      status: 'pending',
      icon: Layers
    },
    {
      id: '5',
      title: 'Final Assembly',
      description: 'Compiling final book file',
      status: 'pending',
      icon: Sparkles
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });

      // Update steps based on progress
      setSteps(prevSteps => {
        return prevSteps.map((step, index) => {
          if (index === 0) return { ...step, status: 'completed' as const };
          if (index === 1 && progress > 30) return { ...step, status: 'completed' as const };
          if (index === 2 && progress > 30 && progress <= 60) return { ...step, status: 'processing' as const };
          if (index === 2 && progress > 60) return { ...step, status: 'completed' as const };
          if (index === 3 && progress > 60 && progress <= 85) return { ...step, status: 'processing' as const };
          if (index === 3 && progress > 85) return { ...step, status: 'completed' as const };
          if (index === 4 && progress > 85) return { ...step, status: 'processing' as const };
          return step;
        });
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [progress]);

  const getStepIcon = (step: ProcessingStep) => {
    const IconComponent = step.icon;
    
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'processing':
        return <IconComponent className="h-5 w-5 text-primary animate-pulse" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      default:
        return <IconComponent className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'processing':
        return <Badge variant="warning">Processing</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const isCompleted = progress >= 100;
  const hasError = steps.some(step => step.status === 'error');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
              {isCompleted ? 'Book Ready!' : 'Creating Your Book'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isCompleted 
                ? 'Your RSS feed has been successfully converted to a book'
                : 'Please wait while we convert your RSS feed into a beautiful book'
              }
            </p>
          </div>

          {/* Project Info */}
          <Card className="mb-8 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                {projectInfo.title}
              </CardTitle>
              <CardDescription>
                {projectInfo.rssUrl}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{projectInfo.articlesFound}</div>
                  <div className="text-sm text-muted-foreground">Articles</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">~{projectInfo.estimatedPages}</div>
                  <div className="text-sm text-muted-foreground">Pages</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{projectInfo.format}</div>
                  <div className="text-sm text-muted-foreground">Format</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{Math.round(progress)}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Processing Progress
                </span>
                {isCompleted && (
                  <Badge variant="success" className="text-sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Completed
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Started {new Date(projectInfo.startTime).toLocaleTimeString()}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Processing Steps</CardTitle>
              <CardDescription>
                Track the progress of your book creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={step.id}>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStepIcon(step)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-medium text-foreground">
                            {step.title}
                          </h3>
                          {getStatusBadge(step.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isCompleted ? (
              <>
                <Button size="lg" className="gradient-primary">
                  <Download className="h-5 w-5 mr-2" />
                  Download Book
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/projects">
                    View All Projects
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/dashboard">
                    Return to Dashboard
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/new-project">
                    Create Another Book
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Estimated Time */}
          {!isCompleted && (
            <Card className="mt-8 bg-muted/30">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Estimated time remaining: {Math.max(1, Math.round((100 - progress) / 10))} minutes
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    You'll receive an email notification when your book is ready
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Processing;