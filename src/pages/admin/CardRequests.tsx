import { useState } from 'react';
import { CreditCard, Check, X, Clock } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { BottomNav } from '@/components/ui/BottomNav';
import { StatusBadge } from '@/components/bank/StatusBadge';
import { mockCardRequests } from '@/data/mockData';
import { CardRequest } from '@/types/bank';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
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

export default function CardRequests() {
  const [requests, setRequests] = useState<CardRequest[]>(mockCardRequests);
  const [selectedRequest, setSelectedRequest] = useState<CardRequest | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

  const handleAction = () => {
    if (!selectedRequest || !actionType) return;
    
    setRequests(prev => 
      prev.map(r => 
        r.id === selectedRequest.id 
          ? { ...r, status: actionType === 'approve' ? 'approved' : 'rejected', processedAt: new Date() }
          : r
      )
    );
    
    toast.success(
      actionType === 'approve' 
        ? `Card request approved for ${selectedRequest.customerName}`
        : `Card request rejected for ${selectedRequest.customerName}`
    );
    
    setSelectedRequest(null);
    setActionType(null);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader 
        title="Card Requests"
        subtitle={`${pendingRequests.length} pending requests`}
      />

      {/* Pending Requests */}
      <div className="px-4">
        {pendingRequests.length > 0 ? (
          <>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Pending Approval</h3>
            <div className="space-y-3 mb-8">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-card rounded-2xl p-4 card-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-warning" />
                      </div>
                      <div>
                        <p className="font-semibold">{request.customerName}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {request.cardType} Card Request
                        </p>
                      </div>
                    </div>
                    <StatusBadge status="pending" />
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="w-4 h-4" />
                    <span>Requested {formatDate(request.requestedAt)}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setSelectedRequest(request);
                        setActionType('approve');
                      }}
                      className="flex-1 btn-gradient"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedRequest(request);
                        setActionType('reject');
                      }}
                      className="flex-1 border-destructive/20 text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-success" />
            </div>
            <p className="font-medium text-foreground">All caught up!</p>
            <p className="text-muted-foreground text-sm">No pending card requests</p>
          </div>
        )}

        {/* Processed Requests */}
        {processedRequests.length > 0 && (
          <>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">History</h3>
            <div className="space-y-3">
              {processedRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-card rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      request.status === 'approved' ? 'bg-success/10' : 'bg-destructive/10'
                    }`}>
                      {request.status === 'approved' ? (
                        <Check className="w-5 h-5 text-success" />
                      ) : (
                        <X className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{request.customerName}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {request.cardType} Card
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={request.status as 'approved' | 'rejected'} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!selectedRequest && !!actionType} onOpenChange={() => {
        setSelectedRequest(null);
        setActionType(null);
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === 'approve' ? 'Approve Card Request' : 'Reject Card Request'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === 'approve'
                ? `Are you sure you want to approve the ${selectedRequest?.cardType} card request for ${selectedRequest?.customerName}?`
                : `Are you sure you want to reject the ${selectedRequest?.cardType} card request for ${selectedRequest?.customerName}?`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAction}
              className={actionType === 'reject' ? 'bg-destructive hover:bg-destructive/90' : 'btn-gradient'}
            >
              {actionType === 'approve' ? 'Approve' : 'Reject'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <BottomNav variant="admin" />
    </div>
  );
}
