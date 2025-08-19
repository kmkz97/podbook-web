import DashboardHeader from "@/components/DashboardHeader";
import BookCreationWizard from "@/components/BookCreationWizard";

const NewProject = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <BookCreationWizard />
    </div>
  );
};

export default NewProject;