import { Link, useRouterState } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { branding } from '@/config/branding';
import AuthNavControl from './AuthNavControl';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/learn', label: 'Learn' },
  { to: '/quizzes', label: 'Quizzes' },
  { to: '/games', label: 'Games' },
  { to: '/progress', label: 'Progress' },
  { to: '/about', label: 'About' },
];

export default function PrimaryNav() {
  const [open, setOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-primary transition-colors">
          <img 
            src={branding.logoAssetPath} 
            alt={branding.logoAltText}
            className="w-8 h-8 object-contain flex-shrink-0"
          />
          <span className="hidden sm:inline truncate">{branding.siteName}</span>
          <span className="sm:hidden truncate">{branding.shortName}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to || (link.to !== '/' && currentPath.startsWith(link.to));
              return (
                <li key={link.to}>
                  <Link to={link.to}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className="font-medium"
                    >
                      {link.label}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border">
            <Link to="/subscribe">
              <Button variant="secondary" className="font-medium">
                Subscribe
              </Button>
            </Link>
            <AuthNavControl />
          </div>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="text-left mb-6">Navigation</SheetTitle>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = currentPath === link.to || (link.to !== '/' && currentPath.startsWith(link.to));
                return (
                  <li key={link.to}>
                    <Link to={link.to} onClick={() => setOpen(false)}>
                      <Button
                        variant={isActive ? 'default' : 'ghost'}
                        className="w-full justify-start font-medium"
                      >
                        {link.label}
                      </Button>
                    </Link>
                  </li>
                );
              })}
              <li className="mt-4 pt-4 border-t border-border">
                <Link to="/subscribe" onClick={() => setOpen(false)}>
                  <Button variant="secondary" className="w-full justify-start font-medium">
                    Subscribe
                  </Button>
                </Link>
              </li>
              <li>
                <AuthNavControl onAuthAction={() => setOpen(false)} />
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
