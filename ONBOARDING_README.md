# Onboarding Flow Documentation

## Overview
The onboarding flow is a 5-step process designed to gather essential information from new users to personalize their experience with the AI-powered content transformation platform.

## Features

### 5-Step Onboarding Process
1. **Writing Experience** - Assess user's writing background
2. **Book Purpose** - Understand the primary goal of their book
3. **Target Audience** - Identify who the content is for
4. **Content Sources** - Determine what materials they'll be working with
5. **Timeline & Goals** - Understand project scope and deadlines

### Key Components

#### OnboardingFlow Component (`src/components/OnboardingFlow.tsx`)
- Multi-step form with progress indicator
- Radio button and checkbox inputs
- Custom input fields when "Other" is selected
- Navigation between steps
- Skip functionality

#### useOnboarding Hook (`src/hooks/useOnboarding.ts`)
- Manages onboarding state
- Handles localStorage persistence
- Provides methods for completing, skipping, and resetting onboarding

#### OnboardingGuard Component (`src/components/OnboardingGuard.tsx`)
- Protects routes from users who haven't completed onboarding
- Automatically redirects to onboarding when needed
- Shows loading states during checks

#### Onboarding Page (`src/pages/Onboarding.tsx`)
- Main onboarding page component
- Integrates with authentication context
- Handles completion and navigation

## User Flow

### New User Registration
1. User signs up → Redirected to onboarding
2. Completes 5-step onboarding → Redirected to dashboard
3. Can skip onboarding → Redirected to dashboard

### Existing User Login
1. User logs in → Check onboarding status
2. If incomplete → Redirected to onboarding
3. If complete → Redirected to dashboard

### Protected Routes
- Dashboard, Projects, Settings, etc. are protected
- Users must complete onboarding to access these routes
- Automatic redirects ensure proper flow

## Data Collection

### Writing Experience
- Complete beginner
- Some experience
- Experienced
- Professional

### Book Purpose
- Business/Professional
- Educational
- Personal
- Academic/Research
- Other

### Target Audience
- Industry professionals
- Students and learners
- General public
- Specific niche
- Mixed audience

### Content Sources (Multiple choice)
- RSS feeds and blogs
- Existing documents
- Audio/video recordings
- Research papers
- Personal notes
- Other (with custom input)

### Timeline
- Quick turnaround (1-2 weeks)
- Moderate pace (1-2 months)
- Standard timeline (3-6 months)
- Long-term project (6+ months)
- No specific deadline

## Technical Implementation

### State Management
- Local state for form data
- localStorage for persistence
- React Router for navigation
- Context integration for auth

### Routing
- `/onboarding` - Main onboarding flow
- Protected routes wrapped with `OnboardingGuard`
- Automatic redirects based on completion status

### Testing
- Test button available on dashboard (bottom-right corner)
- Resets onboarding state for testing
- Easy access to onboarding flow

## Future Enhancements

### Backend Integration
- Save onboarding data to user profile
- Use data for AI personalization
- Analytics and insights

### Additional Features
- Progress saving between sessions
- Conditional questions based on previous answers
- Integration with project creation flow
- Personalized recommendations based on responses

## Usage

### For Developers
```tsx
import { useOnboarding } from '@/hooks/useOnboarding';

const { isOnboardingComplete, completeOnboarding, skipOnboarding } = useOnboarding();
```

### For Testing
- Use the "Test Onboarding" button on the dashboard
- Reset onboarding state to test the flow
- Navigate through all steps to verify functionality

## File Structure
```
src/
├── components/
│   ├── OnboardingFlow.tsx      # Main onboarding component
│   ├── OnboardingGuard.tsx     # Route protection
│   └── OnboardingTestButton.tsx # Testing utility
├── hooks/
│   └── useOnboarding.ts        # Onboarding state management
├── pages/
│   └── Onboarding.tsx          # Onboarding page
└── App.tsx                     # Route configuration
```

## Styling
- Uses existing UI components from shadcn/ui
- Responsive design for mobile and desktop
- Consistent with app's design system
- Progress indicators and visual feedback
