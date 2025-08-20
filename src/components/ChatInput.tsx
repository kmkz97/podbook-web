import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Upload, X, File, FileText, Link as LinkIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface AttachedFile {
  id: string;
  name: string;
  type: 'file' | 'link' | 'text';
  size?: number;
  url?: string;
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
  const [showFileInput, setShowFileInput] = useState(false);
  
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
      setShowFileInput(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles: AttachedFile[] = Array.from(files).map((file, index) => ({
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        type: 'file' as const,
        size: file.size
      }));
      setAttachedFiles(prev => [...prev, ...newFiles]);
      setShowFileInput(false);
    }
  };

  const handleAddLink = () => {
    const url = prompt('Enter URL:');
    if (url && url.trim()) {
      const newLink: AttachedFile = {
        id: `link-${Date.now()}`,
        name: url,
        type: 'link',
        url: url.trim()
      };
      setAttachedFiles(prev => [...prev, newLink]);
    }
  };

  const handleAddText = () => {
    const text = prompt('Enter text content:');
    if (text && text.trim()) {
      const newText: AttachedFile = {
        id: `text-${Date.now()}`,
        name: text.length > 50 ? text.substring(0, 50) + '...' : text,
        type: 'text'
      };
      setAttachedFiles(prev => [...prev, newText]);
    }
  };

  const removeFile = (id: string) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== id));
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder || placeholderTexts[currentPlaceholderIndex]}
            className="w-full h-16 text-lg px-6 pr-16 border-2 border-border focus:border-primary transition-colors bg-background rounded-[14px] text-foreground placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-primary hover:bg-primary/90"
            disabled={!inputValue.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
      
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
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddLink}
            className="text-sm text-muted-foreground hover:text-foreground border-border hover:bg-muted"
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            Add Link
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddText}
            className="text-sm text-muted-foreground hover:text-foreground border-border hover:bg-muted"
          >
            <FileText className="w-4 h-4 mr-2" />
            Add Text
          </Button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        multiple
        onChange={handleFileUpload}
        className="hidden"
        id="file-upload"
        accept=".txt,.md,.pdf,.doc,.docx,.rtf"
      />
      {showFileInput && (
        <div className="mt-4 text-center">
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Select Files
            </Button>
          </label>
        </div>
      )}

      {/* Attached Files Display */}
      {attachedFiles.length > 0 && (
        <div className="mt-4">
          <div className="text-sm text-muted-foreground mb-2 text-center">
            Attached ({attachedFiles.length}):
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {attachedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2 bg-muted/50 rounded-lg border border-border"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {file.type === 'file' && <File className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                  {file.type === 'link' && <LinkIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                  {file.type === 'text' && <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                  <span className="text-sm text-foreground truncate">
                    {file.name}
                  </span>
                  {file.size && (
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  )}
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
