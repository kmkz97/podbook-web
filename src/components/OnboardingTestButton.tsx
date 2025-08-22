import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/useOnboarding';

const OnboardingTestButton: React.FC = () => {
  const navigate = useNavigate();
  const { resetOnboarding } = useOnboarding();

  const handleTestOnboarding = () => {
    resetOnboarding();
    navigate('/onboarding');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleTestOnboarding}
        variant="outline"
        size="sm"
        className="bg-background/90 backdrop-blur-sm shadow-lg border-border"
      >
        Test Onboarding
      </Button>
    </div>
  );
};

export default OnboardingTestButton;
