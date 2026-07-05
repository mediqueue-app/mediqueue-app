import { IdCard, FileText, StickyNote, ShieldCheck } from "lucide-react";
import type { DocumentType } from "@/types";

export const DOCUMENT_TYPE_LABEL: Record<DocumentType, string> = {
  PASAPORT: "Pasaport",
  TIBBI_RAPOR: "Tıbbi Rapor",
  VIZE: "Vize Belgesi",
  SIGORTA: "Sağlık Sigortası",
};

export const DOCUMENT_TYPE_ICON: Record<DocumentType, typeof IdCard> = {
  PASAPORT: IdCard,
  TIBBI_RAPOR: FileText,
  VIZE: StickyNote,
  SIGORTA: ShieldCheck,
};
