import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Brain, Gamepad2, TrendingUp } from 'lucide-react';
import { branding } from '@/config/branding';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Welcome to {branding.siteName}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Explore the history, traditions, and careers of the United States Navy through interactive lessons, quizzes, and educational games.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/learn">
            <Button size="lg" className="font-semibold">
              Start Learning
            </Button>
          </Link>
          <Link to="/quizzes">
            <Button size="lg" variant="outline" className="font-semibold">
              Take a Quiz
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <BookOpen className="w-10 h-10 mb-2 text-primary" />
            <CardTitle>Learn</CardTitle>
            <CardDescription>
              Discover Navy history, ships, ranks, and traditions through clear, engaging lessons.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/learn">
              <Button variant="ghost" className="w-full">
                Explore Topics
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Brain className="w-10 h-10 mb-2 text-primary" />
            <CardTitle>Quizzes</CardTitle>
            <CardDescription>
              Test your knowledge with multiple-choice quizzes on various Navy topics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/quizzes">
              <Button variant="ghost" className="w-full">
                Take a Quiz
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Gamepad2 className="w-10 h-10 mb-2 text-primary" />
            <CardTitle>Games</CardTitle>
            <CardDescription>
              Play educational mini-games that make learning about the Navy fun and interactive.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/games">
              <Button variant="ghost" className="w-full">
                Play Games
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <TrendingUp className="w-10 h-10 mb-2 text-primary" />
            <CardTitle>Progress</CardTitle>
            <CardDescription>
              Track your quiz scores and see how much you've learned over time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/progress">
              <Button variant="ghost" className="w-full">
                View Progress
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">School-Friendly Learning</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          This educational website is designed for students of all ages. All content is appropriate for classroom use, 
          with no ads, no chat features, and no collection of personal information. Learn more about our policies and 
          educational approach on our About page.
        </p>
        <Link to="/about">
          <Button variant="outline" className="mt-6">
            Learn More About This Site
          </Button>
        </Link>
      </section>
    </div>
  );
}
