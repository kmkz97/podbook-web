import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authAPI, usersAPI, projectAPI } from '@/services/api';

const ApiTest = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testAuth = async () => {
    setIsLoading(true);
    try {
      // Test registration
      addResult('Testing user registration...');
      const registerResponse = await authAPI.register({
        name: 'API Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      });
      addResult(`✅ Registration successful: ${registerResponse.user.name}`);

      // Test login
      addResult('Testing user login...');
      const loginResponse = await authAPI.login({
        email: registerResponse.user.email,
        password: 'password123'
      });
      addResult(`✅ Login successful: ${loginResponse.user.name}`);

      // Test logout
      addResult('Testing user logout...');
      await authAPI.logout();
      addResult('✅ Logout successful');

    } catch (error) {
      addResult(`❌ Auth test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testUsers = async () => {
    setIsLoading(true);
    try {
      addResult('Testing users API...');
      const response = await usersAPI.getAllUsers();
      addResult(`✅ Users API successful: ${response.message}`);
    } catch (error) {
      addResult(`❌ Users API failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testProjects = async () => {
    setIsLoading(true);
    try {
      addResult('Testing projects API...');
      const response = await projectsAPI.getAllProjects();
      addResult(`✅ Projects API successful: ${response.message}`);
    } catch (error) {
      addResult(`❌ Projects API failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>API Connection Test</CardTitle>
          <CardDescription>
            Test the connection between frontend and backend APIs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={testAuth} disabled={isLoading}>
              Test Authentication
            </Button>
            <Button onClick={testUsers} disabled={isLoading}>
              Test Users API
            </Button>
            <Button onClick={testProjects} disabled={isLoading}>
              Test Projects API
            </Button>
            <Button onClick={clearResults} variant="outline">
              Clear Results
            </Button>
          </div>

          <div className="border rounded-lg p-4 bg-muted/50">
            <h3 className="font-semibold mb-2">Test Results:</h3>
            {testResults.length === 0 ? (
              <p className="text-muted-foreground">No tests run yet. Click a test button above.</p>
            ) : (
              <div className="space-y-1">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono">
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            <p><strong>Backend URL:</strong> http://localhost:3000</p>
            <p><strong>Frontend URL:</strong> http://localhost:8080</p>
            <p><strong>Status:</strong> {isLoading ? 'Testing...' : 'Ready'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiTest;
