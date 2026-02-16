import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { CheckCircle2, Mail, School } from 'lucide-react';

export default function SubscribePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Subscribe to Navy Learning Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get access to premium educational content, advanced quizzes, and exclusive Navy history resources.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5 text-primary" />
                Free Access
              </CardTitle>
              <CardDescription>Perfect for students getting started</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Access to all basic learning topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Standard quizzes and games</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Progress tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Community support</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link to="/">
                  <Button variant="outline" className="w-full">
                    Continue with Free Access
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Premium Access
              </CardTitle>
              <CardDescription>Enhanced learning experience</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Everything in Free Access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Advanced quizzes and challenges</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Exclusive historical content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Detailed performance analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <div className="mt-6">
                <p className="text-center text-muted-foreground text-sm mb-4">
                  Contact your school administrator for premium access
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              School & Institutional Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This educational platform is designed for school use. To subscribe or upgrade to premium access:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-foreground">1.</span>
                <span>Contact your school's administration or IT department</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-foreground">2.</span>
                <span>Request institutional access to Navy Learning Hub</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-foreground">3.</span>
                <span>Your school will coordinate with our education team for setup</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This platform does not process payments directly. All subscription arrangements 
              are handled through approved educational channels and school administration.
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link to="/">
            <Button variant="ghost">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
