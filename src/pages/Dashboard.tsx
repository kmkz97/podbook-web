import LeftNavigation from "@/components/LeftNavigation";
import ChatInput from "@/components/ChatInput";

const Dashboard = () => {





  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <LeftNavigation activePage="dashboard" />

        {/* Main Content Area */}
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center max-w-4xl">
            <h1 className="text-4xl font-medium text-foreground mb-2 font-serif-headers">
              Hi there!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to create something amazing? Start a new project below.
            </p>
            
            <ChatInput 
              onSubmit={(value, files) => {
                console.log('Chat input submitted:', value);
                console.log('Files attached:', files);
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