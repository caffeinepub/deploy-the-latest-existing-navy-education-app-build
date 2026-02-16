import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

interface AuthNavControlProps {
  onAuthAction?: () => void;
}

export default function AuthNavControl({ onAuthAction }: AuthNavControlProps) {
  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';
  const disabled = isLoggingIn || isInitializing;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
    onAuthAction?.();
  };

  return (
    <Button
      onClick={handleAuth}
      disabled={disabled}
      variant={isAuthenticated ? 'outline' : 'default'}
      className="font-medium"
    >
      {disabled ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {isInitializing ? 'Loading...' : 'Logging in...'}
        </>
      ) : isAuthenticated ? (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </>
      ) : (
        <>
          <LogIn className="mr-2 h-4 w-4" />
          Log in
        </>
      )}
    </Button>
  );
}
