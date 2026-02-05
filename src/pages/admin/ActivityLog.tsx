import { Shield, Lock, Unlock, Snowflake, CreditCard, Check, X } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { BottomNav } from '@/components/ui/BottomNav';
import { mockAuditLogs } from '@/data/mockData';

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  BLOCK_CUSTOMER: Lock,
  UNBLOCK_CUSTOMER: Unlock,
  FREEZE_ACCOUNT: Snowflake,
  APPROVE_CARD: Check,
  REJECT_CARD: X,
};

const actionColors: Record<string, string> = {
  BLOCK_CUSTOMER: 'bg-destructive/10 text-destructive',
  UNBLOCK_CUSTOMER: 'bg-success/10 text-success',
  FREEZE_ACCOUNT: 'bg-blue-500/10 text-blue-500',
  APPROVE_CARD: 'bg-success/10 text-success',
  REJECT_CARD: 'bg-destructive/10 text-destructive',
};

const actionLabels: Record<string, string> = {
  BLOCK_CUSTOMER: 'Blocked Customer',
  UNBLOCK_CUSTOMER: 'Unblocked Customer',
  FREEZE_ACCOUNT: 'Froze Account',
  APPROVE_CARD: 'Approved Card',
  REJECT_CARD: 'Rejected Card',
};

export default function ActivityLog() {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Group logs by date
  const groupedLogs = mockAuditLogs.reduce((groups, log) => {
    const date = new Date(log.createdAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(log);
    return groups;
  }, {} as Record<string, typeof mockAuditLogs>);

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader 
        title="Activity Log"
        subtitle="Admin actions and audit trail"
      />

      <div className="px-4">
        {Object.entries(groupedLogs).length > 0 ? (
          Object.entries(groupedLogs).map(([date, logs]) => (
            <div key={date} className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">{date}</h3>
              <div className="space-y-3">
                {logs.map((log) => {
                  const Icon = actionIcons[log.action] || Shield;
                  const colorClass = actionColors[log.action] || 'bg-muted text-muted-foreground';
                  const label = actionLabels[log.action] || log.action;

                  return (
                    <div
                      key={log.id}
                      className="p-4 bg-card rounded-xl card-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{label}</p>
                          {log.targetCustomerName && (
                            <p className="text-sm text-muted-foreground">
                              Target: {log.targetCustomerName}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground mt-1">
                            {log.details}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatDate(log.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Shield className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No activity recorded yet</p>
          </div>
        )}
      </div>

      <BottomNav variant="admin" />
    </div>
  );
}
