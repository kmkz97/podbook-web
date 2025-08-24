import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Download, 
  Eye, 
  MessageSquare,
  CheckCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type BookState = 'processing' | 'under-review' | 'post-approval' | 'completed';

interface Chapter {
  title: string;
  pages: number;
  words: string;
}

const BookLandingPageVariations = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<BookState>('processing');

  const states: { value: BookState; label: string; color: string; bgColor: string; borderColor: string }[] = [
    { value: 'processing', label: 'Order Processing', color: 'blue', bgColor: 'from-blue-50 to-indigo-100', borderColor: 'border-blue-200' },
    { value: 'under-review', label: 'Under Review', color: 'amber', bgColor: 'from-amber-50 to-orange-100', borderColor: 'border-amber-200' },
    { value: 'post-approval', label: 'Post Approval', color: 'green', bgColor: 'from-green-50 to-emerald-100', borderColor: 'border-green-200' },
    { value: 'completed', label: 'Completed', color: 'purple', bgColor: 'from-purple-50 to-violet-100', borderColor: 'border-purple-200' }
  ];

  const getStateConfig = () => states.find(s => s.value === currentState)!;

  const renderBookCover = (state: BookState) => {
    const config = getStateConfig();
    const colorMap = {
      processing: 'from-blue-400 to-indigo-600',
      'under-review': 'from-amber-400 to-orange-600',
      'post-approval': 'from-green-400 to-emerald-600',
      completed: 'from-purple-400 to-violet-600'
    };

    const statusMap = {
      processing: 'Processing...',
      'under-review': 'Under Review',
      'post-approval': 'Approved & Ready',
      completed: 'Completed'
    };

    const progressMap = {
      processing: 'w-1/3',
      'under-review': 'w-2/3',
      'post-approval': 'w-full',
      completed: 'w-full'
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className={`w-32 h-40 bg-gradient-to-br ${colorMap[state]} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
          <BookOpen className="w-16 h-16 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Tech News Weekly Digest</h3>
        <p className="text-sm text-gray-600 mb-3">by John Doe</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className={`bg-${config.color}-500 h-2 rounded-full ${progressMap[state]}`}></div>
        </div>
        <p className={`text-xs text-${config.color}-600 mt-2`}>{statusMap[state]}</p>
      </div>
    );
  };

  const renderBookInfo = (state: BookState) => {
    const config = getStateConfig();
    const colorMap = {
      processing: 'blue',
      'under-review': 'amber',
      'post-approval': 'green',
      completed: 'purple'
    };

    const metrics = {
      processing: [
        { value: '150', label: 'Target Pages' },
        { value: '8', label: 'Chapters' },
        { value: '$25', label: 'Total Cost' },
        { value: '4', label: 'Days Left' }
      ],
      'under-review': [
        { value: '124', label: 'Pages' },
        { value: '45.6K', label: 'Words' },
        { value: '8', label: 'Chapters' },
        { value: '2-3', label: 'Days Left' }
      ],
      'post-approval': [
        { value: '124', label: 'Pages' },
        { value: '45.6K', label: 'Words' },
        { value: '8', label: 'Chapters' },
        { value: 'PDF', label: 'Format' }
      ],
      completed: [
        { value: '124', label: 'Pages' },
        { value: '45.6K', label: 'Words' },
        { value: '8', label: 'Chapters' },
        { value: '2.3MB', label: 'File Size' }
      ]
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tech News Weekly Digest</h2>
          <p className="text-gray-600 mb-4">A comprehensive compilation of the latest technology news and insights from leading industry sources, curated and organized into a structured book format.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {metrics[state].map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold text-${colorMap[state]}-600`}>{metric.value}</div>
                <div className="text-sm text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {state === 'processing' && (
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Processing Progress</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Content Analysis Complete</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-600">AI Generation in Progress</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-400">Human Review</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-400">Final Formatting</span>
              </div>
            </div>
          </div>
        )}

        {state === 'under-review' && (
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Review Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Review Request Type</span>
                <Badge variant="outline" className="text-amber-600 border-amber-300">Refund Request</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Request Date</span>
                <span className="text-sm text-gray-800">2 days ago</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Estimated Review Time</span>
                <span className="text-sm text-gray-800">3-5 business days</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Current Status</span>
                <Badge className="bg-amber-100 text-amber-800 border-amber-200">Under Team Review</Badge>
              </div>
            </div>
          </div>
        )}

        {state === 'post-approval' && (
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Available Actions</h4>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Download Book
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview Content
              </Button>
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Request Changes
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">Your book has been approved and is ready for download. You have 7 days to review before the refund period expires.</p>
          </div>
        )}

        {state === 'completed' && (
          <>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Chapters Overview</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {[
                  { title: "Introduction to Tech Trends", pages: 4, words: "1.2K" },
                  { title: "AI Breakthroughs", pages: 6, words: "1.8K" },
                  { title: "Cloud Computing Evolution", pages: 8, words: "2.4K" },
                  { title: "Cybersecurity Updates", pages: 7, words: "2.0K" },
                  { title: "Mobile Technology Trends", pages: 6, words: "1.6K" },
                  { title: "Blockchain Developments", pages: 5, words: "1.4K" },
                  { title: "Internet of Things", pages: 4, words: "1.2K" },
                  { title: "Future Outlook", pages: 3, words: "800" }
                ].map((chapter, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-700">{chapter.title}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {chapter.pages} pages • {chapter.words} words
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Ready to Download</h4>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Book
                </Button>
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Get Support
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-3">Your book is complete and ready for download. All chapters have been generated and reviewed.</p>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button and State Toggle */}
      <div className="border-b bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/component-library')} 
            className="hover:bg-muted p-2 h-10 w-10 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Book Landing Page Variations</h1>
            <p className="text-sm text-muted-foreground">Toggle between different book states</p>
          </div>
        </div>

        {/* State Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Current State:</span>
          <div className="flex bg-muted rounded-lg p-1">
            {states.map((stateConfig) => (
              <Button
                key={stateConfig.value}
                variant={currentState === stateConfig.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentState(stateConfig.value)}
                className={`text-xs px-3 py-1 h-8 ${
                  currentState === stateConfig.value 
                    ? `bg-${stateConfig.color}-500 hover:bg-${stateConfig.color}-600` 
                    : 'hover:bg-muted-foreground/20'
                }`}
              >
                {stateConfig.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-8">
        <div className={`bg-gradient-to-br ${getStateConfig().bgColor} rounded-lg p-6 border-2 ${getStateConfig().borderColor}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Cover Section */}
            <div className="lg:col-span-1">
              {renderBookCover(currentState)}
            </div>

            {/* Book Info Section */}
            <div className="lg:col-span-2">
              {renderBookInfo(currentState)}
            </div>
          </div>
        </div>

        {/* State Information */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Current State: {getStateConfig().label}</CardTitle>
              <CardDescription>
                This page demonstrates the book landing page design for the "{getStateConfig().label}" state. 
                Use the toggle in the top right to switch between different book states and see how the design adapts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Design Features:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Consistent 3-column layout across all states</li>
                    <li>• Color-coded themes for visual distinction</li>
                    <li>• State-specific content and actions</li>
                    <li>• Book-focused UI design</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">State Transitions:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Processing → Under Review → Post Approval → Completed</li>
                    <li>• Each state shows relevant information</li>
                    <li>• Visual progress indicators</li>
                    <li>• Appropriate action buttons</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BookLandingPageVariations;
