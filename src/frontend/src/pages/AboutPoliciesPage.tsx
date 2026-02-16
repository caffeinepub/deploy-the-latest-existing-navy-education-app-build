import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, Lock, BookOpen, Users } from 'lucide-react';
import { branding } from '@/config/branding';

export default function AboutPoliciesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">About This Site</h1>

      <Alert className="mb-8 border-primary">
        <Shield className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold">Important Disclaimer</AlertTitle>
        <AlertDescription className="text-base">
          This is an educational website created for learning purposes only. This site is NOT affiliated with, 
          endorsed by, or officially connected to the United States Navy, the Department of Defense, or any 
          branch of the US government. All content is for educational use only.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-primary" />
              <CardTitle>Our Mission</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {branding.siteName} is designed to help students learn about the United States Navy through 
              interactive lessons, quizzes, and educational games. Our goal is to provide accurate, 
              age-appropriate information about Navy history, traditions, ships, and careers.
            </p>
            <p>
              All content is carefully created to be appropriate for classroom use, including strict school 
              environments and military boarding schools.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-6 h-6 text-primary" />
              <CardTitle>Privacy and Data Policy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What We Collect:</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Anonymous quiz scores and completion times</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>No personal information (no names, emails, or identifying data)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What We Don't Do:</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>No third-party tracking or analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>No advertisements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>No selling or sharing of data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>No cookies for tracking purposes</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-primary" />
              <CardTitle>School-Friendly Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Safe for All Students:</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>No user-generated content or comments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>No chat or messaging features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>No external links (all content is self-contained)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Age-appropriate language and content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>No violent content, combat simulation, or weapons training</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              All educational content on this site focuses on the non-combat aspects of Navy service, including:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Historical events and milestones</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Ship types and their purposes</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Rank structure and organization</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Traditions and customs</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Career opportunities and training</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Technology and navigation</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accessibility</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We strive to make this site accessible to all students. All interactive elements can be used with 
              a keyboard, and we maintain high contrast ratios for readability. If you encounter any accessibility 
              issues, we are committed to continuous improvement.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Questions or Concerns?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This educational website is designed to meet the strictest school approval requirements. 
              All content is appropriate for K-12 students and complies with educational standards for 
              classroom use.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
