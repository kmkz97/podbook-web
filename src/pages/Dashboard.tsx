import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import LeftNavigation from "@/components/LeftNavigation";
import BookCard from "@/components/BookCard";

interface Project {
  id: string;
  title: string;
  status: 'processing' | 'completed' | 'failed';
  edited_at?: string;
  word_count?: number;
  pages_count?: number;
}

const Dashboard = () => {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'Tech News Weekly',
      status: 'completed',
      edited_at: '2024-01-15',
      word_count: 45000,
      pages_count: 124
    },
    {
      id: '2',
      title: 'Design Inspiration Daily',
      status: 'processing',
      edited_at: '2024-01-20'
    },
    {
      id: '3',
      title: 'Industry Updates',
      status: 'failed',
      edited_at: '2024-01-18'
    },
    {
      id: '4',
      title: 'Marketing Insights',
      status: 'completed',
      edited_at: '2024-01-10',
      word_count: 32000,
      pages_count: 89
    },
    {
      id: '5',
      title: 'Science Breakthroughs',
      status: 'completed',
      edited_at: '2024-01-05',
      word_count: 58000,
      pages_count: 156
    }
  ]);





  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <LeftNavigation activePage="dashboard" />

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-medium text-foreground mb-2">
              Welcome back!
            </h1>
            <p className="text-lg text-muted-foreground">
              Here's what's happening with your projects today.
            </p>
          </div>



          {/* Recent Projects */}
          <div className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">Recent Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice(0, 3).map((project) => (
                <BookCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;