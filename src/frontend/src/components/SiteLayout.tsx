import { Outlet } from '@tanstack/react-router';
import PrimaryNav from './PrimaryNav';
import { Heart } from 'lucide-react';
import { branding } from '@/config/branding';

export default function SiteLayout() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'navy-edu';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PrimaryNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} {branding.siteName}. Educational purposes only.</p>
            <p className="flex items-center gap-1.5">
              Built with <Heart className="text-destructive w-4 h-4 fill-current" aria-label="love" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
