import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProgress } from '../hooks/useQueries';
import { Loader2, TrendingUp, Award } from 'lucide-react';

export default function ProgressPage() {
  const { data: attempts, isLoading, error } = useProgress();

  const calculateStats = () => {
    if (!attempts || attempts.length === 0) return null;

    const totalAttempts = attempts.length;
    const totalScore = attempts.reduce((sum, attempt) => sum + Number(attempt.score), 0);
    const averageScore = totalScore / totalAttempts;

    return {
      totalAttempts,
      averageScore: Math.round(averageScore * 10) / 10,
    };
  };

  const stats = calculateStats();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Your Learning Progress</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Track your quiz performance and see how much you've learned. All data is stored anonymously 
          on your device.
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
            <CardTitle className="text-destructive">Error Loading Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Unable to load your progress. Please try again later.</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && (!attempts || attempts.length === 0) && (
        <Card>
          <CardHeader>
            <CardTitle>No Progress Yet</CardTitle>
            <CardDescription>
              You haven't completed any quizzes yet. Start learning to track your progress!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/quizzes">
              <Button>Take Your First Quiz</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && attempts && attempts.length > 0 && (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle>Total Quizzes</CardTitle>
                    <CardDescription>Completed attempts</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">{stats?.totalAttempts}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle>Average Score</CardTitle>
                    <CardDescription>Across all quizzes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">{stats?.averageScore}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Quiz Attempts</CardTitle>
              <CardDescription>Your latest quiz results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attempts.slice().reverse().map((attempt) => {
                  const date = new Date(Number(attempt.timestamp) / 1000000);
                  return (
                    <div
                      key={Number(attempt.attemptId)}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium mb-1">Quiz #{Number(attempt.quizId)}</p>
                        <p className="text-sm text-muted-foreground">
                          {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-lg px-4 py-2">
                        Score: {Number(attempt.score)}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex gap-4">
            <Link to="/quizzes">
              <Button>Take Another Quiz</Button>
            </Link>
            <Link to="/learn">
              <Button variant="outline">Continue Learning</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
