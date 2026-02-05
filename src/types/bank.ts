// Bank App Types

export type UserRole = 'admin' | 'customer';

export type AccountStatus = 'active' | 'blocked' | 'frozen';

export type CardStatus = 'none' | 'pending' | 'approved' | 'rejected';

export type TransactionType = 'credit' | 'debit';

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

export interface Customer {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  accountNumber: string;
  balance: number;
  status: AccountStatus;
  cardStatus: CardStatus;
  canSendMoney: boolean;
  canLogin: boolean;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  customerId: string;
  type: TransactionType;
  amount: number;
  description: string;
  recipientName?: string;
  senderName?: string;
  reference: string;
  createdAt: Date;
}

export interface CardRequest {
  id: string;
  customerId: string;
  customerName: string;
  cardType: 'debit' | 'credit';
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: Date;
  processedAt?: Date;
}

export interface AuditLog {
  id: string;
  adminId: string;
  action: string;
  targetCustomerId?: string;
  targetCustomerName?: string;
  details: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}
