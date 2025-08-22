import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import OnboardingCompletion from './OnboardingCompletion';

interface OnboardingData {
  writingExperience: string;
  bookPurpose: string;
  targetAudience: string;
  bookLength: string;
  contentSources: string[];
  customContentSource?: string;
  timeline: string;
  successMetrics: string[];
  customSuccessMetric?: string;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
  onStartBook: () => void;
  onGoToDashboard: () => void;
  onScheduleCall: () => void;
  onScheduleCallAndNavigate: () => void;
  saveOnboardingProgress: (data: Partial<OnboardingData>) => Promise<any>;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onSkip, onStartBook, onGoToDashboard, onScheduleCall, onScheduleCallAndNavigate, saveOnboardingProgress }) => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    writingExperience: '',
    bookPurpose: '',
    targetAudience: '',
    bookLength: '',
    contentSources: [],
    customContentSource: '',
    timeline: '',
    successMetrics: [],
    customSuccessMetric: '',
  });

  const steps = [
    {
      title: "Writing Experience",
      description: "Help us understand your background to provide better assistance",
      question: "What's your experience with writing and content creation?",
      type: "radio" as const,
      options: [
        "Complete beginner - I'm new to writing",
        "Some experience - I've written blogs or short pieces",
        "Experienced - I write regularly for work or personal projects",
        "Professional - I'm a published author or content creator"
      ],
      field: "writingExperience"
    },
    {
      title: "Book Purpose",
      description: "Understanding your goals helps us tailor the experience",
      question: "What's the primary purpose of your book?",
      type: "radio" as const,
      options: [
        "Business/Professional - Thought leadership, expertise sharing",
        "Educational - Teaching, training, or instructional content",
        "Personal - Memoir, personal development, or creative expression",
        "Academic/Research - Scholarly work or research findings",
        "Other"
      ],
      field: "bookPurpose"
    },
    {
      title: "Target Audience",
      description: "Knowing your audience helps with content structure and tone",
      question: "Who is your primary target audience?",
      type: "radio" as const,
      options: [
        "Industry professionals and experts",
        "Students and learners",
        "General public interested in the topic",
        "Specific niche or community",
        "Mixed audience"
      ],
      field: "targetAudience"
    },
    {
      title: "Content Sources",
      description: "What materials will you be working with?",
      question: "What types of content sources will you be using? (Select all that apply)",
      type: "checkbox" as const,
      options: [
        "RSS feeds and blogs",
        "Existing documents (PDFs, Word docs)",
        "Audio/video recordings",
        "Research papers and articles",
        "Personal notes and outlines",
        "Other"
      ],
      field: "contentSources",
      allowCustom: true,
      customField: "customContentSource"
    },
    {
      title: "Timeline & Goals",
      description: "Help us understand your project scope and timeline",
      question: "What's your timeline for completing this book?",
      type: "radio" as const,
      options: [
        "Quick turnaround - 1-2 weeks",
        "Moderate pace - 1-2 months",
        "Standard timeline - 3-6 months",
        "Long-term project - 6+ months",
        "No specific deadline"
      ],
      field: "timeline"
    },
    {
      title: "Success Metrics",
      description: "What defines success for your book project?",
      question: "How will you measure the success of your book? (Select all that apply)",
      type: "checkbox" as const,
      options: [
        "Book completion and publication",
        "Reader engagement and feedback",
        "Business or career advancement",
        "Knowledge sharing and education",
        "Personal satisfaction and growth",
        "Revenue generation",
        "Other"
      ],
      field: "successMetrics",
      allowCustom: true,
      customField: "customSuccessMetric"
    }
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      // Save current step data before moving to next
      try {
        await saveOnboardingProgress(data);
        setCurrentStep(currentStep + 1);
      } catch (error) {
        console.error('Error saving onboarding progress:', error);
        // Still move to next step even if save fails
        setCurrentStep(currentStep + 1);
      }
    }
    // Don't call onComplete here anymore - let user choose action on last screen
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRadioChange = (value: string, field: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (value: string, field: string) => {
    setData(prev => {
      const currentValues = prev[field] as string[];
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter(v => v !== value) };
      } else {
        return { ...prev, [field]: [...currentValues, value] };
      }
    });
  };

  const handleCustomInput = (value: string, field: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const canProceed = data[currentStepData.field as keyof OnboardingData] && 
    (Array.isArray(data[currentStepData.field as keyof OnboardingData]) 
      ? (data[currentStepData.field as keyof OnboardingData] as string[]).length > 0
      : true);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {currentStep === steps.length - 1 ? (
                    <OnboardingCompletion
              onStartBook={onStartBook}
              onGoToDashboard={onGoToDashboard}
              onScheduleCall={onScheduleCall}
              onScheduleCallAndNavigate={onScheduleCallAndNavigate}
            />
      ) : (
        <>
          <div className="mb-8 text-center">
            <img 
              src={theme === 'dark' ? '/logo-white.svg' : '/logo.svg'} 
              alt="Podbook Logo" 
              className="w-16 h-16 mx-auto mb-4" 
            />
          </div>
          <Card className="w-full max-w-2xl shadow-xl">
            <CardHeader className="text-center pb-6">
              <Progress value={progress} className="h-2" />
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {currentStepData.question}
                </h3>
              </div>

              {currentStepData.type === 'radio' && (
                <RadioGroup
                  value={data[currentStepData.field as keyof OnboardingData] as string}
                  onValueChange={(value) => handleRadioChange(value, currentStepData.field)}
                  className="space-y-3"
                >
                  {currentStepData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-foreground leading-none">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentStepData.type === 'checkbox' && (
                <div className="space-y-3">
                  {currentStepData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="relative flex-shrink-0">
                        <input
                          type="checkbox"
                          id={`checkbox-${index}`}
                          checked={(data[currentStepData.field as keyof OnboardingData] as string[]).includes(option)}
                          onChange={() => handleCheckboxChange(option, currentStepData.field)}
                          className="w-4 h-4 appearance-none rounded border-2 border-border bg-background checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 cursor-pointer"
                        />
                        {(data[currentStepData.field as keyof OnboardingData] as string[]).includes(option) && (
                          <svg
                            className="absolute inset-0 w-4 h-4 text-primary-foreground pointer-events-none"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <Label htmlFor={`checkbox-${index}`} className="flex-1 cursor-pointer text-foreground leading-none">
                        {option}
                      </Label>
                    </div>
                  ))}
                  
                  {currentStepData.allowCustom && 
                   (data[currentStepData.field as keyof OnboardingData] as string[]).includes('Other') && (
                    <div className="mt-4">
                      <Label htmlFor="custom-input" className="block text-sm font-medium text-foreground mb-2">
                        Please specify:
                      </Label>
                      <Input
                        id="custom-input"
                        type="text"
                        placeholder="Enter your content source..."
                        value={data[currentStepData.customField as keyof OnboardingData] as string || ''}
                        onChange={(e) => handleCustomInput(e.target.value, currentStepData.customField!)}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between pt-6">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex items-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                </Button>
                )}
                {currentStep === 0 && <div></div>}

                <div className="flex space-x-3">
                  <Button
                    variant="ghost"
                    onClick={handleNext}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Skip
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="flex items-center space-x-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default OnboardingFlow;
