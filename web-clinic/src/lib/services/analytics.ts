import type {
  AiReviewSummary,
  BranchRevenueShare,
  FunnelStage,
  OriginShare,
  RegionalComparison,
} from "@/types";
import {
  getAiReviewSummary,
  getBranchRevenueDistribution,
  getConversionFunnel,
  getPatientOriginDistribution,
  getRegionalComparison,
} from "@/lib/mock-data";

export async function fetchAnalyticsData(): Promise<{
  conversionFunnel: FunnelStage[];
  regionalComparison: RegionalComparison;
  aiReviewSummary: AiReviewSummary;
  patientOriginDistribution: OriginShare[];
  branchRevenueDistribution: BranchRevenueShare[];
}> {
  await delay(80);
  return {
    conversionFunnel: getConversionFunnel(),
    regionalComparison: getRegionalComparison(),
    aiReviewSummary: getAiReviewSummary(),
    patientOriginDistribution: getPatientOriginDistribution(),
    branchRevenueDistribution: getBranchRevenueDistribution(),
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
