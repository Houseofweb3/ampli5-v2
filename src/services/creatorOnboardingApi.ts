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

export interface InstagramOAuthUrl {
  url: string;
  state: string;
}

/**
 * GET /api/v1/web/instagram/oauth-url – no auth. Returns the Instagram authorize URL
 * for the "Login with Instagram" popup. The popup posts the connection result back to
 * this window via postMessage on completion.
 */
export async function getInstagramOAuthUrl(): Promise<InstagramOAuthUrl> {
  const res = await dashboardClient.get<{ success: boolean } & InstagramOAuthUrl>(
    "/web/instagram/oauth-url"
  );
  return { url: res.data.url, state: res.data.state };
}

/**
 * POST /api/v1/web/instagram/disconnect – removes the stored connection + token for
 * the given Instagram user id. Called by the "Disconnect" button on the form.
 */
export async function disconnectInstagram(igUserId: string): Promise<void> {
  await dashboardClient.post("/web/instagram/disconnect", { igUserId });
}

export interface YoutubeOAuthUrl {
  url: string;
  state: string;
}

/**
 * GET /api/v1/web/youtube/oauth-url – no auth. Returns the Google authorize URL for the
 * "Login with YouTube" popup. The popup posts the connection result back to this window
 * via postMessage (source: "ampli5-youtube") on completion.
 */
export async function getYoutubeOAuthUrl(): Promise<YoutubeOAuthUrl> {
  const res = await dashboardClient.get<{ success: boolean } & YoutubeOAuthUrl>(
    "/web/youtube/oauth-url"
  );
  return { url: res.data.url, state: res.data.state };
}

/**
 * POST /api/v1/web/youtube/disconnect – removes the stored connection + tokens for the
 * given YouTube channel id. Called by the "Disconnect" button on the form.
 */
export async function disconnectYoutube(channelId: string): Promise<void> {
  await dashboardClient.post("/web/youtube/disconnect", { channelId });
}
