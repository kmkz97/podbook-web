import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Upload } from "lucide-react";
import { useState, useEffect } from "react";

interface ChatInputProps {
  onSubmit?: (value: string) => void;
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
    if (inputValue.trim() && onSubmit) {
      onSubmit(inputValue.trim());
      setInputValue('');
    }
  };

  const handleQuickAction = (action: string) => {
    // Handle quick actions - could be customized per implementation
    console.log(`Quick action: ${action}`);
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
        </div>
      )}
    </div>
  );
};

export default ChatInput;
