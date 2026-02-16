import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuizzes } from '../hooks/useQueries';
import { Loader2 } from 'lucide-react';

export default function QuizzesPage() {
  const { data: quizzes, isLoading, error } = useQuizzes();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Navy Knowledge Quizzes</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Test your knowledge about the US Navy with these interactive quizzes. Each quiz covers a specific topic 
          and provides immediate feedback to help you learn.
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error Loading Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Unable to load quizzes. Please try again later.</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && quizzes && quizzes.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No Quizzes Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">There are no quizzes available at the moment. Check back soon!</p>
            <Link to="/learn">
              <Button>Explore Learning Topics</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && quizzes && quizzes.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={Number(quiz.id)} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{quiz.title}</CardTitle>
                  <Badge variant="secondary">{quiz.questions.length} questions</Badge>
                </div>
                <CardDescription>
                  Topic: {quiz.topic}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end">
                <Link to="/quiz/$quizId" params={{ quizId: quiz.id.toString() }}>
                  <Button className="w-full">Start Quiz</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
