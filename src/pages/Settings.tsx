import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  CreditCard, 
  Settings as SettingsIcon, 
  ChevronRight,
  Home,
  BookOpen,
  FileText,
  LogOut,
  ChevronDown
} from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your account information and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john.doe@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input id="bio" placeholder="Tell us about yourself..." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your Podbook experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive updates about your projects</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBillingAndPlan = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You're currently on the Pro plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-semibold">Pro Plan</h3>
              <p className="text-sm text-muted-foreground">$19/month</p>
            </div>
            <Button variant="outline">Change Plan</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Manage your payment methods and billing details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Edit</Button>
          </div>
          <Button variant="outline" className="w-full">
            <CreditCard className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Pro Plan - December 2024</p>
                <p className="text-sm text-muted-foreground">Dec 1, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$19.00</p>
                <p className="text-sm text-muted-foreground">Paid</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Pro Plan - November 2024</p>
                <p className="text-sm text-muted-foreground">Nov 1, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$19.00</p>
                <p className="text-sm text-muted-foreground">Paid</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Left Navigation */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-foreground">Podbook</h1>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-6">
          <div className="space-y-2">
            <Link to="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="w-4 h-4 mr-3" />
                Dashboard
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-3" />
                My Projects
              </Button>
            </Link>
            <Link to="/new-project">
              <Button variant="default" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-3" />
                Create Book
              </Button>
            </Link>
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <Button 
              variant={activeSection === 'account' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveSection('account')}
            >
              <User className="w-4 h-4 mr-3" />
              Account Settings
            </Button>
            <Button 
              variant={activeSection === 'billing' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setActiveSection('billing')}
            >
              <CreditCard className="w-4 h-4 mr-3" />
              Billing and Plan
            </Button>
          </div>
        </div>

        {/* User Section - Sticky Bottom */}
        <div className="mt-auto p-6 border-t border-border">
          <div className="group relative">
            <div className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Pro Account</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>

            {/* Settings Dropdown - appears on hover and stays open */}
            <div className="absolute bottom-full left-0 right-0 mb-0 bg-background border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto hover:opacity-100">
              <div className="p-2">
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground border-b border-border mb-2">
                  Credits 2392
                </div>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <SettingsIcon className="w-4 h-4 mr-3" />
                  Settings
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-3" />
                  Billing and Plan
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {activeSection === 'account' ? 'Account Settings' : 'Billing and Plan'}
              </h1>
              <p className="text-muted-foreground">
                {activeSection === 'account' 
                  ? 'Manage your account settings and preferences' 
                  : 'View and manage your subscription and billing information'
                }
              </p>
            </div>

            {activeSection === 'account' ? renderAccountSettings() : renderBillingAndPlan()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
