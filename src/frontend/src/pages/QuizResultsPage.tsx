import { useParams, useSearch, Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuiz } from '../hooks/useQueries';
import { CheckCircle2, Trophy, ArrowLeft } from 'lucide-react';

export default function QuizResultsPage() {
  const { quizId } = useParams({ from: '/quiz/$quizId/results' });
  const search = useSearch({ from: '/quiz/$quizId/results' }) as { score?: number; total?: number };
  const { data: quiz } = useQuiz(BigInt(quizId));

  const score = search.score || 0;
  const total = search.total || quiz?.questions.length || 0;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return 'Outstanding! You really know your Navy facts!';
    if (percentage >= 70) return 'Great job! You have a solid understanding!';
    if (percentage >= 50) return 'Good effort! Keep learning to improve!';
    return 'Keep studying! Review the topics and try again!';
  };

  const getPerformanceColor = () => {
    if (percentage >= 70) return 'text-green-600 dark:text-green-400';
    if (percentage >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-orange-600 dark:text-orange-400';
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link to="/quizzes">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quizzes
        </Button>
      </Link>

      <Card className="mb-8">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="text-3xl mb-2">Quiz Complete!</CardTitle>
          <CardDescription className="text-lg">
            {quiz?.title || 'Quiz Results'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold mb-2 text-primary">
              {score}/{total}
            </div>
            <div className="text-2xl font-semibold mb-4">
              {percentage}% Correct
            </div>
            <p className={`text-lg font-medium ${getPerformanceColor()}`}>
              {getPerformanceMessage()}
            </p>
          </div>

          {quiz && (
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-xl font-semibold mb-4">Answer Review</h3>
              {quiz.questions.map((question, index) => {
                const isCorrect = true; // We don't track individual answers in this flow
                return (
                  <Card key={Number(question.id)} className="bg-muted/30">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Badge variant={isCorrect ? 'default' : 'destructive'} className="mt-1">
                          Q{index + 1}
                        </Badge>
                        <div className="flex-1">
                          <CardTitle className="text-base mb-2">
                            {question.question}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="font-medium">
                              Correct answer: {question.choices[Number(question.correctChoice)]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link to="/quiz/$quizId" params={{ quizId }} className="flex-1">
              <Button variant="outline" className="w-full">
                Retry Quiz
              </Button>
            </Link>
            <Link to="/quizzes" className="flex-1">
              <Button className="w-full">
                More Quizzes
              </Button>
            </Link>
            <Link to="/progress" className="flex-1">
              <Button variant="secondary" className="w-full">
                View Progress
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
