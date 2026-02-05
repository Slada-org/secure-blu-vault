import { cn } from '@/lib/utils';

type Status = 'active' | 'blocked' | 'frozen' | 'pending' | 'approved' | 'rejected';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  active: { label: 'Active', className: 'status-active' },
  blocked: { label: 'Blocked', className: 'status-blocked' },
  frozen: { label: 'Frozen', className: 'bg-blue-500/10 text-blue-600' },
  pending: { label: 'Pending', className: 'status-pending' },
  approved: { label: 'Approved', className: 'status-active' },
  rejected: { label: 'Rejected', className: 'status-blocked' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn('status-badge', config.className, className)}>
      {config.label}
    </span>
  );
}
