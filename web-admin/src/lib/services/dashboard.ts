import {
  dashboardSummary,
  growthData,
  revenueData,
  specialtyDemand,
} from "@/lib/mock-data";

export async function getDashboardSummary() {
  return dashboardSummary;
}

export async function getGrowthData() {
  return growthData;
}

export async function getRevenueData() {
  return revenueData;
}

export async function getSpecialtyDemand() {
  return specialtyDemand;
}

export async function fetchDashboardData() {
  return {
    summary: dashboardSummary,
    growthData,
    revenueData,
    specialtyDemand,
  };
}
