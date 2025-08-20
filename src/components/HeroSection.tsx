import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, BookOpen, Rss, Send, Upload, Link as LinkIcon, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'signup'>('signup');
  const [inputValue, setInputValue] = useState('');
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  
  const contentTypes = [
    "RSS Feeds",
    "Podcast",
    "Seminar", 
    "Videos",
    "Blogs",
    "Content",
    "Notes"
  ];

  const placeholderTexts = [
    "Add an RSS feed URL...",
    "Upload files or paste content...",
    "Write a prompt to start your book...",
    "Paste a link to import content...",
    "Describe what you want to create..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % contentTypes.length);
        setIsTransitioning(false);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, [contentTypes.length]);

  // Animate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholderTexts.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setShowModal(true);
    }
  };

  const handleModalAction = (type: 'login' | 'signup') => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="container relative z-10 px-4 py-20 mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Rss className="w-8 h-8 text-foreground" />
            <ArrowRight className="w-6 h-6 text-foreground" />
            <BookOpen className="w-8 h-8 text-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-medium text-foreground mb-6 leading-tight">
            Transform
            <span className={`text-muted-foreground ml-4 transition-all duration-500 ease-in-out ${
              isTransitioning ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'
            }`}>
              {contentTypes[currentTextIndex]}
            </span>
            <br />
            into Beautiful Books
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Turn your favorite blogs, news feeds, and content streams into professionally formatted books you can read anywhere.
          </p>
          
          {/* Chat Input Box */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={placeholderTexts[currentPlaceholderIndex]}
                  className="w-full h-16 text-lg px-6 pr-16 border-2 border-muted-foreground/20 focus:border-primary transition-colors bg-background/50 backdrop-blur-sm"
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
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleModalAction('signup')}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleModalAction('signup')}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Add Links
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleModalAction('signup')}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <FileText className="w-4 h-4 mr-2" />
                Write Prompt
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Login/Signup Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium">
              {modalType === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </DialogTitle>
            <DialogDescription>
              {modalType === 'login' 
                ? 'Sign in to continue creating your book' 
                : 'Join Podbook to start transforming your content into beautiful books'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {modalType === 'signup' && (
              <div className="space-y-2">
                <Input placeholder="Full Name" />
                <Input placeholder="Email" type="email" />
                <Input placeholder="Password" type="password" />
                <Button className="w-full" onClick={() => setShowModal(false)}>
                  Create Account
                </Button>
              </div>
            )}
            
            {modalType === 'login' && (
              <div className="space-y-2">
                <Input placeholder="Email" type="email" />
                <Input placeholder="Password" type="password" />
                <Button className="w-full" onClick={() => setShowModal(false)}>
                  Sign In
                </Button>
              </div>
            )}
            
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setModalType(modalType === 'login' ? 'signup' : 'login')}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {modalType === 'login' 
                  ? "Don't have an account? Sign up" 
                  : 'Already have an account? Sign in'
                }
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;