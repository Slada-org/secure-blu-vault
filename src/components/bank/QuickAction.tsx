import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'primary';
}

export function QuickAction({ icon: Icon, label, onClick, variant = 'default' }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200',
        variant === 'primary' 
          ? 'bg-primary text-primary-foreground shadow-button hover:bg-primary/90' 
          : 'bg-card text-foreground card-shadow hover:shadow-card-hover'
      )}
    >
      <div className={cn(
        'w-12 h-12 rounded-full flex items-center justify-center',
        variant === 'primary' 
          ? 'bg-white/20' 
          : 'bg-muted'
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
