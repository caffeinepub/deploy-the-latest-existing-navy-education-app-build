import { useParams, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const topicContent: Record<string, { title: string; content: string[]; keyFacts: string[] }> = {
  history: {
    title: 'Navy History',
    content: [
      'The United States Navy was established on October 13, 1775, during the American Revolutionary War. The Continental Congress authorized the creation of a naval force to defend American waters and disrupt British supply lines.',
      'Throughout its history, the Navy has played crucial roles in major conflicts including the War of 1812, the Civil War, World Wars I and II, and modern peacekeeping operations around the world.',
      'Today, the US Navy is the largest and most powerful navy in the world, with a mission to maintain freedom of the seas and protect American interests globally.',
    ],
    keyFacts: [
      'Founded: October 13, 1775',
      'First ship: USS Alfred',
      'Current fleet: Over 290 ships',
      'Personnel: Approximately 350,000 active duty',
      'Motto: "Non sibi sed patriae" (Not for self but for country)',
    ],
  },
  ships: {
    title: 'Ships and Vessels',
    content: [
      'The Navy operates many different types of ships, each designed for specific missions. Aircraft carriers are the largest warships and serve as mobile airbases. Destroyers provide protection and can launch missiles.',
      'Submarines operate underwater and can stay submerged for months. They are used for intelligence gathering and strategic deterrence. Amphibious ships transport Marines and their equipment for operations on land.',
      'Support vessels like supply ships, hospital ships, and repair ships keep the fleet running smoothly during long deployments.',
    ],
    keyFacts: [
      'Aircraft Carriers: 11 in service',
      'Submarines: Over 60 vessels',
      'Destroyers: Fast, multi-mission ships',
      'Cruisers: Large surface combatants',
      'Support Ships: Essential for operations',
    ],
  },
  ranks: {
    title: 'Ranks and Structure',
    content: [
      'The Navy uses a rank system to organize its personnel. Enlisted sailors start as Seaman Recruits and can advance through hard work and training. The enlisted ranks include Seaman, Petty Officer, and Chief Petty Officer levels.',
      'Officers lead sailors and manage operations. They begin as Ensigns after completing officer training and can advance to Lieutenant, Commander, Captain, and Admiral ranks.',
      'Each rank comes with increased responsibility and leadership duties. The chain of command ensures clear communication and effective operations.',
    ],
    keyFacts: [
      'Enlisted: E-1 (Seaman Recruit) to E-9 (Master Chief)',
      'Officers: O-1 (Ensign) to O-10 (Admiral)',
      'Warrant Officers: Technical specialists',
      'Promotion: Based on performance and time',
      'Insignia: Worn on uniforms to show rank',
    ],
  },
  traditions: {
    title: 'Traditions and Customs',
    content: [
      'The Navy has many traditions that connect today\'s sailors with those who served before them. Saluting is a sign of respect between service members. The ship\'s bell is used to mark time and important ceremonies.',
      'Naval flags and pennants communicate messages between ships. The tradition of "crossing the line" celebrates sailors who cross the equator for the first time.',
      'These traditions build pride, discipline, and a sense of belonging to something larger than oneself.',
    ],
    keyFacts: [
      'Saluting: Shows respect and courtesy',
      'Ship\'s Bell: Marks time and ceremonies',
      'Naval Flags: Used for communication',
      'Crossing the Line: Equator ceremony',
      'Piping Aboard: Traditional greeting',
    ],
  },
  careers: {
    title: 'Navy Careers',
    content: [
      'The Navy offers over 150 different career paths called ratings. These include technical jobs like electronics technician, aviation mechanic, and information systems specialist.',
      'Medical careers include hospital corpsmen who provide healthcare to sailors and Marines. Other careers focus on operations, intelligence, logistics, and administration.',
      'Many Navy skills transfer to civilian careers after service. The Navy provides training, education benefits, and hands-on experience in valuable fields.',
    ],
    keyFacts: [
      'Over 150 career ratings available',
      'Technical: Engineering, IT, aviation',
      'Medical: Healthcare and dental',
      'Operations: Navigation, weapons, communications',
      'Training: World-class education and certification',
    ],
  },
  technology: {
    title: 'Naval Technology',
    content: [
      'The Navy uses advanced technology for navigation, communication, and safety. GPS systems help ships navigate precisely anywhere in the world. Radar detects other vessels and aircraft.',
      'Communication systems allow ships to stay in contact with each other and with command centers on shore. Sonar helps submarines and surface ships detect underwater objects.',
      'Safety equipment includes life rafts, fire suppression systems, and damage control tools. Modern ships also use computer systems to monitor and control many functions automatically.',
    ],
    keyFacts: [
      'GPS: Global positioning for navigation',
      'Radar: Detects ships and aircraft',
      'Sonar: Underwater detection system',
      'Communications: Satellite and radio systems',
      'Safety: Advanced life-saving equipment',
    ],
  },
};

export default function LearnTopicPage() {
  const { topicId } = useParams({ from: '/learn/$topicId' });
  const topic = topicContent[topicId];

  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Topic Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Sorry, we couldn't find that topic.</p>
            <Link to="/learn">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Topics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/learn">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Topics
        </Button>
      </Link>

      <h1 className="text-4xl font-bold mb-8">{topic.title}</h1>

      <div className="space-y-6 mb-8">
        {topic.content.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed text-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Key Facts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {topic.keyFacts.map((fact, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="mt-8 flex gap-4">
        <Link to="/quizzes">
          <Button>Test Your Knowledge</Button>
        </Link>
        <Link to="/learn">
          <Button variant="outline">Explore More Topics</Button>
        </Link>
      </div>
    </div>
  );
}
