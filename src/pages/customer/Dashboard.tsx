import { useState } from 'react';
import { Send, ArrowDownToLine, CreditCard, Smartphone, Receipt, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BankCard } from '@/components/bank/BankCard';
import { TransactionItem } from '@/components/bank/TransactionItem';
import { QuickAction } from '@/components/bank/QuickAction';
import { PageHeader } from '@/components/layout/PageHeader';
import { BottomNav } from '@/components/ui/BottomNav';
import { currentCustomer, mockTransactions } from '@/data/mockData';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const customerTransactions = mockTransactions.filter(t => t.customerId === currentCustomer.id);

  const quickActions = [
    { icon: Send, label: 'Send', onClick: () => navigate('/send-money'), variant: 'primary' as const },
    { icon: ArrowDownToLine, label: 'Receive', onClick: () => navigate('/receive-money') },
    { icon: CreditCard, label: 'Cards', onClick: () => navigate('/cards') },
    { icon: Smartphone, label: 'Top Up', onClick: () => navigate('/top-up') },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Section with Card */}
      <div className="bank-card-gradient px-4 pt-safe-top pb-8">
        <PageHeader 
          title={`Hello, ${currentCustomer.name.split(' ')[0]}`}
          subtitle="Welcome back"
          showNotification
          notificationCount={2}
          variant="dark"
        />
        
        {/* Bank Card */}
        <div className="mt-4">
          <BankCard
            name={currentCustomer.name}
            accountNumber={currentCustomer.accountNumber}
            balance={currentCustomer.balance}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-4">
        <div className="bg-card rounded-2xl p-4 card-shadow">
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action) => (
              <QuickAction
                key={action.label}
                icon={action.icon}
                label={action.label}
                onClick={action.onClick}
                variant={action.variant}
              />
            ))}
          </div>
        </div>
      </div>

      {/* More Actions */}
      <div className="px-4 mt-6">
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/pay-bill')}
            className="flex-1 flex items-center gap-3 p-4 bg-card rounded-xl card-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-primary" />
            </div>
            <span className="font-medium text-foreground">Pay Bills</span>
          </button>
          <button 
            onClick={() => navigate('/scan-qr')}
            className="flex-1 flex items-center gap-3 p-4 bg-card rounded-xl card-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-primary" />
            </div>
            <span className="font-medium text-foreground">Scan QR</span>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground font-display">Recent Transactions</h2>
          <button 
            onClick={() => navigate('/transactions')}
            className="text-sm text-primary font-medium"
          >
            See All
          </button>
        </div>
        
        <div className="space-y-3">
          {customerTransactions.slice(0, 5).map((transaction, index) => (
            <div 
              key={transaction.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TransactionItem 
                transaction={transaction}
                onClick={() => navigate(`/transaction/${transaction.id}`)}
              />
            </div>
          ))}
          
          {customerTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No transactions yet</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav variant="customer" />
    </div>
  );
}
