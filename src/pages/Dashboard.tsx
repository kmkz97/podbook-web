import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface Project {
  id: string;
  title: string;
  rss_url: string;
  status: 'processing' | 'completed' | 'failed';
  created_at: string;
  pages_count?: number;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Tech News Weekly',
      rss_url: 'https://example.com/tech-news',
      status: 'completed',
      created_at: '2024-01-15',
      pages_count: 124
    },
    {
      id: '2',
      title: 'Design Inspiration',
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
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-warning animate-pulse" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

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

  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const processingProjects = projects.filter(p => p.status === 'processing').length;
  const totalPages = projects.reduce((sum, p) => sum + (p.pages_count || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
            Welcome back!
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your RSS-to-book projects and track their progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{projects.length}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Books
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{completedProjects}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{processingProjects}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card">
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

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button asChild size="lg" className="gradient-primary">
            <Link to="/new-project">
              <Plus className="h-5 w-5 mr-2" />
              Create New Book
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link to="/projects">
              <BookOpen className="h-5 w-5 mr-2" />
              View All Projects
            </Link>
          </Button>
        </div>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-serif">Recent Projects</CardTitle>
            <CardDescription>
              Your latest RSS-to-book conversions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(project.status)}
                    <div>
                      <h3 className="font-medium text-foreground">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Created on {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {project.pages_count && (
                      <span className="text-sm text-muted-foreground">
                        {project.pages_count} pages
                      </span>
                    )}
                    {getStatusBadge(project.status)}
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/projects/${project.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;