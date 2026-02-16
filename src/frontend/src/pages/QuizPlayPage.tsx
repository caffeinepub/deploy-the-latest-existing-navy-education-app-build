import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useQuiz, useSubmitQuizAttempt } from '../hooks/useQueries';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function QuizPlayPage() {
  const { quizId } = useParams({ from: '/quiz/$quizId' });
  const navigate = useNavigate();
  const { data: quiz, isLoading, error } = useQuiz(BigInt(quizId));
  const submitMutation = useSubmitQuizAttempt();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [selectedChoice, setSelectedChoice] = useState<string>('');

  useEffect(() => {
    setSelectedChoice(selectedAnswers[currentQuestionIndex]?.toString() || '');
  }, [currentQuestionIndex, selectedAnswers]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error Loading Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Unable to load this quiz. Please try again later.</p>
            <Link to="/quizzes">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Quizzes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleNext = () => {
    if (selectedChoice) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestionIndex]: parseInt(selectedChoice),
      });

      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Calculate score and submit
        const answers = {
          ...selectedAnswers,
          [currentQuestionIndex]: parseInt(selectedChoice),
        };
        let correctCount = 0;
        quiz.questions.forEach((q, idx) => {
          if (answers[idx] === Number(q.correctChoice)) {
            correctCount++;
          }
        });

        submitMutation.mutate(
          { quizId: BigInt(quizId), score: BigInt(correctCount) },
          {
            onSuccess: () => {
              navigate({
                to: `/quiz/${quizId}/results`,
                search: { score: correctCount, total: totalQuestions },
              });
            },
          }
        );
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link to="/quizzes">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quizzes
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start mb-4">
            <div>
              <CardTitle className="text-2xl mb-2">{quiz.title}</CardTitle>
              <CardDescription>Topic: {quiz.topic}</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-muted-foreground">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>

            <RadioGroup value={selectedChoice} onValueChange={setSelectedChoice}>
              <div className="space-y-3">
                {currentQuestion.choices.map((choice, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedChoice(index.toString())}
                  >
                    <RadioGroupItem value={index.toString()} id={`choice-${index}`} />
                    <Label
                      htmlFor={`choice-${index}`}
                      className="flex-1 cursor-pointer text-base"
                    >
                      {choice}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedChoice || submitMutation.isPending}
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : currentQuestionIndex === totalQuestions - 1 ? (
                'Finish Quiz'
              ) : (
                'Next Question'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
