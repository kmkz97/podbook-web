import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const isCompleted = project.status === 'completed';
  const isProcessing = project.status === 'processing';
  const isFailed = project.status === 'failed';

  const handleCardClick = () => {
    if (isProcessing || isFailed) {
      navigate(`/processing/${project.id}`);
    } else {
      navigate(`/projects/${project.id}`);
    }
  };

  return (
    <div 
      className="relative group cursor-pointer" 
      onClick={handleCardClick}
    >
      {/* Book Container with 3D effect */}
      <div className="relative transform transition-all duration-300 group-hover:scale-105 group-hover:-rotate-1">
        {/* Book Cover */}
        <div className="relative bg-gradient-to-br from-card to-card/90 border border-border rounded-lg p-4 shadow-lg">
          {/* Book Spine Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-border/30 via-border/50 to-border/30 rounded-l-lg"></div>
          
          {/* Book Pages Effect - Subtle layered appearance */}
          <div className="absolute left-1 top-1 bottom-1 w-0.5 bg-gradient-to-b from-background/20 via-background/40 to-background/20 rounded-l-sm"></div>
          <div className="absolute left-1.5 top-1.5 bottom-1.5 w-0.5 bg-gradient-to-b from-background/10 via-background/30 to-background/10 rounded-l-sm"></div>
          
          {/* Content */}
          <div className="flex items-start justify-between mb-3">
            <BookOpen className="h-6 w-6 text-primary mt-1" />
            <StatusChip status={project.status} />
          </div>
          
          <h3 className="font-medium text-foreground mb-2 text-lg leading-tight">{project.title}</h3>
          
          <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
            {project.edited_at && (
              <span>Edited: {new Date(project.edited_at).toLocaleDateString()}</span>
            )}
            {project.word_count && (
              <span>{project.word_count.toLocaleString()} words</span>
            )}
            {project.pages_count && (
              <span>~{project.pages_count} pages</span>
            )}
          </div>

        </div>
        
        {/* Action Buttons - Positioned below the book cover */}
        {showActions && (
          <div className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
            {/* View Button - Always enabled */}
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link to={isProcessing || isFailed ? `/processing/${project.id}` : `/projects/${project.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </Link>
            </Button>

            {/* Failed State: View + Retry */}
            {isFailed && (
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to={`/processing/${project.id}`}>
                  <Clock className="h-4 w-4 mr-2" />
                  Retry
                </Link>
              </Button>
            )}

            {/* Processing State: View + Edit (ghosted) + Download (ghosted) */}
            {isProcessing && (
              <>
                <Button variant="outline" size="sm" className="flex-1" disabled>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </>
            )}

            {/* Completed State: View + Edit + Download */}
            {isCompleted && (
              <>
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to={`/projects/${project.id}`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
