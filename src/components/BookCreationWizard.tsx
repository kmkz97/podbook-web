import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  FileText, 
  Rss, 
  Upload, 
  Link, 
  Type, 
  Sparkles, 
  Eye, 
  Download,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  FileImage,
  FileAudio,
  FileVideo
} from "lucide-react";

interface BookType {
  id: string;
  name: string;
  description: string;
  icon: typeof BookOpen;
  category: string;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  wordCount: number;
  estimatedPages: number;
}

interface WizardStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const bookTypes: BookType[] = [
  { id: 'fiction', name: 'Fiction', description: 'Novels, short stories, poetry', icon: BookOpen, category: 'Creative' },
  { id: 'non-fiction', name: 'Non-Fiction', description: 'Guides, manuals, textbooks', icon: FileText, category: 'Educational' },
  { id: 'business', name: 'Business', description: 'Reports, whitepapers, case studies', icon: FileText, category: 'Professional' },
  { id: 'educational', name: 'Educational', description: 'Course materials, study guides', icon: FileText, category: 'Learning' },
  { id: 'creative', name: 'Creative', description: 'Portfolios, art books, photography', icon: FileImage, category: 'Artistic' },
];

const BookCreationWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBookType, setSelectedBookType] = useState<string>('');
  const [bookDetails, setBookDetails] = useState({
    title: '',
    description: '',
    author: '',
    audience: ''
  });
  const [bookSpecs, setBookSpecs] = useState({
    targetPages: [150],
    targetChapters: [10],
    format: 'pdf'
  });
  const [contentSources, setContentSources] = useState({
    rssFeed: '',
    uploadedFiles: [] as File[],
    textContent: '',
    urls: [] as string[]
  });
  const [processing, setProcessing] = useState(false);
  const [preview, setPreview] = useState<{
    chapters: Chapter[];
    totalWords: number;
    totalPages: number;
    estimatedCost: number;
  } | null>(null);

  const steps: WizardStep[] = [
    { id: 1, title: 'Book Type', description: 'Choose your book category', completed: !!selectedBookType },
    { id: 2, title: 'Details', description: 'Book information', completed: !!bookDetails.title && !!bookDetails.description },
    { id: 3, title: 'Specifications', description: 'Size and structure', completed: true },
    { id: 4, title: 'Content', description: 'Add your content sources', completed: true },
    { id: 5, title: 'Preview', description: 'Review and generate', completed: !!preview },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setContentSources(prev => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setContentSources(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }));
  };

  const processContent = async () => {
    setProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      const mockChapters: Chapter[] = [
        { id: '1', title: 'Introduction', description: 'Overview and context setting', wordCount: 1200, estimatedPages: 4 },
        { id: '2', title: 'Getting Started', description: 'Basic concepts and setup', wordCount: 1800, estimatedPages: 6 },
        { id: '3', title: 'Core Concepts', description: 'Main ideas and principles', wordCount: 2400, estimatedPages: 8 },
        { id: '4', title: 'Advanced Topics', description: 'Complex scenarios and solutions', wordCount: 2000, estimatedPages: 7 },
        { id: '5', title: 'Conclusion', description: 'Summary and next steps', wordCount: 800, estimatedPages: 3 },
      ];
      
      setPreview({
        chapters: mockChapters,
        totalWords: mockChapters.reduce((sum, ch) => sum + ch.wordCount, 0),
        totalPages: mockChapters.reduce((sum, ch) => sum + ch.estimatedPages, 0),
        estimatedCost: 25
      });
      setProcessing(false);
    }, 3000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">What type of book are you creating?</h2>
        <p className="text-muted-foreground">Choose the category that best describes your project</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookTypes.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedBookType === type.id 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-muted/50'
            }`}
            onClick={() => setSelectedBookType(type.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
                <type.icon className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{type.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
              <Badge variant="secondary" className="text-xs">{type.category}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Tell us about your book</h2>
        <p className="text-muted-foreground">Provide the essential details for your project</p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-4">
        <div>
          <Label htmlFor="title">Book Title</Label>
          <Input
            id="title"
            placeholder="Enter your book title"
            value={bookDetails.title}
            onChange={(e) => setBookDetails(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe what your book is about"
            value={bookDetails.description}
            onChange={(e) => setBookDetails(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1"
            rows={4}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="author">Author Name</Label>
            <Input
              id="author"
              placeholder="Your name or pen name"
              value={bookDetails.author}
              onChange={(e) => setBookDetails(prev => ({ ...prev, author: e.target.value }))}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="audience">Target Audience</Label>
            <Input
              id="audience"
              placeholder="e.g., Beginners, Professionals"
              value={bookDetails.audience}
              onChange={(e) => setBookDetails(prev => ({ ...prev, audience: e.target.value }))}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Book Specifications</h2>
        <p className="text-muted-foreground">Set your target size and structure</p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Label className="text-base font-medium">Target Book Size</Label>
          <div className="mt-2 space-y-2">
            <Slider
              value={bookSpecs.targetPages}
              onValueChange={(value) => setBookSpecs(prev => ({ ...prev, targetPages: value }))}
              max={500}
              min={50}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>50 pages</span>
              <span className="font-medium text-foreground">{bookSpecs.targetPages[0]} pages</span>
              <span>500 pages</span>
            </div>
          </div>
        </div>
        
        <div>
          <Label className="text-base font-medium">Number of Chapters</Label>
          <div className="mt-2 space-y-2">
            <Slider
              value={bookSpecs.targetChapters}
              onValueChange={(value) => setBookSpecs(prev => ({ ...prev, targetChapters: value }))}
              max={50}
              min={3}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>3 chapters</span>
              <span className="font-medium text-foreground">{bookSpecs.targetChapters[0]} chapters</span>
              <span>50 chapters</span>
            </div>
          </div>
        </div>
        
        <div>
          <Label className="text-base font-medium">Output Format</Label>
          <div className="mt-2 flex gap-2">
            {['pdf', 'epub', 'mobi'].map((format) => (
              <Button
                key={format}
                variant={bookSpecs.format === format ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBookSpecs(prev => ({ ...prev, format }))}
              >
                {format.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Add Your Content</h2>
        <p className="text-muted-foreground">Choose how you want to provide content for your book</p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {/* RSS Feed Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rss className="w-5 h-5 text-primary" />
              RSS Feed
            </CardTitle>
            <CardDescription>Import content from an RSS feed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter RSS feed URL"
                value={contentSources.rssFeed}
                onChange={(e) => setContentSources(prev => ({ ...prev, rssFeed: e.target.value }))}
                className="flex-1"
              />
              <Button variant="outline">Validate</Button>
            </div>
            {contentSources.rssFeed && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Found 25 episodes</p>
                <div className="mt-2 space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="checkbox" id={`episode-${i}`} defaultChecked />
                      <label htmlFor={`episode-${i}`} className="text-sm">
                        Episode {i}: Sample Title
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* File Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              File Upload
            </CardTitle>
            <CardDescription>Upload documents, images, audio, or video files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
              <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                Choose Files
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="*/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </div>
            
            {contentSources.uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Uploaded Files:</h4>
                {contentSources.uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">{file.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Text Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5 text-primary" />
              Text Content
            </CardTitle>
            <CardDescription>Paste or type your content directly</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your content here..."
              value={contentSources.textContent}
              onChange={(e) => setContentSources(prev => ({ ...prev, textContent: e.target.value }))}
              rows={6}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Preview & Generate</h2>
        <p className="text-muted-foreground">Review your book structure and start generation</p>
      </div>
      
      {!preview ? (
        <div className="text-center py-12">
          <Button 
            size="lg" 
            onClick={processContent}
            disabled={processing}
            className="bg-primary hover:bg-primary/90"
          >
            {processing ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Processing Content...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Process Content & Generate Preview
              </>
            )}
          </Button>
          {processing && (
            <div className="mt-4">
              <Progress value={33} className="w-64 mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">AI is analyzing your content...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Book Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Book Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{preview.totalPages}</div>
                  <div className="text-sm text-muted-foreground">Total Pages</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{preview.totalWords.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Word Count</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{preview.chapters.length}</div>
                  <div className="text-sm text-muted-foreground">Chapters</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chapter List */}
          <Card>
            <CardHeader>
              <CardTitle>Chapter Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {preview.chapters.map((chapter, index) => (
                  <div key={chapter.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <h4 className="font-medium">Chapter {index + 1}: {chapter.title}</h4>
                      <p className="text-sm text-muted-foreground">{chapter.description}</p>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium">{chapter.wordCount.toLocaleString()} words</div>
                      <div className="text-muted-foreground">~{chapter.estimatedPages} pages</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generation Options */}
          <Card>
            <CardHeader>
              <CardTitle>Ready to Generate</CardTitle>
              <CardDescription>Your book is ready for creation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium">Estimated Cost</h4>
                  <p className="text-sm text-muted-foreground">Based on content length and complexity</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{preview.estimatedCost} credits</div>
                  <div className="text-sm text-muted-foreground">≈ $2.50</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download Preview
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Purchase & Generate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.completed 
                    ? 'bg-primary text-primary-foreground' 
                    : currentStep === step.id 
                    ? 'bg-primary/20 text-primary border-2 border-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.completed ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step.completed ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm">
            {steps.map((step) => (
              <div key={step.id} className="text-center flex-1">
                <div className={`font-medium ${
                  currentStep === step.id ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground">{step.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !selectedBookType) ||
              (currentStep === 2 && (!bookDetails.title || !bookDetails.description)) ||
              (currentStep === 5 && !preview)
            }
            className="bg-primary hover:bg-primary/90"
          >
            {currentStep === steps.length ? 'Finish' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCreationWizard;
