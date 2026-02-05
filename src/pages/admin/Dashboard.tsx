import { Users, CreditCard, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { BottomNav } from '@/components/ui/BottomNav';
import { mockCustomers, mockCardRequests, mockTransactions } from '@/data/mockData';
import { StatusBadge } from '@/components/bank/StatusBadge';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  const activeCustomers = mockCustomers.filter(c => c.status === 'active').length;
  const blockedCustomers = mockCustomers.filter(c => c.status === 'blocked').length;
  const pendingRequests = mockCardRequests.filter(r => r.status === 'pending').length;
  const totalBalance = mockCustomers.reduce((sum, c) => sum + c.balance, 0);

  const stats = [
    { icon: Users, label: 'Active Customers', value: activeCustomers, color: 'text-success' },
    { icon: AlertTriangle, label: 'Blocked', value: blockedCustomers, color: 'text-destructive' },
    { icon: CreditCard, label: 'Pending Cards', value: pendingRequests, color: 'text-warning' },
    { icon: TrendingUp, label: 'Total Assets', value: `$${(totalBalance / 1000).toFixed(1)}K`, color: 'text-primary' },
  ];

  const recentTransactions = mockTransactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-secondary px-4 pt-4 pb-8">
        <PageHeader 
          title="Admin Dashboard"
          subtitle="NexusBank Management"
          variant="dark"
          showNotification
          notificationCount={pendingRequests}
        />
      </div>

      {/* Stats Grid */}
      <div className="px-4 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-4 card-shadow">
              <div className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold font-display">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold mb-3 font-display">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/admin/customers')}
            className="flex items-center gap-3 p-4 bg-card rounded-xl card-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <span className="font-medium">Manage Customers</span>
          </button>
          <button
            onClick={() => navigate('/admin/requests')}
            className="flex items-center gap-3 p-4 bg-card rounded-xl card-shadow relative"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <span className="font-medium">Card Requests</span>
            {pendingRequests > 0 && (
              <span className="absolute top-2 right-2 w-5 h-5 bg-warning text-warning-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {pendingRequests}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Customers Overview */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold font-display">Customers</h2>
          <button 
            onClick={() => navigate('/admin/customers')}
            className="text-sm text-primary font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {mockCustomers.slice(0, 4).map((customer) => (
            <button
              key={customer.id}
              onClick={() => navigate(`/admin/customers/${customer.id}`)}
              className="w-full flex items-center justify-between p-4 bg-card rounded-xl card-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    •••• {customer.accountNumber.slice(-4)}
                  </p>
                </div>
              </div>
              <StatusBadge status={customer.status} />
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold font-display">Recent Activity</h2>
          <button 
            onClick={() => navigate('/admin/activity')}
            className="text-sm text-primary font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => {
            const customer = mockCustomers.find(c => c.id === transaction.customerId);
            const isCredit = transaction.type === 'credit';
            
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-card rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCredit ? 'bg-success/10' : 'bg-muted'
                  }`}>
                    {isCredit ? (
                      <ArrowDownLeft className="w-5 h-5 text-success" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{customer?.name}</p>
                    <p className="text-sm text-muted-foreground">{transaction.description}</p>
                  </div>
                </div>
                <p className={`font-semibold ${isCredit ? 'text-success' : 'text-foreground'}`}>
                  {isCredit ? '+' : '-'}${transaction.amount.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav variant="admin" />
    </div>
  );
}
