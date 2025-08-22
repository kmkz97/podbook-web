import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, LayoutDashboard, Phone } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface OnboardingCompletionProps {
  onStartBook: () => void;
  onGoToDashboard: () => void;
  onScheduleCall: () => void;
  onScheduleCallAndNavigate: () => void;
}

const OnboardingCompletion: React.FC<OnboardingCompletionProps> = ({
  onStartBook,
  onGoToDashboard,
  onScheduleCall,
  onScheduleCallAndNavigate,
}) => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <img 
          src={theme === 'dark' ? '/logo-white.svg' : '/logo.svg'} 
          alt="Podbook Logo" 
          className="w-16 h-16 mx-auto mb-4" 
        />
      </div>
      
      <div className="w-full max-w-4xl">
                       <div className="text-center mb-12">
                 <p className="text-xl text-muted-foreground">
                   What would you like to do next?
                 </p>
               </div>

                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Start Book Card */}
                 <Card className="hover:shadow-xl hover:scale-[1.02] hover:bg-muted/30 transition-all duration-300 cursor-pointer group border-2 hover:border-primary/30" onClick={onStartBook}>
                   <CardContent className="p-6 text-left">
                     <div className="flex items-start space-x-4">
                       <BookOpen className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors" />
                       <div className="flex-1">
                         <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                           Start your first book
                         </h3>
                         <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors">
                           Begin creating your AI-powered book with RSS feeds, documents, or your own content.
                         </p>
                       </div>
                     </div>
                   </CardContent>
                 </Card>

                 {/* Dashboard Card */}
                 <Card className="hover:shadow-xl hover:scale-[1.02] hover:bg-muted/30 transition-all duration-300 cursor-pointer group border-2 hover:border-primary/30" onClick={onGoToDashboard}>
                   <CardContent className="p-6 text-left">
                     <div className="flex items-start space-x-4">
                       <LayoutDashboard className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors" />
                       <div className="flex-1">
                         <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                           Go to your dashboard
                         </h3>
                         <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors">
                           Access your projects, manage your account, and explore all features.
                         </p>
                       </div>
                     </div>
                   </CardContent>
                 </Card>

                 {/* Schedule Call Card */}
                 <Card className="hover:shadow-xl hover:scale-[1.02] hover:bg-muted/30 transition-all duration-300 cursor-pointer group border-2 hover:border-primary/30" onClick={onScheduleCallAndNavigate}>
                   <CardContent className="p-6 text-left">
                     <div className="flex items-start space-x-4">
                       <Phone className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors" />
                       <div className="flex-1">
                         <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                           Schedule a call
                         </h3>
                         <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors">
                           Book a consultation with our team to discuss your project needs.
                         </p>
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               </div>
      </div>
    </div>
  );
};

export default OnboardingCompletion;
