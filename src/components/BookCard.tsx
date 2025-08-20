import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Eye, Edit, Download, Clock } from "lucide-react";
import StatusChip from "./StatusChip";

interface BookCardProps {
  project: {
    id: string;
    title: string;
    status: 'processing' | 'completed' | 'failed';
    edited_at?: string;
    word_count?: number;
    pages_count?: number;
  };
  showActions?: boolean;
}

const BookCard = ({ project, showActions = true }: BookCardProps) => {
  const isCompleted = project.status === 'completed';
  const isProcessing = project.status === 'processing';
  const isFailed = project.status === 'failed';

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <BookOpen className="h-6 w-6 text-primary mt-1" />
        <StatusChip status={project.status} />
      </div>
      
      <h3 className="font-medium text-foreground mb-2">{project.title}</h3>
      
      <div className="space-y-2 mb-4">
        {project.edited_at && (
          <div className="text-xs text-muted-foreground">
            Edited: {new Date(project.edited_at).toLocaleDateString()}
          </div>
        )}
        {project.word_count && (
          <div className="text-xs text-muted-foreground">
            {project.word_count.toLocaleString()} words
          </div>
        )}
        {project.pages_count && (
          <div className="text-xs text-muted-foreground">
            ~{project.pages_count} pages
          </div>
        )}
      </div>

      {showActions && (
        <div className="space-y-2">
          {/* View Button - Always enabled */}
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link to={isProcessing || isFailed ? `/processing/${project.id}` : `/projects/${project.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              {isProcessing ? 'View Processing' : isFailed ? 'Retry Project' : 'View Project'}
            </Link>
          </Button>

          {/* Edit Button - Only for completed projects */}
          {isCompleted && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to={`/projects/${project.id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>
          )}

          {/* Download Button - Only for completed projects */}
          {isCompleted && (
            <Button variant="outline" size="sm" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}

          {/* Processing/Failed state buttons - Ghosted */}
          {isProcessing && (
            <>
              <Button variant="ghost" size="sm" className="w-full" disabled>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="w-full" disabled>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </>
          )}

          {isFailed && (
            <>
              <Button variant="ghost" size="sm" className="w-full" disabled>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="w-full" disabled>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BookCard;
