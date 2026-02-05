import { useState } from 'react';
import { Search, Filter, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { TransactionItem } from '@/components/bank/TransactionItem';
import { PageHeader } from '@/components/layout/PageHeader';
import { BottomNav } from '@/components/ui/BottomNav';
import { mockTransactions, currentCustomer } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'credit' | 'debit';

export default function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const navigate = useNavigate();
  
  const customerTransactions = mockTransactions.filter(t => t.customerId === currentCustomer.id);
  
  const filteredTransactions = customerTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.recipientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.senderName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' || transaction.type === filter;
    
    return matchesSearch && matchesFilter;
  });

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = new Date(transaction.createdAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, typeof filteredTransactions>);

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader 
        title="Transactions"
        subtitle="Your transaction history"
      />

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transactions..."
            className="input-bank pl-12"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="px-4 mb-6">
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'credit', label: 'Received', icon: ArrowDownLeft },
            { key: 'debit', label: 'Sent', icon: ArrowUpRight },
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as FilterType)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all',
                filter === filterOption.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {filterOption.icon && <filterOption.icon className="w-4 h-4" />}
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="px-4">
        {Object.entries(groupedTransactions).length > 0 ? (
          Object.entries(groupedTransactions).map(([date, transactions]) => (
            <div key={date} className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">{date}</h3>
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onClick={() => navigate(`/transaction/${transaction.id}`)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        )}
      </div>

      <BottomNav variant="customer" />
    </div>
  );
}
