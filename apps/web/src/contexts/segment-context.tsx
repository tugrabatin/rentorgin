/**
 * Segment Context
 * Manages tenant customer segment state and provides UI configuration.
 *
 * Storage strategy:
 *   1. Try backend API first (GET /tenant/profile, PATCH /tenant/segment)
 *   2. Fall back to localStorage when backend is unreachable (demo / offline mode)
 */

'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import apiClient from '../lib/api';
import { buildUIContext, type SegmentUIConfig } from '../config/segment-ui-config';

const LS_KEY = 'basis_customer_segment';

function readLocalSegment(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(LS_KEY);
}

function writeLocalSegment(seg: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LS_KEY, seg);
  }
}

// ────────────────────────────────────────────
// Types
// ────────────────────────────────────────────

interface SegmentContextType {
  segment: string | null;
  uiConfig: SegmentUIConfig | null;
  segmentMissing: boolean;
  isLoading: boolean;
  setSegment: (seg: string) => void;
  reloadSegment: () => Promise<void>;
  updateSegmentOnServer: (seg: string) => Promise<boolean>;
}

const SegmentContext = createContext<SegmentContextType | undefined>(undefined);

// ────────────────────────────────────────────
// Provider
// ────────────────────────────────────────────

export function SegmentProvider({ children }: { children: ReactNode }) {
  const [segment, setSegmentState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const uiConfig = segment ? buildUIContext(segment) : null;
  const segmentMissing = !isLoading && segment === null;

  const reloadSegment = useCallback(async () => {
    try {
      const res = await apiClient.get('/tenant/profile');
      const seg = (res.data.customerSegment as string) || null;
      if (seg) {
        setSegmentState(seg);
        writeLocalSegment(seg);
      } else {
        const local = readLocalSegment();
        setSegmentState(local);
      }
    } catch {
      const local = readLocalSegment();
      setSegmentState(local);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reloadSegment();
  }, [reloadSegment]);

  const setSegment = useCallback((seg: string) => {
    setSegmentState(seg);
    writeLocalSegment(seg);
  }, []);

  const updateSegmentOnServer = useCallback(async (seg: string): Promise<boolean> => {
    try {
      await apiClient.patch('/tenant/segment', { customerSegment: seg });
    } catch {
      // Backend unreachable — persist locally so the UI still works
    }
    setSegmentState(seg);
    writeLocalSegment(seg);
    return true;
  }, []);

  return (
    <SegmentContext.Provider
      value={{
        segment,
        uiConfig,
        segmentMissing,
        isLoading,
        setSegment,
        reloadSegment,
        updateSegmentOnServer,
      }}
    >
      {children}
    </SegmentContext.Provider>
  );
}

// ────────────────────────────────────────────
// Hook
// ────────────────────────────────────────────

export function useSegment() {
  const ctx = useContext(SegmentContext);
  if (ctx === undefined) {
    throw new Error('useSegment must be used within a SegmentProvider');
  }
  return ctx;
}
