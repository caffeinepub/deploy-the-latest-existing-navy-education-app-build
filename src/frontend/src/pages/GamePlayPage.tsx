import { useParams, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import SignalFlagsMemoryGame from '../games/SignalFlagsMemoryGame';
import ShipLogTimelineGame from '../games/ShipLogTimelineGame';

export default function GamePlayPage() {
  const { gameId } = useParams({ from: '/games/$gameId' });

  const renderGame = () => {
    switch (gameId) {
      case 'signal-flags':
        return <SignalFlagsMemoryGame />;
      case 'timeline':
        return <ShipLogTimelineGame />;
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Game Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Sorry, we couldn't find that game.</p>
              <Link to="/games">
                <Button>Back to Games</Button>
              </Link>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/games">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
      </Link>
      {renderGame()}
    </div>
  );
}
