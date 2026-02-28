import { dashboardClient } from "@/src/lib/dashboardClient";
import type { WebInfluencerListResponse } from "@/src/lib/types";

export interface WebInfluencerListParams {
  page?: number;
  limit?: number;
  search?: string;
  primaryCountry?: string | string[];
  platform?: string | string[];
  inventory?: string | string[];
  industries?: string | string[];
  categories?: string | string[];
  primaryAudienceGeography?: string | string[];
}

function appendParam(
  params: URLSearchParams,
  key: string,
  value: string | string[] | undefined
): void {
  if (value == null) return;
  if (Array.isArray(value)) {
    value.forEach((v) => v && params.append(key, v));
  } else {
    params.append(key, value);
  }
}

export async function getWebInfluencerList(
  params: WebInfluencerListParams = {}
): Promise<WebInfluencerListResponse> {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(Math.min(params.limit ?? 10, 100)));
  if (params.search) searchParams.set("search", params.search);

  appendParam(searchParams, "primaryCountry", params.primaryCountry);
  appendParam(searchParams, "platform", params.platform);
  appendParam(searchParams, "inventory", params.inventory);
  appendParam(searchParams, "industries", params.industries);
  appendParam(searchParams, "categories", params.categories);
  appendParam(searchParams, "primaryAudienceGeography", params.primaryAudienceGeography);

  const res = await dashboardClient.get<WebInfluencerListResponse>(
    `/web/influencer?${searchParams.toString()}`
  );
  return res.data;
}
