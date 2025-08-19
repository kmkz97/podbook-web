import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Filter, Download, Eye, Trash2, Plus, Calendar, Clock } from "lucide-react";
import LeftNavigation from "@/components/LeftNavigation";

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
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
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
        <LeftNavigation activePage="dashboard" />

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
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Recent Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <BookOpen className="h-6 w-6 text-primary mt-1" />
                    {getStatusBadge(project.status)}
                  </div>
                  <h3 className="font-medium text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.rss_url}</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to={project.status === 'processing' || project.status === 'failed' ? `/processing/${project.id}` : `/projects/${project.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      {project.status === 'processing' ? 'View Processing' : project.status === 'failed' ? 'Retry Project' : 'View Project'}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;