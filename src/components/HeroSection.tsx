import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Rss } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const contentTypes = [
    "RSS Feeds",
    "Podcast",
    "Seminar", 
    "Videos",
    "Blogs",
    "Content",
    "Notes"
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                          <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-medium shadow-medium" asChild>
              <Link to="/start">
                Start Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-muted px-8 py-6 text-lg" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;