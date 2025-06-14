
INSERT INTO public.subscriptions (user_id, tier, status, paypal_subscription_id)
VALUES ('1500d10a-7358-4983-941b-cae3ca3b59f5', 'full_access', 'active', 'manual_grant_by_lovable')
ON CONFLICT (paypal_subscription_id) 
DO UPDATE SET 
  tier = EXCLUDED.tier,
  status = EXCLUDED.status,
  updated_at = NOW();
