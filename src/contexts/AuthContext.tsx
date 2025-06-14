
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Tables } from '@/integrations/supabase/types';

interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string;
}

type Subscription = Tables<'subscriptions'>;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  subscription: Subscription | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserStuff = async () => {
      if (user) {
        setLoading(true);
        const profilePromise = supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        const subscriptionPromise = supabase
          .from('subscriptions')
          .select('*')
          .in('status', ['active', 'trialing'])
          .eq('user_id', user.id)
          .single();

        const [
          { data: profileData, error: profileError }, 
          { data: subscriptionData, error: subscriptionError }
        ] = await Promise.all([profilePromise, subscriptionPromise]);
        
        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
        } else {
          setProfile(profileData);
        }

        if (subscriptionError && subscriptionError.code !== 'PGRST116') {
          console.error('Error fetching subscription:', subscriptionError);
        } else {
          setSubscription(subscriptionData);
        }

        setLoading(false);
      } else {
        setProfile(null);
        setSubscription(null);
      }
    };

    fetchUserStuff();
  }, [user]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setSubscription(null);
  };

  const value = {
    user,
    session,
    profile,
    subscription,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
