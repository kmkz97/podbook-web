import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Download, Eye, Trash2, Plus, Calendar, Clock, Home, FileText, Settings, User, ChevronDown, LogOut, CreditCard, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

interface Project {
  id: string;
  title: string;
  rss_url: string;
  status: 'processing' | 'completed' | 'failed';
  created_at: string;
  pages_count?: number;
  file_size?: string;
}

const Projects = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  
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

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.rss_url.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'success',
      processing: 'warning',
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
                    <Plus className="w-4 h-4 mr-3" />
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
          
          {/* Sticky User Section at Bottom */}
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
                                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground border-b border-border mb-2 settings-dropdown">
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              My Projects
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage and download your RSS-to-book conversions
            </p>
          </div>
          
          <Button asChild size="lg" className="gradient-primary mt-4 sm:mt-0">
            <Link to="/new-project">
              <Plus className="h-5 w-5 mr-2" />
              New Project
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              

            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="gradient-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold mb-2">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm break-all">
                      {project.rss_url}
                    </CardDescription>
                  </div>
                  {getStatusBadge(project.status)}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(project.created_at).toLocaleDateString()}
                    </div>
                    {project.pages_count && (
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {project.pages_count} pages
                      </div>
                    )}
                    {project.file_size && (
                      <div className="text-xs">
                        {project.file_size}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/projects/${project.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    
                    {project.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    )}
                    
                    {project.status === 'processing' && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/processing/${project.id}`}>
                          <Clock className="h-4 w-4 mr-1" />
                          Track Progress
                        </Link>
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "Create your first RSS-to-book project to get started."
                }
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Button asChild className="gradient-primary">
                  <Link to="/new-project">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your First Project
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
        </main>
      </div>
    </div>
  );
};

export default Projects;