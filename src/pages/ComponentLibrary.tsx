import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Mail, 
  Phone, 
  User, 
  Lock,
  Eye,
  EyeOff,
  Search,
  Download,
  Upload,
  Settings,
  Home,
  BookOpen,
  Users,
  Calendar,
  Star,
  Heart,
  Share2,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  X,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const ComponentLibrary = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Podbook Component Library
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive showcase of all design components, typography, and UI patterns used throughout the Podbook platform.
              Use this as a reference for maintaining design consistency across all pages.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Typography</h2>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Font Family: Inter</CardTitle>
                <CardDescription>Our primary font family used throughout the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground">Heading 1 - 4xl Bold</h1>
                  <p className="text-sm text-muted-foreground mt-2">Font weight: 700, Size: 2.25rem (36px)</p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Heading 2 - 3xl Bold</h2>
                  <p className="text-sm text-muted-foreground mt-2">Font weight: 700, Size: 1.875rem (30px)</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">Heading 3 - 2xl Semibold</h3>
                  <p className="text-sm text-muted-foreground mt-2">Font weight: 600, Size: 1.5rem (24px)</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground">Heading 4 - xl Semibold</h4>
                  <p className="text-sm text-muted-foreground mt-2">Font weight: 600, Size: 1.25rem (20px)</p>
                </div>
                <div>
                  <p className="text-lg text-foreground">Body Large - lg Regular</p>
                  <p className="text-sm text-muted-foreground mt-2">Font weight: 400, Size: 1.125rem (18px)</p>
                </div>
                <div>
                  <p className="text-base text-foreground">Body - base Regular</p>
                  <p className="text-sm text-muted-foreground mt-2">Font weight: 400, Size: 1rem (16px)</p>
                </div>
                <div>
                  <p className="text-sm text-foreground">Body Small - sm Regular</p>
                  <p className="text-sm text-muted-foreground mt-2">Font weight: 400, Size: 0.875rem (14px)</p>
                </div>
                <div>
                  <p className="text-xs text-foreground">Caption - xs Regular</p>
                  <p className="text-sm text-muted-foreground mt-2">Font weight: 400, Size: 0.75rem (12px)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Font Weights</CardTitle>
                <CardDescription>Available font weight variations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-thin text-foreground">Font Thin (100)</p>
                <p className="font-extralight text-foreground">Font Extra Light (200)</p>
                <p className="font-light text-foreground">Font Light (300)</p>
                <p className="font-normal text-foreground">Font Normal (400)</p>
                <p className="font-medium text-foreground">Font Medium (500)</p>
                <p className="font-semibold text-foreground">Font Semibold (600)</p>
                <p className="font-bold text-foreground">Font Bold (700)</p>
                <p className="font-extrabold text-foreground">Font Extra Bold (800)</p>
                <p className="font-black text-foreground">Font Black (900)</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Color System Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Color System</h2>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Primary Colors</CardTitle>
                <CardDescription>Main brand colors and their variations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-2 border border-border"></div>
                    <p className="text-sm font-medium">Primary</p>
                    <p className="text-xs text-muted-foreground">hsl(var(--primary))</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/90 rounded-lg mx-auto mb-2 border border-border"></div>
                    <p className="text-sm font-medium">Primary/90</p>
                    <p className="text-xs text-muted-foreground">90% opacity</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/80 rounded-lg mx-auto mb-2 border border-border"></div>
                    <p className="text-sm font-medium">Primary/80</p>
                    <p className="text-xs text-muted-foreground">80% opacity</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/50 rounded-lg mx-auto mb-2 border border-border"></div>
                    <p className="text-sm font-medium">Primary/50</p>
                    <p className="text-xs text-muted-foreground">50% opacity</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Semantic Colors</CardTitle>
                <CardDescription>Colors used for different states and meanings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-background rounded-lg mx-auto mb-2 border border-border"></div>
                    <p className="text-sm font-medium">Background</p>
                    <p className="text-xs text-muted-foreground">hsl(var(--background))</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-foreground rounded-lg mx-auto mb-2 border border-border"></div>
                    <p className="text-sm font-medium">Foreground</p>
                    <p className="text-xs text-muted-foreground">hsl(var(--foreground))</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-2 border border-border"></div>
                    <p className="text-sm font-medium">Muted</p>
                    <p className="text-xs text-muted-foreground">hsl(var(--muted))</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted/50 rounded-lg mx-auto mb-2 border border-border"></div>
                    <p className="text-sm font-medium">Muted/50</p>
                    <p className="text-xs text-muted-foreground">50% opacity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Button Components Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Button Components</h2>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>All available button styles and states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Primary Buttons</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button>Default</Button>
                    <Button disabled>Disabled</Button>
                    <Button size="sm">Small</Button>
                    <Button size="lg">Large</Button>
                    <Button className="w-full">Full Width</Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Secondary Buttons</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="secondary" disabled>Disabled</Button>
                    <Button variant="secondary" size="sm">Small</Button>
                    <Button variant="secondary" size="lg">Large</Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Outline Buttons</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline">Outline</Button>
                    <Button variant="outline" disabled>Disabled</Button>
                    <Button variant="outline" size="sm">Small</Button>
                    <Button variant="outline" size="lg">Large</Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Ghost Buttons</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="ghost" disabled>Disabled</Button>
                    <Button variant="ghost" size="sm">Small</Button>
                    <Button variant="ghost" size="lg">Large</Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Destructive Buttons</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="destructive" disabled>Disabled</Button>
                    <Button variant="destructive" size="sm">Small</Button>
                    <Button variant="destructive" size="lg">Large</Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Button with Icons</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                    <Button variant="ghost">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Components Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Form Components</h2>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Fields</CardTitle>
                <CardDescription>Text input components and variations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-input">Default Input</Label>
                    <Input id="default-input" placeholder="Enter text here..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled-input">Disabled Input</Label>
                    <Input id="disabled-input" placeholder="Disabled input" disabled />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="with-icon-input">Input with Icon</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="with-icon-input" placeholder="Search..." className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="error-input">Error Input</Label>
                    <Input id="error-input" placeholder="Error state" className="border-destructive" />
                    <p className="text-sm text-destructive">This field is required</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textarea">Textarea</Label>
                  <Textarea id="textarea" placeholder="Enter longer text here..." rows={4} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="select">Select Dropdown</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="select-disabled">Disabled Select</Label>
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="Disabled select" />
                      </SelectTrigger>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Checkbox</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="checkbox" />
                      <Label htmlFor="checkbox">Accept terms</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Radio Group</Label>
                    <RadioGroup defaultValue="option1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option1" id="radio1" />
                        <Label htmlFor="radio1">Option 1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option2" id="radio2" />
                        <Label htmlFor="radio2">Option 2</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label>Switch</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="switch" />
                      <Label htmlFor="switch">Enable notifications</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Card Components Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Card Components</h2>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Card</CardTitle>
                  <CardDescription>A simple card with header and content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This is a basic card component that can be used throughout the application.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Card with Actions</CardTitle>
                  <CardDescription>Card with interactive elements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Cards can contain various interactive elements like buttons and forms.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm">Action 1</Button>
                    <Button variant="outline" size="sm">Action 2</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feature Card</CardTitle>
                  <CardDescription>Highlighting key features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Feature cards are great for showcasing key capabilities and benefits.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Badge Components Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Badge Components</h2>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Badge Variants</CardTitle>
                <CardDescription>Different badge styles and use cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Default Badges</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Status Badges</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Pending
                    </Badge>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                      <X className="w-3 h-3 mr-1" />
                      Inactive
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Category Badges</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="outline">Technology</Badge>
                    <Badge variant="outline">Business</Badge>
                    <Badge variant="outline">Design</Badge>
                    <Badge variant="outline">Marketing</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Navigation Components Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Navigation Components</h2>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Navigation Patterns</CardTitle>
                <CardDescription>Common navigation components and layouts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Breadcrumb Navigation</h4>
                  <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <a href="#" className="hover:text-foreground transition-colors">Home</a>
                    <ChevronRight className="w-4 h-4" />
                    <a href="#" className="hover:text-foreground transition-colors">Components</a>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-foreground">Library</span>
                  </nav>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Tab Navigation</h4>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="components">Components</TabsTrigger>
                      <TabsTrigger value="usage">Usage</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        Overview content goes here. This demonstrates how tabs work in the application.
                      </p>
                    </TabsContent>
                    <TabsContent value="components" className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        Components content goes here. This shows the different tab states.
                      </p>
                    </TabsContent>
                    <TabsContent value="usage" className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        Usage content goes here. This completes the tab demonstration.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Accordion Navigation</h4>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Getting Started</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Learn how to get started with our component library and design system.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Components</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Explore all available components and their usage examples.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Guidelines</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Follow our design guidelines to maintain consistency across the platform.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Alert Components Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Alert Components</h2>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Variants</CardTitle>
                <CardDescription>Different types of alert messages and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    This is a default informational alert. Use it to provide general information to users.
                  </AlertDescription>
                </Alert>

                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    This is a success alert. Use it to confirm successful actions or positive outcomes.
                  </AlertDescription>
                </Alert>

                <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    This is a warning alert. Use it to warn users about potential issues or required actions.
                  </AlertDescription>
                </Alert>

                <Alert className="border-red-200 bg-red-50 text-red-800">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    This is an error alert. Use it to notify users about errors or critical issues.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Layout Components Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Layout Components</h2>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Grid System</CardTitle>
                <CardDescription>Responsive grid layouts and spacing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Responsive Grid</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="h-20 bg-muted rounded-lg flex items-center justify-center text-sm">1</div>
                    <div className="h-20 bg-muted rounded-lg flex items-center justify-center text-sm">2</div>
                    <div className="h-20 bg-muted rounded-lg flex items-center justify-center text-sm">3</div>
                    <div className="h-20 bg-muted rounded-lg flex items-center justify-center text-sm">4</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Spacing Scale</h4>
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded" style={{ width: '0.25rem' }}></div>
                    <div className="h-4 bg-muted rounded" style={{ width: '0.5rem' }}></div>
                    <div className="h-4 bg-muted rounded" style={{ width: '1rem' }}></div>
                    <div className="h-4 bg-muted rounded" style={{ width: '1.5rem' }}></div>
                    <div className="h-4 bg-muted rounded" style={{ width: '2rem' }}></div>
                    <div className="h-4 bg-muted rounded" style={{ width: '3rem' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1</span>
                    <span>2</span>
                    <span>4</span>
                    <span>6</span>
                    <span>8</span>
                    <span>12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Elements Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Interactive Elements</h2>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hover States & Transitions</CardTitle>
                <CardDescription>Interactive elements with smooth transitions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Hover Effects</h4>
                  <div className="flex flex-wrap gap-4">
                    <Button className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
                      Hover Scale
                    </Button>
                    <Button variant="outline" className="transition-colors duration-200 hover:bg-primary hover:text-primary-foreground">
                      Hover Color
                    </Button>
                    <Button variant="ghost" className="transition-all duration-200 hover:bg-muted hover:shadow-md">
                      Hover Shadow
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Focus States</h4>
                  <div className="flex flex-wrap gap-4">
                    <Input placeholder="Focus me" className="focus:ring-2 focus:ring-primary focus:border-primary" />
                    <Button className="focus:ring-2 focus:ring-primary focus:ring-offset-2">
                      Focus Button
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t pt-8 mt-16">
          <div className="text-center">
            <p className="text-muted-foreground">
              Component Library v1.0 • Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Use this library to maintain design consistency across all Podbook pages and components.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ComponentLibrary;
