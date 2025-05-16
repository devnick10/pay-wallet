'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export function DashboardToastWrapper() {
  const params = useSearchParams();
   const {toast} =  useToast()
  useEffect(() => {
    if (params.get('signinSuccess') === '1') {
      toast({ description: 'Sign in successful' });
      // Clean up the URL
      const newParams = new URLSearchParams(params);
      newParams.delete('signinSuccess');
      window.history.replaceState(null, '', `?${newParams.toString()}`);
    }
  }, [params,toast]);
  return null;
}