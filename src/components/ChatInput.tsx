import { Button } from "@/components/ui/button";
import { Send, Upload, X, File } from "lucide-react";
import { useState, useEffect } from "react";

interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

interface ChatInputProps {
  onSubmit?: (value: string, files: AttachedFile[]) => void;
  placeholder?: string;
  showQuickActions?: boolean;
  className?: string;
}

const ChatInput = ({ 
  onSubmit, 
  placeholder = "Add an RSS feed, upload files, write a prompt, to start your book...",
  showQuickActions = true,
  className = ""
}: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  
  const placeholderTexts = [
    "Add an RSS feed URL...",
    "Upload files or paste content...",
    "Write a prompt to start your book...",
    "Paste a link to import content...",
    "Describe what you want to create..."
  ];

  // Animate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholderTexts.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((inputValue.trim() || attachedFiles.length > 0) && onSubmit) {
      onSubmit(inputValue.trim(), attachedFiles);
      setInputValue('');
      setAttachedFiles([]);
    }
  };

  const handleQuickAction = (action: string) => {
    if (action === 'upload') {
      // Trigger file input click
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.click();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles: AttachedFile[] = Array.from(files).map((file, index) => ({
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
    // Reset the input value so the same file can be selected again
    e.target.value = '';
  };

  const removeFile = (id: string) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== id));
  };

  return (
    <div className={`max-w-2xl mx-auto flex flex-col h-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder || placeholderTexts[currentPlaceholderIndex]}
            className="w-full min-h-[64px] max-h-48 text-lg px-6 pr-16 py-4 border-2 border-border focus:border-primary transition-colors bg-background rounded-[14px] text-foreground placeholder:text-muted-foreground resize-none overflow-hidden"
            style={{
              height: 'auto',
              minHeight: '64px',
              maxHeight: '192px'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 192) + 'px';
            }}
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-2 bottom-2 h-12 w-12 rounded-full bg-primary hover:bg-primary/90"
            disabled={!inputValue.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
      
      {/* Hidden File Input */}
      <input
        type="file"
        multiple
        onChange={handleFileUpload}
        className="hidden"
        id="file-upload"
        accept=".txt,.md,.pdf,.doc,.docx,.rtf,.mp3,.mp4,.wav,.jpg,.jpeg,.png,.gif"
      />
      
      {/* Quick Action Buttons */}
      {showQuickActions && (
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuickAction('upload')}
            className="text-sm text-muted-foreground hover:text-foreground border-border hover:bg-muted"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </div>
      )}

              {/* Attached Files Display */}
        {attachedFiles.length > 0 && (
          <div className="mt-4 flex-1 min-h-0">
            <div className="text-sm text-muted-foreground mb-2 text-center">
              Attached Files ({attachedFiles.length}):
            </div>
            <div className="space-y-2 h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/30">
              {attachedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-2 bg-muted/50 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <File className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground truncate">
                      {file.name}
                    </span>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default ChatInput;
