/** FDI diş numarası → Türkçe anatomik isim (yaygın dişler). */
const TOOTH_NAMES: Record<number, string> = {
  11: "Sağ Üst Orta Kesici Diş",
  12: "Sağ Üst Yan Kesici Diş",
  13: "Sağ Üst Köpek Dişi",
  14: "Sağ Üst Birinci Küçük Azı",
  15: "Sağ Üst İkinci Küçük Azı",
  16: "Sağ Üst Birinci Büyük Azı",
  17: "Sağ Üst İkinci Büyük Azı",
  18: "Sağ Üst Üçüncü Büyük Azı",
  21: "Sol Üst Orta Kesici Diş",
  22: "Sol Üst Yan Kesici Diş",
  23: "Sol Üst Köpek Dişi",
  24: "Sol Üst Birinci Küçük Azı",
  25: "Sol Üst İkinci Küçük Azı",
  26: "Sol Üst Birinci Büyük Azı",
  27: "Sol Üst İkinci Büyük Azı",
  28: "Sol Üst Üçüncü Büyük Azı",
  31: "Sol Alt Orta Kesici Diş",
  32: "Sol Alt Yan Kesici Diş",
  33: "Sol Alt Köpek Dişi",
  34: "Sol Alt Birinci Küçük Azı",
  35: "Sol Alt İkinci Küçük Azı",
  36: "Sol Alt Birinci Büyük Azı",
  37: "Sol Alt İkinci Büyük Azı",
  38: "Sol Alt Üçüncü Büyük Azı",
  41: "Sağ Alt Orta Kesici Diş",
  42: "Sağ Alt Yan Kesici Diş",
  43: "Sağ Alt Köpek Dişi",
  44: "Sağ Alt Birinci Küçük Azı",
  45: "Sağ Alt İkinci Küçük Azı",
  46: "Sağ Alt Birinci Büyük Azı",
  47: "Sağ Alt İkinci Büyük Azı",
  48: "Sağ Alt Üçüncü Büyük Azı",
};

export const UPPER_RIGHT_FDI = [18, 17, 16, 15, 14, 13, 12, 11] as const;
export const UPPER_LEFT_FDI = [21, 22, 23, 24, 25, 26, 27, 28] as const;
export const LOWER_RIGHT_FDI = [48, 47, 46, 45, 44, 43, 42, 41] as const;
export const LOWER_LEFT_FDI = [31, 32, 33, 34, 35, 36, 37, 38] as const;

export const ALL_FDI_TEETH = [
  ...UPPER_RIGHT_FDI,
  ...UPPER_LEFT_FDI,
  ...LOWER_LEFT_FDI,
  ...LOWER_RIGHT_FDI,
];

const MONTH_ABBR_TR = [
  "Oca",
  "Şub",
  "Mar",
  "Nis",
  "May",
  "Haz",
  "Tem",
  "Ağu",
  "Eyl",
  "Eki",
  "Kas",
  "Ara",
] as const;

export function getToothName(toothNumber: number): string {
  return TOOTH_NAMES[toothNumber] ?? `${toothNumber} numaralı diş`;
}

export function formatToothDateLabel(isoDate: string): { day: string; month: string } {
  const d = new Date(isoDate + (isoDate.includes("T") ? "" : "T12:00:00"));
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: MONTH_ABBR_TR[d.getMonth()] ?? "—",
  };
}
