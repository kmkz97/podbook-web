import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import LeftNavigation from "@/components/LeftNavigation";
import BookCard from "@/components/BookCard";

interface Project {
  id: string;
  title: string;
  status: 'processing' | 'completed' | 'failed';
  edited_at?: string;
  word_count?: number;
  pages_count?: number;
}

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'Tech News Weekly',
      status: 'completed',
      edited_at: '2024-01-15',
      word_count: 45000,
      pages_count: 124
    },
    {
      id: '2',
      title: 'Design Inspiration Daily',
      status: 'processing',
      edited_at: '2024-01-20'
    },
    {
      id: '3',
      title: 'Industry Updates',
      status: 'failed',
      edited_at: '2024-01-18'
    },
    {
      id: '4',
      title: 'Marketing Insights',
      status: 'completed',
      edited_at: '2024-01-10',
      word_count: 32000,
      pages_count: 89
    },
    {
      id: '5',
      title: 'Science Breakthroughs',
      status: 'completed',
      edited_at: '2024-01-05',
      word_count: 58000,
      pages_count: 156
    }
  ]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });



  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
                <LeftNavigation activePage="projects" />

        {/* Main Content Area */}
        <main className="flex-1 p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-medium text-foreground mb-2">
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
        <div className="mb-8">
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
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <BookCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No projects found
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm 
                ? "Try adjusting your search criteria."
                : "Create your first RSS-to-book project to get started."
              }
            </p>
            {!searchTerm && (
              <Button asChild className="gradient-primary">
                <Link to="/new-project">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Project
                </Link>
              </Button>
            )}
            </div>
        )}
        </main>
      </div>
    </div>
  );
};

export default Projects;