import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Rss } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-black/20" />
      <div className="container relative z-10 px-4 py-20 mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Rss className="w-8 h-8 text-accent" />
            <ArrowRight className="w-6 h-6 text-accent" />
            <BookOpen className="w-8 h-8 text-accent" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Transform
            <span className="bg-gradient-accent bg-clip-text text-transparent ml-4">
              RSS Feeds
            </span>
            <br />
            into Beautiful Books
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Turn your favorite blogs, news feeds, and content streams into professionally formatted books you can read anywhere.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold shadow-medium">
              Start Converting
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg">
              See How It Works
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;