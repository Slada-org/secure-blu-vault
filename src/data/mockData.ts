import { Customer, Transaction, CardRequest, AuditLog, Notification } from '@/types/bank';

// Generate random account number
const generateAccountNumber = () => {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
};

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: '1',
    userId: 'user-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    accountNumber: '2847391056',
    balance: 12450.75,
    status: 'active',
    cardStatus: 'approved',
    canSendMoney: true,
    canLogin: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    userId: 'user-2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    accountNumber: '3958472061',
    balance: 8234.50,
    status: 'active',
    cardStatus: 'pending',
    canSendMoney: true,
    canLogin: true,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    userId: 'user-3',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+1 (555) 345-6789',
    accountNumber: '1726384950',
    balance: 45780.00,
    status: 'frozen',
    cardStatus: 'approved',
    canSendMoney: false,
    canLogin: true,
    createdAt: new Date('2023-11-08'),
  },
  {
    id: '4',
    userId: 'user-4',
    name: 'James Rodriguez',
    email: 'james.rodriguez@email.com',
    phone: '+1 (555) 456-7890',
    accountNumber: '4839201756',
    balance: 2150.25,
    status: 'blocked',
    cardStatus: 'none',
    canSendMoney: false,
    canLogin: false,
    createdAt: new Date('2024-03-01'),
  },
  {
    id: '5',
    userId: 'user-5',
    name: 'Olivia Brown',
    email: 'olivia.brown@email.com',
    phone: '+1 (555) 567-8901',
    accountNumber: '6729384015',
    balance: 18965.80,
    status: 'active',
    cardStatus: 'none',
    canSendMoney: true,
    canLogin: true,
    createdAt: new Date('2024-01-28'),
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    customerId: '1',
    type: 'credit',
    amount: 2500.00,
    description: 'Salary Deposit',
    senderName: 'ABC Corporation',
    reference: 'SAL-2024-001',
    createdAt: new Date('2024-12-15T10:30:00'),
  },
  {
    id: 't2',
    customerId: '1',
    type: 'debit',
    amount: 85.50,
    description: 'Grocery Store',
    recipientName: 'Whole Foods Market',
    reference: 'POS-2024-4521',
    createdAt: new Date('2024-12-14T14:22:00'),
  },
  {
    id: 't3',
    customerId: '1',
    type: 'debit',
    amount: 250.00,
    description: 'Transfer to Michael',
    recipientName: 'Michael Chen',
    reference: 'TRF-2024-0892',
    createdAt: new Date('2024-12-13T09:15:00'),
  },
  {
    id: 't4',
    customerId: '1',
    type: 'credit',
    amount: 150.00,
    description: 'Refund',
    senderName: 'Amazon',
    reference: 'REF-2024-3847',
    createdAt: new Date('2024-12-12T16:45:00'),
  },
  {
    id: 't5',
    customerId: '1',
    type: 'debit',
    amount: 45.99,
    description: 'Streaming Subscription',
    recipientName: 'Netflix',
    reference: 'SUB-2024-1234',
    createdAt: new Date('2024-12-11T00:00:00'),
  },
  {
    id: 't6',
    customerId: '2',
    type: 'credit',
    amount: 1800.00,
    description: 'Freelance Payment',
    senderName: 'Design Co.',
    reference: 'FRL-2024-445',
    createdAt: new Date('2024-12-15T11:00:00'),
  },
  {
    id: 't7',
    customerId: '2',
    type: 'debit',
    amount: 120.00,
    description: 'Electric Bill',
    recipientName: 'City Power',
    reference: 'BILL-2024-789',
    createdAt: new Date('2024-12-10T08:30:00'),
  },
];

// Mock Card Requests
export const mockCardRequests: CardRequest[] = [
  {
    id: 'cr1',
    customerId: '2',
    customerName: 'Michael Chen',
    cardType: 'debit',
    status: 'pending',
    requestedAt: new Date('2024-12-14T10:00:00'),
  },
  {
    id: 'cr2',
    customerId: '5',
    customerName: 'Olivia Brown',
    cardType: 'credit',
    status: 'pending',
    requestedAt: new Date('2024-12-13T15:30:00'),
  },
];

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: 'al1',
    adminId: 'admin-1',
    action: 'BLOCK_CUSTOMER',
    targetCustomerId: '4',
    targetCustomerName: 'James Rodriguez',
    details: 'Account blocked due to suspicious activity',
    createdAt: new Date('2024-12-15T09:00:00'),
  },
  {
    id: 'al2',
    adminId: 'admin-1',
    action: 'FREEZE_ACCOUNT',
    targetCustomerId: '3',
    targetCustomerName: 'Emma Wilson',
    details: 'Account frozen pending verification',
    createdAt: new Date('2024-12-14T14:30:00'),
  },
  {
    id: 'al3',
    adminId: 'admin-1',
    action: 'APPROVE_CARD',
    targetCustomerId: '1',
    targetCustomerName: 'Sarah Johnson',
    details: 'Debit card request approved',
    createdAt: new Date('2024-12-13T11:15:00'),
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: 'user-1',
    title: 'Payment Received',
    message: 'You received $2,500.00 from ABC Corporation',
    read: false,
    createdAt: new Date('2024-12-15T10:30:00'),
  },
  {
    id: 'n2',
    userId: 'user-1',
    title: 'Card Approved',
    message: 'Your debit card request has been approved!',
    read: true,
    createdAt: new Date('2024-12-13T11:15:00'),
  },
];

// Current logged-in customer (for demo)
export const currentCustomer: Customer = mockCustomers[0];
