import type {
  BranchRevenueShare,
  FunnelStage,
  OriginShare,
  RegionalComparison,
  TreatmentDemand,
} from "@/types";
import {
  getBranchRevenueDistribution,
  getConversionFunnel,
  getPatientOriginDistribution,
  getRegionalComparison,
  getTreatmentDemand,
} from "@/lib/mock-data";

export async function fetchAnalyticsData(): Promise<{
  conversionFunnel: FunnelStage[];
  regionalComparison: RegionalComparison;
  patientOriginDistribution: OriginShare[];
  branchRevenueDistribution: BranchRevenueShare[];
  treatmentDemand: TreatmentDemand[];
}> {
  await delay(80);
  return {
    conversionFunnel: getConversionFunnel(),
    regionalComparison: getRegionalComparison(),
    patientOriginDistribution: getPatientOriginDistribution(),
    branchRevenueDistribution: getBranchRevenueDistribution(),
    treatmentDemand: getTreatmentDemand(),
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
