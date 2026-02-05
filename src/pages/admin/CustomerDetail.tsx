import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, CreditCard, Lock, Unlock, Snowflake, Send, History, Ban } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/bank/StatusBadge';
import { TransactionItem } from '@/components/bank/TransactionItem';
import { mockCustomers, mockTransactions } from '@/data/mockData';
import { Customer, AccountStatus } from '@/types/bank';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function CustomerDetail() {
  const navigate = useNavigate();
  const { customerId } = useParams();
  
  const initialCustomer = mockCustomers.find(c => c.id === customerId);
  const [customer, setCustomer] = useState<Customer | undefined>(initialCustomer);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<'block' | 'freeze' | null>(null);

  if (!customer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Customer not found</p>
      </div>
    );
  }

  const customerTransactions = mockTransactions.filter(t => t.customerId === customer.id);

  const handleStatusChange = (newStatus: AccountStatus) => {
    setCustomer(prev => prev ? {
      ...prev,
      status: newStatus,
      canSendMoney: newStatus === 'active',
      canLogin: newStatus !== 'blocked'
    } : prev);
    
    const statusMessages: Record<AccountStatus, string> = {
      active: 'Customer account activated',
      blocked: 'Customer blocked - Cannot login or send money',
      frozen: 'Account frozen - Temporary restriction applied',
    };
    
    toast.success(statusMessages[newStatus]);
    setShowBlockDialog(false);
  };

  const handleToggle = (field: 'canSendMoney' | 'canLogin') => {
    setCustomer(prev => prev ? { ...prev, [field]: !prev[field] } : prev);
    toast.success(`${field === 'canSendMoney' ? 'Transfer' : 'Login'} permission updated`);
  };

  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(customer.balance);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-secondary px-4 pt-4 pb-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-white/10 rounded-full text-secondary-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-secondary-foreground">
            <h1 className="text-lg font-semibold font-display">Customer Details</h1>
            <p className="text-sm text-secondary-foreground/70">Manage account</p>
          </div>
        </div>
      </div>

      {/* Customer Card */}
      <div className="px-4 -mt-12">
        <div className="bg-card rounded-2xl p-6 card-shadow">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bank-card-gradient flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold">{customer.name}</h2>
                <StatusBadge status={customer.status} />
              </div>
              <p className="text-muted-foreground text-sm">{customer.accountNumber}</p>
            </div>
          </div>

          {/* Balance */}
          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <p className="text-sm text-muted-foreground">Account Balance</p>
            <p className="text-3xl font-bold balance-text">{formattedBalance}</p>
          </div>

          {/* Customer Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{customer.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Phone className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{customer.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Card Status</p>
                <StatusBadge status={customer.cardStatus as any} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions */}
      <div className="px-4 mt-6">
        <h3 className="text-lg font-semibold mb-3 font-display">Permissions</h3>
        <div className="bg-card rounded-2xl card-shadow divide-y divide-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Send className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Can Send Money</p>
                <p className="text-sm text-muted-foreground">Allow outgoing transfers</p>
              </div>
            </div>
            <Switch 
              checked={customer.canSendMoney} 
              onCheckedChange={() => handleToggle('canSendMoney')}
            />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Lock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Can Login</p>
                <p className="text-sm text-muted-foreground">Allow account access</p>
              </div>
            </div>
            <Switch 
              checked={customer.canLogin} 
              onCheckedChange={() => handleToggle('canLogin')}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 mt-6">
        <h3 className="text-lg font-semibold mb-3 font-display">Account Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {customer.status === 'active' ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setPendingAction('freeze');
                  setShowBlockDialog(true);
                }}
                className="h-auto py-4 flex flex-col gap-2"
              >
                <Snowflake className="w-5 h-5 text-blue-500" />
                <span>Freeze Account</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPendingAction('block');
                  setShowBlockDialog(true);
                }}
                className="h-auto py-4 flex flex-col gap-2 border-destructive/20 text-destructive hover:bg-destructive/10"
              >
                <Ban className="w-5 h-5" />
                <span>Block Customer</span>
              </Button>
            </>
          ) : (
            <Button
              onClick={() => handleStatusChange('active')}
              className="col-span-2 h-auto py-4 flex flex-col gap-2 btn-gradient"
            >
              <Unlock className="w-5 h-5" />
              <span>Unblock Account</span>
            </Button>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <History className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold font-display">Recent Transactions</h3>
        </div>
        <div className="space-y-3">
          {customerTransactions.length > 0 ? (
            customerTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No transactions yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingAction === 'block' ? 'Block Customer' : 'Freeze Account'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingAction === 'block' 
                ? 'This will prevent the customer from logging in and making any transactions. Are you sure?'
                : 'This will temporarily restrict the account. The customer can still login but cannot make transfers. Are you sure?'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleStatusChange(pendingAction === 'block' ? 'blocked' : 'frozen')}
              className={pendingAction === 'block' ? 'bg-destructive hover:bg-destructive/90' : ''}
            >
              {pendingAction === 'block' ? 'Block' : 'Freeze'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
