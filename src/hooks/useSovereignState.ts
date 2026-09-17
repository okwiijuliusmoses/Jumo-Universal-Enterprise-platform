import { useState, useEffect } from 'react';
import { SovereignState } from '../core/runtime/sovereignState';

export const useSovereignState = () => {
  const [state, setState] = useState<SovereignState | null>(null);

  const fetchState = async () => {
    try {
      const res = await fetch('/api/v1/ueos/state');
      if (res.ok) {
        setState(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch sovereign state", err);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  return { state, fetchState };
};
