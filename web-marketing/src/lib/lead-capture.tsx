"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type LeadMode = "patient" | "clinic";
export type LeadRole = "clinic" | "doctor";

type LeadCaptureContextValue = {
  open: boolean;
  mode: LeadMode;
  role: LeadRole;
  openLead: (mode: LeadMode, role?: LeadRole) => void;
  closeLead: () => void;
};

const LeadCaptureContext = createContext<LeadCaptureContextValue | null>(null);

export function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<LeadMode>("patient");
  const [role, setRole] = useState<LeadRole>("clinic");

  const openLead = useCallback((next: LeadMode, nextRole: LeadRole = "clinic") => {
    setMode(next);
    setRole(next === "clinic" ? nextRole : "clinic");
    setOpen(true);
  }, []);

  const closeLead = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, mode, role, openLead, closeLead }),
    [open, mode, role, openLead, closeLead]
  );

  return (
    <LeadCaptureContext.Provider value={value}>
      {children}
    </LeadCaptureContext.Provider>
  );
}

export function useLeadCapture() {
  const ctx = useContext(LeadCaptureContext);
  if (!ctx) {
    throw new Error("useLeadCapture must be used within LeadCaptureProvider");
  }
  return ctx;
}
