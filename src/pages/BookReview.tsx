import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  Eye, 
  ArrowLeft,
  MessageCircle,
  CheckCircle,
  X
} from 'lucide-react';
import LeftNavigation from "@/components/LeftNavigation";

interface Chapter {
  id: number;
  title: string;
  wordCount: number;
  estimatedPages: number;
  content: string;
}

interface BookReviewProps {
  projectId: string;
  projectTitle: string;
}

const BookReview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: 1, title: 'Introduction', content: '<h1>Introduction</h1><p>Welcome to your book. This is the introduction chapter that provides an overview of the content...</p>', wordCount: 120, estimatedPages: 1 },
    { id: 2, title: 'Chapter 1', content: '<h1>Chapter 1</h1><p>This is the beginning of your first chapter. The content has been generated and is ready for your review...</p>', wordCount: 150, estimatedPages: 1 },
    { id: 3, title: 'Chapter 2', content: '<h1>Chapter 2</h1><p>Continue your story in the second chapter. This content has been carefully crafted based on your specifications...</p>', wordCount: 120, estimatedPages: 1 },
  ]);
  const [currentChapter, setCurrentChapter] = useState<Chapter>(chapters[0]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Read-only editor - no editing capabilities
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable all editing commands
        editable: false,
      }),
      Placeholder.configure({ placeholder: 'Content loading...' }),
      Highlight,
      Typography
    ],
    content: currentChapter.content,
    editable: false, // Make editor read-only
  });

  const setActiveChapter = (chapter: Chapter) => {
    setCurrentChapter(chapter);
    if (editor) {
      editor.commands.setContent(chapter.content);
    }
  };

  const handleDownload = () => {
    setShowDownloadModal(true);
  };

  const confirmDownload = () => {
    // TODO: In production, this would:
    // 1. Mark the book as downloaded in the backend
    // 2. Waive refund eligibility
    // 3. Initiate actual file download
    setShowDownloadModal(false);
    
    // Simulate download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Your book content here';
    link.download = `book-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Navigation Bar - Read Only */}
          <div className="border-b bg-card px-6 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate(`/book-completed/${id}`)}
                className="hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Book
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-lg font-medium text-foreground">
                Review: Tech News Weekly Digest
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Contact Support Button */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('mailto:support@podbook.com?subject=Book%20Review%20Question', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              
              {/* Confirm & Download Button */}
              <Button 
                onClick={handleDownload}
                className="bg-primary hover:bg-primary/90"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm & Download
              </Button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1 overflow-hidden min-h-0">
            {/* Left Sidebar - Chapter Navigation */}
            <div className="w-64 border-r bg-muted/30 p-4 overflow-y-auto">
              <h3 className="font-medium text-foreground mb-4">Chapters</h3>
              <div className="space-y-2">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setActiveChapter(chapter)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentChapter.id === chapter.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="font-medium text-sm">{chapter.title}</div>
                    <div className="text-xs opacity-70">
                      {chapter.wordCount} words • ~{chapter.estimatedPages} pages
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Editor Area - Read Only */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Chapter Header */}
              <div className="border-b px-6 py-4 bg-card flex-shrink-0">
                <h2 className="text-xl font-semibold text-foreground">
                  {currentChapter.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentChapter.wordCount} words • ~{currentChapter.estimatedPages} pages
                </p>
              </div>

              {/* Read-Only Content */}
              <div className="flex-1 p-6 overflow-y-auto pb-24 min-h-0">
                <div className="max-w-4xl mx-auto">
                  <div className="prose prose-lg max-w-none">
                    <EditorContent 
                      editor={editor} 
                      className="min-h-[500px] p-6 rounded-lg bg-background"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Sticky Footer - Read-Only Notice */}
        <div className="fixed bottom-0 left-0 right-0 bg-blue-50 border-t border-blue-200 p-4 z-40">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-blue-800">
              <Eye className="w-4 h-4" />
              <span className="font-medium">Read-Only Mode</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              This is a preview of your completed book. You cannot edit the content. 
              Review carefully before downloading, as downloading will waive your refund eligibility.
            </p>
          </div>
        </div>

      {/* Download Confirmation Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-4 relative shadow-lg">
            {/* Close button */}
            <button
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Warning icon */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <Download className="w-12 h-12 text-amber-600" />
              </div>
            </div>
            
            {/* Warning message */}
            <h2 className="text-2xl font-bold text-center mb-4 text-foreground">
              Confirm Download
            </h2>
            <p className="text-center text-muted-foreground mb-6">
              By downloading this book, you confirm that you are satisfied with the content and waive your right to request a refund.
            </p>
            
            {/* Warning box */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-amber-800 mb-2">⚠️ Important Notice:</h4>
              <p className="text-sm text-amber-700">
                Downloading this book will permanently waive your 7-day refund eligibility period.
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => setShowDownloadModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmDownload}
                className="flex-1 bg-amber-600 hover:bg-amber-700"
              >
                Confirm & Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookReview;
