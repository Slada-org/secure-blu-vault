import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Landing
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth Pages
import CustomerLogin from "./pages/auth/CustomerLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Customer Pages
import CustomerDashboard from "./pages/customer/Dashboard";
import TransactionHistory from "./pages/customer/TransactionHistory";
import SendMoney from "./pages/customer/SendMoney";
import CardsPage from "./pages/customer/Cards";
import ProfilePage from "./pages/customer/Profile";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import CustomerManagement from "./pages/admin/CustomerManagement";
import CustomerDetail from "./pages/admin/CustomerDetail";
import CardRequests from "./pages/admin/CardRequests";
import ActivityLog from "./pages/admin/ActivityLog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Index />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword variant="customer" />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword variant="admin" />} />
          
          {/* Customer Routes */}
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/send-money" element={<SendMoney />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<CustomerManagement />} />
          <Route path="/admin/customers/:customerId" element={<CustomerDetail />} />
          <Route path="/admin/requests" element={<CardRequests />} />
          <Route path="/admin/activity" element={<ActivityLog />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
