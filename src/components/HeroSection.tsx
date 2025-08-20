import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, BookOpen, Rss } from "lucide-react";
import { useState, useEffect } from "react";
import ChatInput from "@/components/ChatInput";
import { useTheme } from "@/contexts/ThemeContext";

const HeroSection = () => {
  const { theme } = useTheme();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'signup'>('signup');
  
  const contentTypes = [
    "RSS feed",
    "podcast",
    "seminar", 
    "video",
    "blog",
    "content",
    "note"
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





  const handleModalAction = (type: 'login' | 'signup') => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/book-1.jpg)' }}>
      {/* Semi-transparent black overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      
      <div className="container relative z-10 px-4 py-20 mx-auto text-center">
        <div className="max-w-4xl mx-auto">

          
          <h1 className="text-5xl md:text-7xl font-medium text-white mb-6 leading-tight font-serif-headers">
            Transform your
            <span className={`text-white/80 ml-4 transition-all duration-500 ease-in-out ${
              isTransitioning ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'
            }`}>
              {contentTypes[currentTextIndex]}
            </span>
            <br />
            into complete books
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Turn your favorite blogs, news feeds, and content streams into professionally formatted books you can read anywhere.
          </p>
          
          {/* Chat Input Box */}
          <div className="mb-8">
            <ChatInput 
              onSubmit={(value, files) => {
                console.log('Hero chat input submitted:', value);
                console.log('Files attached:', files);
                setShowModal(true);
                setModalType('signup');
              }}
              placeholder="Add an RSS feed, upload files, write a prompt, to start your book..."
              showQuickActions={true}
              className="text-white"
            />
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