import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Quiz, QuizQuestion, QuizAttempt } from '../backend';

export function useQuizzes() {
  const { actor, isFetching } = useActor();

  return useQuery<Quiz[]>({
    queryKey: ['quizzes'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuizzes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useQuiz(quizId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Quiz>({
    queryKey: ['quiz', quizId.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getQuiz(quizId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useQuizQuestions(quizId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<QuizQuestion[]>({
    queryKey: ['quiz-questions', quizId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuizQuestions(quizId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitQuizAttempt() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ quizId, score }: { quizId: bigint; score: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitQuizAttempt(quizId, score);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
}

export function useProgress() {
  const { actor, isFetching } = useActor();

  return useQuery<QuizAttempt[]>({
    queryKey: ['progress'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProgress();
    },
    enabled: !!actor && !isFetching,
  });
}
