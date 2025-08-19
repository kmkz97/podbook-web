import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AITextEditor from "@/components/AITextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  BookOpen, 
  Download, 
  Eye, 
  Calendar, 
  Clock, 
  FileText, 
  Rss, 
  User,
  Target,
  ArrowLeft,
  Share2,
  Edit3,
  Home,
  Settings,
  ChevronDown,
  LogOut,
  CreditCard,
  Sun,
  Moon
} from "lucide-react";
import { Label } from "@/components/ui/label";

interface Chapter {
  id: string;
  title: string;
  description: string;
  wordCount: number;
  estimatedPages: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  audience: string;
  rss_url: string;
  status: 'processing' | 'completed' | 'failed';
  created_at: string;
  pages_count: number;
  word_count: number;
  chapters_count: number;
  file_size: string;
  format: string;
  estimated_cost: number;
  chapters: Chapter[];
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Simulate loading project data
    setTimeout(() => {
      const mockProject: Project = {
        id: id || '1',
        title: 'Tech News Weekly Digest',
        description: 'A comprehensive compilation of the latest technology news and insights from leading industry sources, curated and organized into a structured book format.',
        author: 'John Doe',
        audience: 'Technology professionals and enthusiasts',
        rss_url: 'https://example.com/tech-news-feed',
        status: 'completed',
        created_at: '2024-01-15',
        pages_count: 124,
        word_count: 45600,
        chapters_count: 8,
        file_size: '2.3 MB',
        format: 'PDF',
        estimated_cost: 25,
        chapters: [
          { id: '1', title: 'Introduction to Tech Trends', description: 'Overview of current technology landscape', wordCount: 1200, estimatedPages: 4 },
          { id: '2', title: 'Artificial Intelligence Breakthroughs', description: 'Latest developments in AI and machine learning', wordCount: 1800, estimatedPages: 6 },
          { id: '3', title: 'Cloud Computing Evolution', description: 'Advances in cloud infrastructure and services', wordCount: 2400, estimatedPages: 8 },
          { id: '4', title: 'Cybersecurity Updates', description: 'New threats and protection strategies', wordCount: 2000, estimatedPages: 7 },
          { id: '5', title: 'Mobile Technology Trends', description: 'Innovations in mobile devices and apps', wordCount: 1600, estimatedPages: 6 },
          { id: '6', title: 'Blockchain Developments', description: 'Cryptocurrency and blockchain technology updates', wordCount: 1400, estimatedPages: 5 },
          { id: '7', title: 'Internet of Things', description: 'Connected devices and smart technology', wordCount: 1200, estimatedPages: 4 },
          { id: '8', title: 'Future Outlook', description: 'Predictions and emerging technologies', wordCount: 800, estimatedPages: 3 },
        ]
      };
      setProject(mockProject);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
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
                        <FileText className="w-4 h-4 mr-3" />
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
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate('/settings')}>
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate('/settings')}>
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
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading project details...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // If editing, show the AI text editor
  if (isEditing) {
    return (
      <div className="min-h-screen bg-background">
        <AITextEditor projectId={project.id} projectTitle={project.title} />
      </div>
    );
  }

  if (!project) {
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
                        <FileText className="w-4 h-4 mr-3" />
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
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate('/settings')}>
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate('/settings')}>
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
            <div className="text-center py-12">
              <p className="text-muted-foreground">Project not found</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
                <Button className="w-full justify-start left-nav-create-book" asChild>
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
                      <FileText className="w-4 h-4 mr-3" />
                      My Projects
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start left-nav-hover" asChild>
                    <Link to="/new-project">
                      <BookOpen className="w-4 h-4 mr-3" />
                      New Book
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start left-nav-hover">
                    <Download className="w-4 h-4 mr-3" />
                    Import RSS
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
                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate('/settings')}>
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate('/settings')}>
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
          <div className="max-w-6xl mx-auto">
            {/* Common Header with Back Button */}
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)} 
                className="mb-4 hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {project.title}
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-3xl">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge variant={project.status === 'completed' ? 'default' : project.status === 'processing' ? 'secondary' : 'destructive'}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Book
                  </Button>
                </div>
              </div>
            </div>

            {/* Project Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{project.pages_count}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Words
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{project.word_count.toLocaleString()}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Chapters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{project.chapters_count}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    File Size
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{project.file_size}</div>
                </CardContent>
              </Card>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Left Column - Project Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Project Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Author</Label>
                        <p className="text-foreground">{project.author}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Target Audience</Label>
                        <p className="text-foreground">{project.audience}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Format</Label>
                        <p className="text-foreground">{project.format}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Created</Label>
                        <p className="text-foreground">{new Date(project.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">RSS Feed</Label>
                      <p className="text-foreground break-all">{project.rss_url}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Chapters List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Chapters</CardTitle>
                    <CardDescription>
                      {project.chapters.length} chapters with {project.word_count.toLocaleString()} total words
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.chapters.map((chapter, index) => (
                        <div key={chapter.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-sm font-medium text-muted-foreground">Chapter {index + 1}</span>
                              <h3 className="font-medium text-foreground">{chapter.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">{chapter.description}</p>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <div>{chapter.wordCount.toLocaleString()} words</div>
                            <div>~{chapter.estimatedPages} pages</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Actions & Quick Info */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" size="lg">
                      <Download className="w-4 h-4 mr-2" />
                      Download Book
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Project
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </CardContent>
                </Card>

                {/* Cost Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cost Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground mb-2">
                        ${project.estimated_cost}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Estimated cost to generate this book
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectDetail;
