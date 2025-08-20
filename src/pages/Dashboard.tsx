import { useNavigate } from "react-router-dom";
import LeftNavigation from "@/components/LeftNavigation";
import ChatInput from "@/components/ChatInput";

const Dashboard = () => {
  const navigate = useNavigate();





  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <LeftNavigation activePage="dashboard" />

        {/* Main Content Area */}
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center max-w-4xl">
                    <h1 className="text-4xl font-medium text-foreground mb-6">
          Hi there!
        </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to create something amazing? Start a new project below.
            </p>
            
            <ChatInput 
              onSubmit={(value, files) => {
                console.log('Chat input submitted:', value);
                console.log('Files attached:', files);
                
                // Simulate book creation flow for logged-in user
                if (value.trim() || files.length > 0) {
                  // Store the input data in sessionStorage for the new project flow
                  const projectData = {
                    prompt: value.trim(),
                    files: files,
                    timestamp: new Date().toISOString(),
                    source: 'dashboard-chat'
                  };
                  
                  sessionStorage.setItem('newProjectData', JSON.stringify(projectData));
                  
                  // Navigate to new project page
                  navigate('/new-project');
                }
              }}
              placeholder="Add an RSS feed, upload files, write a prompt, to start your book..."
              showQuickActions={true}
            />
          </div>




        </main>
      </div>
    </div>
  );
};

export default Dashboard;