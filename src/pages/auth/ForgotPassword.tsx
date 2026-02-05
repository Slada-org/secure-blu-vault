import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ForgotPasswordProps {
  variant: 'customer' | 'admin';
}

export default function ForgotPassword({ variant }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSent(true);
    toast.success('Reset link sent to your email');
    setIsLoading(false);
  };

  const loginPath = variant === 'admin' ? '/admin/login' : '/login';
  const bgClass = variant === 'admin' ? 'bg-secondary' : 'bg-background';
  const textClass = variant === 'admin' ? 'text-secondary-foreground' : 'text-foreground';
  const inputClass = variant === 'admin' 
    ? 'text-secondary-foreground bg-secondary-foreground/10 border-secondary-foreground/20 placeholder:text-muted-foreground'
    : '';

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col`}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          {/* Back Button */}
          <Link 
            to={loginPath}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>

          {/* Header */}
          <div className="space-y-2">
            <h1 className={`text-2xl font-bold ${textClass} font-display`}>
              Reset Password
            </h1>
            <p className="text-muted-foreground">
              {isSent 
                ? "Check your email for a reset link"
                : "Enter your email and we'll send you a reset link"
              }
            </p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className={`input-bank pl-12 ${inputClass}`}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 btn-gradient text-base font-semibold"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Send Reset Link
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="p-4 bg-success/10 rounded-xl text-center">
                <p className="text-success font-medium">
                  Check your inbox for the reset link
                </p>
              </div>
              <Button
                onClick={() => navigate(loginPath)}
                variant="outline"
                className="w-full h-12"
              >
                Return to Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
