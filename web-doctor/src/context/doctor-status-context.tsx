"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { DoctorStatus } from "@/types";

interface DoctorStatusContextValue {
  status: DoctorStatus;
  setStatus: (status: DoctorStatus) => void;
}

const DoctorStatusContext = createContext<DoctorStatusContextValue | null>(null);

export function DoctorStatusProvider({
  initialStatus,
  children,
}: {
  initialStatus: DoctorStatus;
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<DoctorStatus>(initialStatus);

  const value = useMemo(() => ({ status, setStatus }), [status]);

  return (
    <DoctorStatusContext.Provider value={value}>
      {children}
    </DoctorStatusContext.Provider>
  );
}

export function useDoctorStatus() {
  const ctx = useContext(DoctorStatusContext);
  if (!ctx) {
    throw new Error("useDoctorStatus must be used within a DoctorStatusProvider");
  }
  return ctx;
}
