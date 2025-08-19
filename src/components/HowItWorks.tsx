import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rss, Cog, BookOpen } from "lucide-react";

const steps = [
  {
    icon: Rss,
    title: "Add Your RSS Feed",
    description: "Simply paste any RSS feed URL from your favorite blogs, news sites, or content creators.",
    step: "01"
  },
  {
    icon: Cog,
    title: "AI Processing",
    description: "Our AI analyzes and formats your content, optimizing layout and typography for the best reading experience.",
    step: "02"
  },
  {
    icon: BookOpen,
    title: "Download Your Book",
    description: "Get a beautifully formatted PDF book that you can read on any device or print for offline reading.",
    step: "03"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Podbook Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform any RSS feed into a professionally formatted book in just three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative shadow-soft hover:shadow-medium transition-all duration-300 bg-card">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-muted rounded-full flex items-center justify-center text-foreground font-bold text-sm">
                  {step.step}
                </div>
                <CardHeader className="pt-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-center text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    {step.description}
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

export default HowItWorks;