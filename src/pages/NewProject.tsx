import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import BookCreationWizard from "@/components/BookCreationWizard";

const NewProject = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <BookCreationWizard />
      <Footer />
    </div>
  );
};

export default NewProject;