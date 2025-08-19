import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import AITextEditor from "@/components/AITextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Edit3
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
        <DashboardHeader />
        <div className="container mx-auto px-4 py-8 mt-20">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading project details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="container mx-auto px-4 py-8 mt-20">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h2>
            <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If editing, show the AI text editor
  if (isEditing) {
    console.log('isEditing is true, rendering AITextEditor');
    console.log('Project data:', project);
    return (
      <div className="min-h-screen bg-background">
        <div className="p-4 bg-red-100 border border-red-500">
          <p>Debug: About to render AITextEditor</p>
          <p>isEditing: {isEditing.toString()}</p>
          <p>Project ID: {project?.id}</p>
        </div>
        <AITextEditor projectId={project.id} projectTitle={project.title} />
      </div>
    );
  }

  console.log('isEditing is false, rendering project details, isEditing value:', isEditing);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" asChild className="mb-4">
            <Link to="/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-foreground">{project.title}</h1>
                <Badge variant={project.status === 'completed' ? 'default' : project.status === 'processing' ? 'secondary' : 'destructive'}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {project.author}
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  {project.audience}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(project.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" onClick={() => {
                console.log('Edit button clicked, setting isEditing to true');
                setIsEditing(true);
                console.log('isEditing state:', true);
              }}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
              {project.status === 'completed' && (
                <Button className="bg-primary hover:bg-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Download {project.format}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{project.pages_count}</div>
              <div className="text-sm text-muted-foreground">Total Pages</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{project.word_count.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Word Count</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Rss className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{project.chapters_count}</div>
              <div className="text-sm text-muted-foreground">Chapters</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{project.file_size}</div>
              <div className="text-sm text-muted-foreground">File Size</div>
            </CardContent>
          </Card>
        </div>

        {/* Chapter Structure */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Chapter Structure</CardTitle>
            <CardDescription>Detailed breakdown of your book's content organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.chapters.map((chapter, index) => (
                <div key={chapter.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">Chapter {index + 1}: {chapter.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{chapter.description}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">{chapter.wordCount.toLocaleString()} words</div>
                    <div className="text-muted-foreground">~{chapter.estimatedPages} pages</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Source Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">RSS Feed URL</Label>
                <p className="text-sm text-muted-foreground break-all mt-1">{project.rss_url}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Output Format</Label>
                <p className="text-sm text-muted-foreground mt-1">{project.format}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Generation Cost</Label>
                <p className="text-sm text-muted-foreground mt-1">{project.estimated_cost} credits</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                Preview Book
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="w-4 h-4 mr-2" />
                Share Project
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => {
                console.log('Edit Project button clicked, setting isEditing to true');
                setIsEditing(true);
                console.log('isEditing state:', true);
              }}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Project
              </Button>
              {project.status === 'completed' && (
                <Button className="w-full justify-start bg-primary hover:bg-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Download {project.format}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
