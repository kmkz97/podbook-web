import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Header component for Podbook application

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-foreground" viewBox="0 0 83.07 83.07" xmlns="http://www.w3.org/2000/svg">
              <path d="M46.96,83.07h-7V28.55c0-8.02,6.53-14.55,14.55-14.55s14.55,6.53,14.55,14.55-6.53,14.55-14.55,14.55h-7.55v7h7.55c11.88,0,21.55-9.67,21.55-21.55s-9.67-21.55-21.55-21.55-21.55,9.67-21.55,21.55v54.52h-7v-25.96H0v-7h25.96v-7H0v-7h25.96v-7.55C25.96,12.81,38.77,0,54.52,0s28.55,12.81,28.55,28.55-12.81,28.55-28.55,28.55h-7.55v25.96ZM46.96,36.1h7.55c4.16,0,7.55-3.39,7.55-7.55s-3.39-7.55-7.55-7.55-7.55,3.39-7.55,7.55v7.55Z"/>
            </svg>
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