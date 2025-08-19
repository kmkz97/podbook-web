import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import RSSFeedInput from "@/components/RSSFeedInput";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <Features />
        <RSSFeedInput />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
