import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const API_BASE_URL = 'https://podbook-web-api.onrender.com/api';

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
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);
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
      const response = await fetch(`${API_BASE_URL}/onboarding/get`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Onboarding data:', result.data);
        
        if (result.data) {
          const isCompleted = Boolean(result.data.isCompleted);
          console.log('Onboarding complete?', isCompleted);
          setIsOnboardingComplete(isCompleted);
          setOnboardingData(result.data);
        } else {
          // No onboarding data found
          console.log('No onboarding data found');
          setIsOnboardingComplete(false);
          setOnboardingData(null);
        }
      } else if (response.status === 404) {
        // No onboarding data exists for this user
        console.log('No onboarding record found (404)');
        setIsOnboardingComplete(false);
        setOnboardingData(null);
      } else {
        console.error('Failed to fetch onboarding status:', response.status);
        setIsOnboardingComplete(false);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsOnboardingComplete(false);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (data: OnboardingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/onboarding/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
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
      const response = await fetch(`${API_BASE_URL}/onboarding/save`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
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
      const response = await fetch(`${API_BASE_URL}/onboarding/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
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
