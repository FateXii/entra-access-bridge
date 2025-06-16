
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

export function useProfileCompletion() {
  const { user } = useAuth();
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      checkProfileCompletion();
    } else {
      setLoading(false);
      setIsProfileComplete(null);
    }
  }, [user]);

  const checkProfileCompletion = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, user_type')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      const isComplete = !!(data?.full_name?.trim() && data?.user_type);
      setIsProfileComplete(isComplete);
    } catch (error) {
      console.error('Error checking profile completion:', error);
      setIsProfileComplete(false);
    } finally {
      setLoading(false);
    }
  };

  const markProfileComplete = () => {
    setIsProfileComplete(true);
  };

  const refetch = async () => {
    await checkProfileCompletion();
  };

  return {
    isProfileComplete,
    loading,
    markProfileComplete,
    checkProfileCompletion,
    refetch,
  };
}
