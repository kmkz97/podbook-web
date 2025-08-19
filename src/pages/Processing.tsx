import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
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
  Sparkles,
  Home,
  FileText as FileTextIcon,
  Settings,
  User,
  ChevronDown,
  LogOut,
  CreditCard,
  Sun,
  Moon
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
  const { theme, toggleTheme } = useTheme();
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
          if (index === 3 && progress > 60) return { ...step, status: 'processing' as const };
          if (index === 4 && progress > 80) return { ...step, status: 'processing' as const };
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
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'processing':
        return <Clock className="w-6 h-6 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <IconComponent className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStepStatus = (step: ProcessingStep) => {
    switch (step.status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
          {/* Logo Section */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground">Podbook</h1>
          </div>
          
          {/* Navigation Content */}
          <div className="flex-1 p-6">
            <nav className="space-y-6">
              {/* Create Book Button */}
              <div>
                <Button variant="default" className="w-full justify-start" asChild>
                  <Link to="/new-project">
                    <BookOpen className="w-4 h-4 mr-3" />
                    Create Book
                  </Link>
                </Button>
              </div>
              
              {/* Navigation */}
              <div>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/dashboard">
                      <Home className="w-4 h-4 mr-3" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="default" className="w-full justify-start" asChild>
                    <Link to="/projects">
                      <FileTextIcon className="w-4 h-4 mr-3" />
                      My Projects
                    </Link>
                  </Button>
                </div>
              </div>
            </nav>
          </div>

          {/* User Section - Sticky Bottom */}
          <div className="mt-auto p-6 border-t border-border">
            <div className="group relative">
              <div className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Pro Account</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>

              {/* Settings Dropdown - appears on hover and stays open */}
              <div className="absolute bottom-full left-0 right-0 mb-0 bg-background border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto hover:opacity-100">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground border-b border-border mb-2">
                    Credits 2392
                  </div>
                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => window.location.href = '/settings'}>
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => window.location.href = '/settings'}>
                    <CreditCard className="w-4 h-4 mr-3" />
                    Billing and Plan
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={toggleTheme}>
                    {theme === 'dark' ? <Sun className="w-4 h-4 mr-3" /> : <Moon className="w-4 h-4 mr-3" />}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Project Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Processing: {projectInfo.title}
                  </h1>
                  <p className="text-muted-foreground">
                    RSS Feed: {projectInfo.rssUrl}
                  </p>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {projectInfo.format} Format
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{projectInfo.articlesFound}</div>
                  <div className="text-sm text-muted-foreground">Articles Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">~{projectInfo.estimatedPages}</div>
                  <div className="text-sm text-muted-foreground">Estimated Pages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{progress}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
                <CardDescription>
                  Book generation is in progress. This may take several minutes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>Started: {new Date(projectInfo.startTime).toLocaleTimeString()}</span>
                  <span>ETA: ~{Math.max(1, Math.ceil((100 - progress) / 5))} minutes</span>
                </div>
              </CardContent>
            </Card>

            {/* Processing Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Processing Steps</CardTitle>
                <CardDescription>
                  Current status of each processing step
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStepIcon(step)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-foreground">
                            {step.title}
                          </h4>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getStepStatus(step)}`}
                          >
                            {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download Preview
              </Button>
              <Button variant="outline" size="lg">
                <AlertCircle className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Processing;