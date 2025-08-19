import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Smartphone, 
  Download, 
  Palette, 
  Clock, 
  Shield, 
  Zap 
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Convert RSS feeds to books in minutes, not hours. Our optimized processing ensures quick turnaround times."
  },
  {
    icon: Palette,
    title: "Beautiful Formatting",
    description: "Professional typography, optimized layouts, and clean design make your content look publication-ready."
  },
  {
    icon: Smartphone,
    title: "Multi-Device Support",
    description: "Read your generated books on any device - phone, tablet, e-reader, or print them for offline reading."
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Download in PDF, EPUB, or MOBI formats. Compatible with Kindle, Apple Books, and other readers."
  },
  {
    icon: Clock,
    title: "Batch Processing",
    description: "Convert multiple RSS feeds at once. Perfect for creating collections or series from different sources."
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays private. We don't store your RSS feeds or generated books longer than necessary."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform your favorite content into beautiful, readable books.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300 border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;