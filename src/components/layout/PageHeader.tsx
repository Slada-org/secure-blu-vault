import { Bell, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showNotification?: boolean;
  showSearch?: boolean;
  notificationCount?: number;
  variant?: 'light' | 'dark';
  rightElement?: React.ReactNode;
}

export function PageHeader({ 
  title, 
  subtitle, 
  showNotification = false,
  showSearch = false,
  notificationCount = 0,
  variant = 'light',
  rightElement 
}: PageHeaderProps) {
  const isDark = variant === 'dark';
  
  return (
    <div className={cn(
      'flex items-center justify-between px-4 py-4',
      isDark && 'text-white'
    )}>
      <div>
        <h1 className={cn(
          'text-xl font-bold font-display',
          isDark ? 'text-white' : 'text-foreground'
        )}>
          {title}
        </h1>
        {subtitle && (
          <p className={cn(
            'text-sm mt-0.5',
            isDark ? 'text-white/70' : 'text-muted-foreground'
          )}>
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {showSearch && (
          <button className={cn(
            'p-2 rounded-full transition-colors',
            isDark 
              ? 'hover:bg-white/10' 
              : 'hover:bg-muted'
          )}>
            <Search className="w-5 h-5" />
          </button>
        )}
        
        {showNotification && (
          <Link 
            to="/notifications"
            className={cn(
              'relative p-2 rounded-full transition-colors',
              isDark 
                ? 'hover:bg-white/10' 
                : 'hover:bg-muted'
            )}
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center pulse-dot">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </Link>
        )}
        
        {rightElement}
      </div>
    </div>
  );
}
