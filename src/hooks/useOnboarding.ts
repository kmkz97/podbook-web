import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkOnboardingStatus();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const checkOnboardingStatus = async () => {
    try {
      const response = await fetch('/api/onboarding/get', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data && result.data.isCompleted) {
          setIsOnboardingComplete(true);
          setOnboardingData(result.data);
        }
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (data: OnboardingData) => {
    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setOnboardingData(result.data);
        setIsOnboardingComplete(true);
        return result;
      } else {
        throw new Error('Failed to complete onboarding');
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  };

  const saveOnboardingProgress = async (data: Partial<OnboardingData>) => {
    try {
      const response = await fetch('/api/onboarding/save', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setOnboardingData(result.data);
        return result;
      } else {
        throw new Error('Failed to save onboarding progress');
      }
    } catch (error) {
      console.error('Error saving onboarding progress:', error);
      throw error;
    }
  };

  const skipOnboarding = async () => {
    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted: true }),
      });

      if (response.ok) {
        setIsOnboardingComplete(true);
      }
    } catch (error) {
      console.error('Error skipping onboarding:', error);
    }
  };

  const resetOnboarding = async () => {
    try {
      // For now, we'll just reset the local state
      // In a production app, you might want to add a reset endpoint
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
    saveOnboardingProgress,
    skipOnboarding,
    resetOnboarding,
  };
};
