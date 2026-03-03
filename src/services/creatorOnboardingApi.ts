import { dashboardClient } from "@/src/lib/dashboardClient";

export interface CreatorOnboardingSuccess {
  message: string;
  created: number;
  influencerIds: string[];
}

/** POST /api/v1/web/creator-onboarding – no auth. Creates influencer records in DB. */
export async function submitCreatorOnboarding(
  payload: Record<string, unknown>
): Promise<CreatorOnboardingSuccess> {
  const res = await dashboardClient.post<CreatorOnboardingSuccess>(
    "/web/creator-onboarding",
    payload
  );
  return res.data;
}
