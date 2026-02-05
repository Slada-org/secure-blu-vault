import { useNavigate } from 'react-router-dom';
import { Wallet, Shield, ArrowRight, CreditCard, Send, History, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Index() {
  const navigate = useNavigate();

  const features = [
    { icon: CreditCard, title: 'Virtual Cards', desc: 'Request debit or credit cards instantly' },
    { icon: Send, title: 'Fast Transfers', desc: 'Send money to anyone in seconds' },
    { icon: History, title: 'Track Everything', desc: 'Full transaction history at your fingertips' },
    { icon: Lock, title: 'Bank-Level Security', desc: 'Your money is protected 24/7' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bank-card-gradient overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/20" />
          <div className="absolute -left-20 bottom-0 w-60 h-60 rounded-full bg-white/10" />
        </div>
        
        <div className="relative px-6 pt-12 pb-20 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold font-display">NexusBank</span>
          </div>

          {/* Hero Content */}
          <h1 className="text-4xl font-bold mb-4 font-display leading-tight">
            Banking Made
            <br />
            <span className="text-white/80">Simple & Secure</span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-xs">
            Experience the future of mobile banking with NexusBank. Fast, secure, and always available.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => navigate('/login')}
              className="w-full h-14 bg-white text-primary hover:bg-white/90 text-lg font-semibold"
            >
              Customer Login
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() => navigate('/admin/login')}
              variant="outline"
              className="w-full h-14 border-white/30 text-white hover:bg-white/10 text-lg"
            >
              <Shield className="w-5 h-5 mr-2" />
              Admin Portal
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-12 -mt-6 relative z-10">
        <div className="bg-card rounded-3xl p-6 card-shadow">
          <h2 className="text-lg font-semibold mb-6 font-display">Why NexusBank?</h2>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature) => (
              <div key={feature.title} className="p-4 bg-muted/50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 pb-12">
        <div className="bg-secondary rounded-3xl p-6 text-secondary-foreground">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold font-display">50K+</p>
              <p className="text-xs text-secondary-foreground/70">Active Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-display">$2M+</p>
              <p className="text-xs text-secondary-foreground/70">Transferred</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-display">99.9%</p>
              <p className="text-xs text-secondary-foreground/70">Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 text-center">
        <p className="text-xs text-muted-foreground">
          © 2024 NexusBank. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Portfolio Project — Not a real banking service
        </p>
      </div>
    </div>
  );
}
