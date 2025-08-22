import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingFlow from '@/components/OnboardingFlow';
import { useOnboarding, OnboardingData } from '@/hooks/useOnboarding';
import { useAuth } from '@/contexts/AuthContext';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { onboardingData, completeOnboarding, skipOnboarding } = useOnboarding();
  const { user } = useAuth();

  const handleComplete = async (data: OnboardingData) => {
    try {
      // Complete onboarding
      completeOnboarding(data);
      console.log('Onboarding completed:', data);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const handleStartBook = () => {
    completeOnboarding(onboardingData || {} as OnboardingData);
    navigate('/new-project');
  };

  const handleGoToDashboard = () => {
    completeOnboarding(onboardingData || {} as OnboardingData);
    navigate('/dashboard');
  };

  const handleScheduleCall = () => {
    // Open Calendly link in new tab
    window.open('https://calendly.com/podbook', '_blank');
  };

  const handleScheduleCallAndNavigate = () => {
    // Complete onboarding first, then open Calendly link in new tab AND navigate to dashboard
    completeOnboarding(onboardingData || {} as OnboardingData);
    window.open('https://calendly.com/podbook', '_blank');
    navigate('/dashboard');
  };

  const handleSkip = () => {
    skipOnboarding();
    navigate('/dashboard');
  };

  // If user is not authenticated, redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen">
      <OnboardingFlow 
        onComplete={handleComplete}
        onSkip={handleSkip}
        onStartBook={handleStartBook}
        onGoToDashboard={handleGoToDashboard}
        onScheduleCall={handleScheduleCall}
        onScheduleCallAndNavigate={handleScheduleCallAndNavigate}
      />
    </div>
  );
};

export default Onboarding;
