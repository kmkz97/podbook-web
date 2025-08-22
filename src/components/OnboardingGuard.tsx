import React from 'react';
import { Navigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useAuth } from '@/contexts/AuthContext';

interface OnboardingGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const OnboardingGuard: React.FC<OnboardingGuardProps> = ({ 
  children, 
  redirectTo = '/onboarding' 
}) => {
  const { isOnboardingComplete, isLoading } = useOnboarding();
  const { user } = useAuth();

  // Show loading state while checking auth and onboarding status
  if (isLoading || (user && isOnboardingComplete === null)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If user is not authenticated, don't redirect to onboarding
  if (!user) {
    return <>{children}</>;
  }

  // Only redirect to onboarding if we're certain onboarding is not complete
  if (isOnboardingComplete === false) {
    console.log('redirecting to onboarding');
    return <Navigate to={redirectTo} replace />;
  }

  // If onboarding is complete or status is unknown, render the protected content
  return <>{children}</>;
};

export default OnboardingGuard;