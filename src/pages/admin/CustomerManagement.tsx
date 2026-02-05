import { useState } from 'react';
import { Search, Filter, MoreVertical, Lock, Unlock, Snowflake, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { BottomNav } from '@/components/ui/BottomNav';
import { StatusBadge } from '@/components/bank/StatusBadge';
import { mockCustomers } from '@/data/mockData';
import { Customer, AccountStatus } from '@/types/bank';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type FilterType = 'all' | 'active' | 'blocked' | 'frozen';

export default function CustomerManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.accountNumber.includes(searchQuery);
    
    const matchesFilter = 
      filter === 'all' || customer.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (customerId: string, newStatus: AccountStatus) => {
    setCustomers(prev => 
      prev.map(c => 
        c.id === customerId 
          ? { 
              ...c, 
              status: newStatus,
              canSendMoney: newStatus === 'active',
              canLogin: newStatus !== 'blocked'
            } 
          : c
      )
    );
    
    const statusMessages: Record<AccountStatus, string> = {
      active: 'Customer unblocked successfully',
      blocked: 'Customer blocked successfully',
      frozen: 'Account frozen successfully',
    };
    
    toast.success(statusMessages[newStatus]);
  };

  const handleToggleSendMoney = (customerId: string) => {
    setCustomers(prev => 
      prev.map(c => 
        c.id === customerId 
          ? { ...c, canSendMoney: !c.canSendMoney } 
          : c
      )
    );
    toast.success('Send money permission updated');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader 
        title="Customers"
        subtitle={`${customers.length} total customers`}
      />

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or account..."
            className="input-bank pl-12"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="px-4 mb-6 overflow-x-auto">
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'active', label: 'Active' },
            { key: 'blocked', label: 'Blocked' },
            { key: 'frozen', label: 'Frozen' },
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as FilterType)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                filter === filterOption.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Customers List */}
      <div className="px-4 space-y-3">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center justify-between p-4 bg-card rounded-xl card-shadow"
          >
            <button
              onClick={() => navigate(`/admin/customers/${customer.id}`)}
              className="flex items-center gap-3 flex-1 text-left"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-semibold text-primary">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium">{customer.name}</p>
                <p className="text-sm text-muted-foreground">
                  {customer.accountNumber}
                </p>
              </div>
            </button>
            
            <div className="flex items-center gap-3">
              <StatusBadge status={customer.status} />
              
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 hover:bg-muted rounded-full">
                  <MoreVertical className="w-5 h-5 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/admin/customers/${customer.id}`)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  
                  {customer.status === 'active' ? (
                    <>
                      <DropdownMenuItem onClick={() => handleStatusChange(customer.id, 'blocked')}>
                        <Lock className="w-4 h-4 mr-2" />
                        Block Customer
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(customer.id, 'frozen')}>
                        <Snowflake className="w-4 h-4 mr-2" />
                        Freeze Account
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem onClick={() => handleStatusChange(customer.id, 'active')}>
                      <Unlock className="w-4 h-4 mr-2" />
                      Unblock Customer
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem onClick={() => handleToggleSendMoney(customer.id)}>
                    {customer.canSendMoney ? (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Disable Transfers
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4 mr-2" />
                        Enable Transfers
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No customers found</p>
          </div>
        )}
      </div>

      <BottomNav variant="admin" />
    </div>
  );
}
