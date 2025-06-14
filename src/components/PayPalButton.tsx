
import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    if (window.paypal && paypalRef.current) {
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
        onApprove: function (data: any, actions: any) {
          alert('Subscription successful! ID: ' + data.subscriptionID);
          // TODO: Call a backend function to verify and save the subscription status
        },
        onError: function (err: any) {
            console.error('PayPal Button Error:', err);
            alert('An error occurred with your payment. Please try again.');
        }
      }).render(paypalRef.current);
    }
  }, [planId]);

  return <div ref={paypalRef} />;
};

export default PayPalButton;
