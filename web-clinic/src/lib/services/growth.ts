/**
 * Growth & marketing modules — mock-only until backend endpoints exist.
 * Pages (campaigns, messages, forecasts, finance, sponsorship, market-analysis)
 * stay fully functional via growth-mock.ts; no API calls are made here.
 */
import {
  aiInsights as mockInsights,
  campaigns as mockCampaigns,
  chatMessages as mockChatMessages,
  competitorTable as mockCompetitors,
  financeSummary as mockFinanceSummary,
  forecastData as mockForecastData,
  invoices as mockInvoices,
  messageThreads as mockThreads,
  priceComparison as mockPriceComparison,
  sponsorshipPackages as mockPackages,
  visibilityScore as mockVisibilityScore,
  type AiInsight,
  type Campaign,
  type ChatMessage,
  type CompetitorRow,
  type FinanceSummary,
  type ForecastPoint,
  type InvoiceRow,
  type MessageThread,
  type PriceComparison,
  type SponsorshipPackage,
} from "@/lib/growth-mock";
import { useApi } from "@/lib/services/shared";

export async function fetchCampaigns(): Promise<Campaign[]> {
  return mockCampaigns;
}

export async function fetchMessageThreads(): Promise<MessageThread[]> {
  return mockThreads;
}

export async function fetchChatMessages(): Promise<ChatMessage[]> {
  return mockChatMessages;
}

export async function fetchForecastData(): Promise<ForecastPoint[]> {
  return mockForecastData;
}

export async function fetchAiInsights(): Promise<AiInsight[]> {
  return mockInsights;
}

export async function fetchMarketAnalysis(): Promise<{
  priceComparison: PriceComparison[];
  competitors: CompetitorRow[];
}> {
  return {
    priceComparison: mockPriceComparison,
    competitors: mockCompetitors,
  };
}

export async function fetchFinanceData(): Promise<{
  summary: FinanceSummary;
  invoices: InvoiceRow[];
}> {
  return { summary: mockFinanceSummary, invoices: mockInvoices };
}

export async function fetchSponsorshipData(): Promise<{
  visibility: typeof mockVisibilityScore;
  packages: SponsorshipPackage[];
}> {
  return { visibility: mockVisibilityScore, packages: mockPackages };
}

export function isGrowthApiReady(): boolean {
  return useApi();
}
