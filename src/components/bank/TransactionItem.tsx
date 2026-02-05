import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Transaction } from '@/types/bank';
import { cn } from '@/lib/utils';

interface TransactionItemProps {
  transaction: Transaction;
  onClick?: () => void;
}

export function TransactionItem({ transaction, onClick }: TransactionItemProps) {
  const isCredit = transaction.type === 'credit';
  
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(transaction.amount);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(transaction.createdAt);

  const displayName = isCredit ? transaction.senderName : transaction.recipientName;

  return (
    <button
      onClick={onClick}
      className="transaction-item w-full text-left"
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center',
          isCredit ? 'bg-success/10' : 'bg-muted'
        )}>
          {isCredit ? (
            <ArrowDownLeft className="w-5 h-5 text-success" />
          ) : (
            <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate">{transaction.description}</p>
          <p className="text-sm text-muted-foreground truncate">{displayName}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={cn(
          'font-semibold',
          isCredit ? 'text-success' : 'text-foreground'
        )}>
          {isCredit ? '+' : '-'}{formattedAmount}
        </p>
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
      </div>
    </button>
  );
}
