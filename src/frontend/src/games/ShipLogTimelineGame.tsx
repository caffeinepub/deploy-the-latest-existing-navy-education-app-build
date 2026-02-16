import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, RotateCcw, CheckCircle2 } from 'lucide-react';

type TimelineEvent = {
  id: number;
  year: number;
  title: string;
  description: string;
};

const correctEvents: TimelineEvent[] = [
  {
    id: 1,
    year: 1775,
    title: 'Navy Founded',
    description: 'Continental Congress establishes the Continental Navy',
  },
  {
    id: 2,
    year: 1812,
    title: 'War of 1812',
    description: 'USS Constitution earns nickname "Old Ironsides"',
  },
  {
    id: 3,
    year: 1898,
    title: 'Spanish-American War',
    description: 'Navy demonstrates modern naval power',
  },
  {
    id: 4,
    year: 1941,
    title: 'Pearl Harbor',
    description: 'US enters World War II after attack',
  },
  {
    id: 5,
    year: 1954,
    title: 'First Nuclear Submarine',
    description: 'USS Nautilus launches, first nuclear-powered vessel',
  },
  {
    id: 6,
    year: 1975,
    title: 'First Female Pilots',
    description: 'Women begin training as Navy pilots',
  },
];

export default function ShipLogTimelineGame() {
  const [events, setEvents] = useState<TimelineEvent[]>(() => {
    const shuffled = [...correctEvents];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });
  const [isComplete, setIsComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newEvents = [...events];
    [newEvents[index], newEvents[index - 1]] = [newEvents[index - 1], newEvents[index]];
    setEvents(newEvents);
    setAttempts(attempts + 1);
  };

  const moveDown = (index: number) => {
    if (index === events.length - 1) return;
    const newEvents = [...events];
    [newEvents[index], newEvents[index + 1]] = [newEvents[index + 1], newEvents[index]];
    setEvents(newEvents);
    setAttempts(attempts + 1);
  };

  const checkOrder = () => {
    const correct = events.every((event, index) => event.id === correctEvents[index].id);
    if (correct) {
      setIsComplete(true);
    }
  };

  const resetGame = () => {
    const shuffled = [...correctEvents];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setEvents(shuffled);
    setIsComplete(false);
    setAttempts(0);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Navy History Timeline</CardTitle>
          <CardDescription className="text-base">
            Arrange these important events in US Navy history in chronological order from earliest to latest.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Learning Objective:</h3>
            <p className="text-sm text-muted-foreground">
              Understand the sequence of major events in US Navy history and learn about key milestones that 
              shaped the modern Navy.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-base px-4 py-2">
              Moves: {attempts}
            </Badge>
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Game
            </Button>
          </div>

          {isComplete && (
            <Card className="bg-primary/10 border-primary">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <p className="text-center text-lg font-semibold">
                    Perfect! You arranged all events correctly in {attempts} moves!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            {events.map((event, index) => (
              <Card
                key={event.id}
                className={`${
                  isComplete ? 'bg-primary/5 border-primary' : 'hover:shadow-md'
                } transition-shadow`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => moveUp(index)}
                        disabled={index === 0 || isComplete}
                        aria-label="Move up"
                        className="h-8 w-8"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => moveDown(index)}
                        disabled={index === events.length - 1 || isComplete}
                        aria-label="Move down"
                        className="h-8 w-8"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {isComplete && (
                          <Badge variant="outline" className="font-mono">
                            {event.year}
                          </Badge>
                        )}
                        <h3 className="font-semibold">{event.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {!isComplete && (
            <Button onClick={checkOrder} className="w-full" size="lg">
              Check My Answer
            </Button>
          )}

          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg">How to Play</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">1.</span>
                  <span>Use the up and down arrow buttons to rearrange events</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">2.</span>
                  <span>Put the earliest event at the top and the latest at the bottom</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">3.</span>
                  <span>Click "Check My Answer" when you think you have the correct order</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">4.</span>
                  <span>The years will be revealed when you get the order correct!</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
