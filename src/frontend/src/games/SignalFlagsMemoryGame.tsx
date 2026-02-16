import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw } from 'lucide-react';

const flags = [
  { id: 1, name: 'Alpha', symbol: 'A', meaning: 'Diver down' },
  { id: 2, name: 'Bravo', symbol: 'B', meaning: 'Dangerous cargo' },
  { id: 3, name: 'Charlie', symbol: 'C', meaning: 'Yes/Affirmative' },
  { id: 4, name: 'Delta', symbol: 'D', meaning: 'Keep clear' },
  { id: 5, name: 'Echo', symbol: 'E', meaning: 'Altering course' },
  { id: 6, name: 'Foxtrot', symbol: 'F', meaning: 'Disabled' },
];

type CardState = {
  id: number;
  flagId: number;
  name: string;
  symbol: string;
  meaning: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function SignalFlagsMemoryGame() {
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards: CardState[] = [];
    flags.forEach((flag, index) => {
      gameCards.push({
        id: index * 2,
        flagId: flag.id,
        name: flag.name,
        symbol: flag.symbol,
        meaning: flag.meaning,
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: index * 2 + 1,
        flagId: flag.id,
        name: flag.name,
        symbol: flag.symbol,
        meaning: flag.meaning,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameComplete(false);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.flagId === secondCard.flagId) {
        // Match found
        setTimeout(() => {
          setCards(cards.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c
          ));
          setFlippedCards([]);
          setMatches(matches + 1);
          
          if (matches + 1 === flags.length) {
            setGameComplete(true);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(cards.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Signal Flags Memory Game</CardTitle>
          <CardDescription className="text-base">
            Match pairs of naval signal flags to learn their meanings. Click or press Enter/Space on cards to flip them.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Learning Objective:</h3>
            <p className="text-sm text-muted-foreground">
              Learn to recognize naval signal flags and understand their meanings. Signal flags are used for 
              communication between ships and have been an important part of naval tradition for centuries.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <Badge variant="secondary" className="text-base px-4 py-2">
                Moves: {moves}
              </Badge>
              <Badge variant="secondary" className="text-base px-4 py-2">
                Matches: {matches}/{flags.length}
              </Badge>
            </div>
            <Button onClick={initializeGame} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Game
            </Button>
          </div>

          {gameComplete && (
            <Card className="bg-primary/10 border-primary">
              <CardContent className="pt-6">
                <p className="text-center text-lg font-semibold">
                  🎉 Congratulations! You matched all the flags in {moves} moves!
                </p>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(card.id);
                  }
                }}
                disabled={card.isMatched || flippedCards.length === 2}
                className={`
                  aspect-square rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  ${card.isFlipped || card.isMatched
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card hover:bg-muted border-border hover:border-primary'
                  }
                  ${card.isMatched ? 'opacity-60' : ''}
                  disabled:cursor-not-allowed
                `}
              >
                <div className="flex flex-col items-center justify-center h-full p-2">
                  {card.isFlipped || card.isMatched ? (
                    <>
                      <div className="text-3xl font-bold mb-1">{card.symbol}</div>
                      <div className="text-xs font-medium">{card.name}</div>
                    </>
                  ) : (
                    <div className="text-4xl">⚓</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg">How to Play</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">1.</span>
                  <span>Click or press Enter/Space on a card to flip it over</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">2.</span>
                  <span>Try to find the matching card with the same flag</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">3.</span>
                  <span>When you find a match, both cards stay face up</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">4.</span>
                  <span>Match all pairs to complete the game!</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
