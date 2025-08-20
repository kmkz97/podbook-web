import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Header component for Podbook application

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Podbook Logo" className="w-8 h-8 logo-svg" />
            <h1 className="text-2xl font-medium text-foreground font-serif-headers">Podbook</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/start">Start Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;