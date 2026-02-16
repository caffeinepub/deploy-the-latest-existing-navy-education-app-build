import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flag, Clock } from 'lucide-react';

const games = [
  {
    id: 'signal-flags',
    title: 'Signal Flags Memory',
    description: 'Match pairs of naval signal flags to learn their meanings. This classic memory game helps you recognize important naval communication symbols.',
    objective: 'Learn to recognize naval signal flags and their patterns',
    duration: '5-10 minutes',
    icon: Flag,
  },
  {
    id: 'timeline',
    title: 'Navy History Timeline',
    description: 'Arrange important events in US Navy history in the correct chronological order. Learn about key milestones and achievements.',
    objective: 'Understand the sequence of major Navy historical events',
    duration: '5-8 minutes',
    icon: Clock,
  },
];

export default function GamesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Educational Navy Games</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Learn about the Navy through fun, interactive games. Each game is designed to be educational, 
          school-friendly, and playable with just a mouse or keyboard.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <Card key={game.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{game.title}</CardTitle>
                    <Badge variant="secondary">{game.duration}</Badge>
                  </div>
                </div>
                <CardDescription className="text-base">
                  {game.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm font-medium mb-1">Learning Objective:</p>
                  <p className="text-sm text-muted-foreground">{game.objective}</p>
                </div>
                <Link to="/games/$gameId" params={{ gameId: game.id }}>
                  <Button className="w-full" size="lg">
                    Play Game
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-12 bg-muted/30">
        <CardHeader>
          <CardTitle>Game Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>All games are educational and focus on learning Navy history and traditions</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>No violence, combat simulation, or weapon usage</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Playable with mouse and keyboard for classroom accessibility</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Designed for students of all ages</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
