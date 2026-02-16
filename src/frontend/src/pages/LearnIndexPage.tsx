import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const topics = [
  {
    id: 'history',
    title: 'Navy History',
    description: 'Learn about the founding of the US Navy, major battles, and historical milestones from 1775 to today.',
    difficulty: 'Beginner',
  },
  {
    id: 'ships',
    title: 'Ships and Vessels',
    description: 'Explore different types of Navy ships including aircraft carriers, destroyers, submarines, and support vessels.',
    difficulty: 'Beginner',
  },
  {
    id: 'ranks',
    title: 'Ranks and Structure',
    description: 'Understand the Navy rank system, from Seaman Recruit to Admiral, and how the chain of command works.',
    difficulty: 'Intermediate',
  },
  {
    id: 'traditions',
    title: 'Traditions and Customs',
    description: 'Discover Navy traditions like the bell ceremony, crossing the line, and the meaning of naval flags.',
    difficulty: 'Beginner',
  },
  {
    id: 'careers',
    title: 'Navy Careers',
    description: 'Learn about the many career paths available in the Navy, from engineering to medicine to aviation.',
    difficulty: 'Intermediate',
  },
  {
    id: 'technology',
    title: 'Naval Technology',
    description: 'Explore the technology used by the Navy including navigation systems, communications, and safety equipment.',
    difficulty: 'Advanced',
  },
];

export default function LearnIndexPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Learn About the US Navy</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Explore a variety of topics to learn about the United States Navy's history, operations, and traditions. 
          Each topic provides clear, age-appropriate information perfect for students.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Link key={topic.id} to="/learn/$topicId" params={{ topicId: topic.id }}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                  <Badge variant="outline">{topic.difficulty}</Badge>
                </div>
                <CardDescription className="text-base">
                  {topic.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-primary font-medium">Read more →</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
