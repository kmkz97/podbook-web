import { Button } from "@/components/ui/button";
import { BookOpen, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-accent-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Inprint</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-foreground hover:text-accent transition-colors">
              How It Works
            </a>
            <a href="#features" className="text-foreground hover:text-accent transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-foreground hover:text-accent transition-colors">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;