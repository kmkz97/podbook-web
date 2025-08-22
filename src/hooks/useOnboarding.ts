import { useState, useEffect } from 'react';

export interface OnboardingData {
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

export const useOnboarding = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if onboarding is complete from localStorage or user profile
    const checkOnboardingStatus = () => {
      try {
        const stored = localStorage.getItem('onboarding-complete');
        if (stored) {
          setIsOnboardingComplete(true);
          const data = localStorage.getItem('onboarding-data');
          if (data) {
            setOnboardingData(JSON.parse(data));
          }
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  const completeOnboarding = (data: OnboardingData) => {
    try {
      // Store onboarding data
      localStorage.setItem('onboarding-data', JSON.stringify(data));
      localStorage.setItem('onboarding-complete', 'true');
      
      // Update state
      setOnboardingData(data);
      setIsOnboardingComplete(true);

      // Here you would typically also save to your backend
      // saveOnboardingDataToBackend(data);
      
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const skipOnboarding = () => {
    try {
      localStorage.setItem('onboarding-complete', 'true');
      setIsOnboardingComplete(true);
    } catch (error) {
      console.error('Error skipping onboarding:', error);
    }
  };

  const resetOnboarding = () => {
    try {
      localStorage.removeItem('onboarding-complete');
      localStorage.removeItem('onboarding-data');
      setIsOnboardingComplete(false);
      setOnboardingData(null);
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  };

  return {
    isOnboardingComplete,
    onboardingData,
    isLoading,
    completeOnboarding,
    skipOnboarding,
    resetOnboarding,
  };
};
