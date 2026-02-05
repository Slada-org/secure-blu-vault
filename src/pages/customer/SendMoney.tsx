import { useState } from 'react';
import { ArrowLeft, User, AtSign, Send, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { currentCustomer, mockCustomers } from '@/data/mockData';
import { toast } from 'sonner';

export default function SendMoney() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'recipient' | 'amount' | 'confirm' | 'success'>('recipient');
  const [recipient, setRecipient] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<typeof mockCustomers[0] | null>(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Recent recipients (other customers)
  const recentRecipients = mockCustomers.filter(c => c.id !== currentCustomer.id).slice(0, 4);

  const handleRecipientSelect = (customer: typeof mockCustomers[0]) => {
    setSelectedRecipient(customer);
    setStep('amount');
  };

  const handleAmountConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (parseFloat(amount) > currentCustomer.balance) {
      toast.error('Insufficient balance');
      return;
    }
    setStep('confirm');
  };

  const handleSend = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStep('success');
    setIsLoading(false);
  };

  const formattedAmount = amount ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(parseFloat(amount)) : '$0.00';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button 
          onClick={() => {
            if (step === 'recipient') navigate(-1);
            else if (step === 'amount') setStep('recipient');
            else if (step === 'confirm') setStep('amount');
            else navigate('/dashboard');
          }}
          className="p-2 -ml-2 hover:bg-muted rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold font-display">
          {step === 'success' ? 'Transfer Complete' : 'Send Money'}
        </h1>
      </div>

      {/* Recipient Step */}
      {step === 'recipient' && (
        <div className="p-4 space-y-6">
          {/* Search Input */}
          <div className="relative">
            <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Account number or email"
              className="input-bank pl-12"
            />
          </div>

          {/* Recent Recipients */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent</h3>
            <div className="grid grid-cols-4 gap-4">
              {recentRecipients.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => handleRecipientSelect(customer)}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground text-center line-clamp-1">
                    {customer.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* All Contacts */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">All Contacts</h3>
            <div className="space-y-3">
              {recentRecipients.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => handleRecipientSelect(customer)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">•••• {customer.accountNumber.slice(-4)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Amount Step */}
      {step === 'amount' && selectedRecipient && (
        <div className="p-4 space-y-6">
          {/* Recipient Info */}
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {selectedRecipient.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedRecipient.name}</p>
              <p className="text-sm text-muted-foreground">
                •••• {selectedRecipient.accountNumber.slice(-4)}
              </p>
            </div>
          </div>

          {/* Amount Input */}
          <div className="text-center py-8">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="text-5xl font-bold text-center bg-transparent outline-none w-full balance-text"
              autoFocus
            />
            <p className="text-muted-foreground mt-2">
              Available: ${currentCustomer.balance.toLocaleString()}
            </p>
          </div>

          {/* Quick Amounts */}
          <div className="flex gap-3 justify-center">
            {['50', '100', '250', '500'].map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount)}
                className="px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-muted/80"
              >
                ${quickAmount}
              </button>
            ))}
          </div>

          {/* Note */}
          <div>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note (optional)"
              className="input-bank"
            />
          </div>

          <Button
            onClick={handleAmountConfirm}
            className="w-full h-12 btn-gradient text-base font-semibold"
          >
            Continue
          </Button>
        </div>
      )}

      {/* Confirm Step */}
      {step === 'confirm' && selectedRecipient && (
        <div className="p-4 space-y-6">
          <div className="bg-card rounded-2xl p-6 card-shadow space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">You're sending</p>
              <p className="text-4xl font-bold balance-text">{formattedAmount}</p>
            </div>

            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">To</span>
                <span className="font-medium">{selectedRecipient.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account</span>
                <span className="font-medium">•••• {selectedRecipient.accountNumber.slice(-4)}</span>
              </div>
              {note && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Note</span>
                  <span className="font-medium">{note}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-medium text-success">Free</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSend}
            disabled={isLoading}
            className="w-full h-12 btn-gradient text-base font-semibold"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                Confirm & Send
                <Send className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* Success Step */}
      {step === 'success' && selectedRecipient && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6 animate-scale-in">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-2 font-display">Transfer Successful!</h2>
          <p className="text-muted-foreground mb-2">
            You sent {formattedAmount} to {selectedRecipient.name}
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Reference: TRF-{Date.now().toString().slice(-8)}
          </p>
          <Button
            onClick={() => navigate('/dashboard')}
            className="w-full h-12 btn-gradient text-base font-semibold"
          >
            Done
          </Button>
        </div>
      )}
    </div>
  );
}
