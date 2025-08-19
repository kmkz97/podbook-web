import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Filter, Download, Eye, Trash2, Plus, Calendar, Clock, Home, FileText, Settings, User, ChevronDown } from "lucide-react";

interface Project {
  id: string;
  title: string;
  rss_url: string;
  status: 'processing' | 'completed' | 'failed';
  created_at: string;
  pages_count?: number;
  file_size?: string;
}

const Dashboard = () => {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'Tech News Weekly',
      rss_url: 'https://example.com/tech-news',
      status: 'completed',
      created_at: '2024-01-15',
      pages_count: 124,
      file_size: '2.3 MB'
    },
    {
      id: '2',
      title: 'Design Inspiration Daily',
      rss_url: 'https://example.com/design-feed',
      status: 'processing',
      created_at: '2024-01-20'
    },
    {
      id: '3',
      title: 'Industry Updates',
      rss_url: 'https://example.com/industry',
      status: 'failed',
      created_at: '2024-01-18'
    },
    {
      id: '4',
      title: 'Marketing Insights',
      rss_url: 'https://example.com/marketing',
      status: 'completed',
      created_at: '2024-01-10',
      pages_count: 89,
      file_size: '1.8 MB'
    },
    {
      id: '5',
      title: 'Science Breakthroughs',
      rss_url: 'https://example.com/science',
      status: 'completed',
      created_at: '2024-01-05',
      pages_count: 156,
      file_size: '3.1 MB'
    }
  ]);

  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const processingProjects = projects.filter(p => p.status === 'processing').length;
  const totalPages = projects
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + (p.pages_count || 0), 0);

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default',
      processing: 'secondary',
      failed: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
          {/* Logo Section */}
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-foreground">Podbook</h1>
          </div>
          
          {/* Navigation Content */}
          <div className="flex-1 p-6">
            <nav className="space-y-6">
              {/* Main Navigation */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                  Main
                </h3>
                <div className="space-y-2">
                  <Button variant="default" className="w-full justify-start" asChild>
                    <Link to="/dashboard">
                      <Home className="w-4 h-4 mr-3" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/projects">
                      <FileText className="w-4 h-4 mr-3" />
                      My Projects
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/new-project">
                      <Plus className="w-4 h-4 mr-3" />
                      Create Book
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
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/new-project">
                    <BookOpen className="w-4 h-4 mr-3" />
                    New Book
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-3" />
                  Import RSS
                </Button>
              </div>
            </div>
          </nav>
        </div>
        
        {/* Sticky User Section at Bottom */}
        <div className="mt-auto p-6 border-t border-border">
          <div className="group relative">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Pro Account</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            
            {/* Settings Dropdown - appears on hover */}
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-background border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
              <div className="p-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-3" />
                  Export Data
                </Button>
              </div>
            </div>
          </div>
        </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome back!
            </h1>
            <p className="text-lg text-muted-foreground">
              Here's what's happening with your projects today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{projects.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{completedProjects}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{processingProjects}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{totalPages}</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Recent Projects</CardTitle>
              <CardDescription>
                Your latest RSS-to-book conversions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <BookOpen className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-medium text-foreground">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.rss_url}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(project.status)}
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/projects/${project.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;