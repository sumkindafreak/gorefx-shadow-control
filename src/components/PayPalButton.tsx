
import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface PayPalButtonProps {
  planId: string;
}

declare global {
  interface Window {
    paypal: any;
  }
}

const PayPalButton = ({ planId }: PayPalButtonProps) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const tierMap: { [key: string]: 'standard' | 'creator' | 'full_access' } = {
    'P-7KL264841W2552459NBF443Q': 'standard',
    'P-0SA67033PS444644SNBF45XY': 'creator',
    'P-9WS58098DC2037313NBF46FY': 'full_access',
  };

  useEffect(() => {
    if (window.paypal && paypalRef.current && user) {
      // Clear previous button
      paypalRef.current.innerHTML = "";
      
      window.paypal.Buttons({
        style: {
          shape: 'pill',
          color: 'black',
          layout: 'vertical',
          label: 'subscribe',
        },
        createSubscription: function (data: any, actions: any) {
          return actions.subscription.create({
            plan_id: planId,
          });
        },
        onApprove: async function (data: any, actions: any) {
          toast({
            title: 'Processing Subscription...',
            description: 'Please wait while we confirm your subscription.',
          });
          
          const tier = tierMap[planId];
          if (!tier) {
              console.error('Invalid planId:', planId);
              toast({ title: 'Error', description: 'Invalid subscription plan.', variant: 'destructive' });
              return;
          }

          const { error } = await supabase.from('subscriptions').insert({
              user_id: user.id,
              tier: tier,
              status: 'active',
              paypal_subscription_id: data.subscriptionID,
          });

          if (error) {
              console.error('Error saving subscription:', error);
              toast({ title: 'Subscription Error', description: 'There was an issue saving your subscription. Please contact support.', variant: 'destructive' });
          } else {
              toast({ title: 'Subscription Successful!', description: `You are now subscribed to the ${tier} plan.` });
          }
        },
        onError: function (err: any) {
            console.error('PayPal Button Error:', err);
            toast({ title: 'Payment Error', description: 'An error occurred with your payment. Please try again.', variant: 'destructive' });
        }
      }).render(paypalRef.current);
    }
  }, [planId, user, toast]);

  if (!user) {
    return null;
  }

  return <div ref={paypalRef} />;
};

export default PayPalButton;
