/**
 * Dashboard API paths for client proposal flows (see product spec).
 * Base: NEXT_PUBLIC_DASHBOARD_API_URL (e.g. https://api.example.com/api/v1)
 */

export type ProposalLinkMode = "legacy" | "slug";

export interface ProposalSlugParams {
  clientSlug: string;
  date: string;
  cartId: string;
}

function joinBase(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

/** GET cart for proposal (readable path). */
export function proposalGetUrlSlug(
  baseUrl: string,
  { clientSlug, date, cartId }: ProposalSlugParams
): string {
  return joinBase(
    baseUrl,
    `/web/proposal/slug/${encodeURIComponent(clientSlug)}/${encodeURIComponent(date)}/${encodeURIComponent(cartId)}`
  );
}

/** GET cart for proposal (legacy JWT in path). */
export function proposalGetUrlLegacy(baseUrl: string, token: string): string {
  return joinBase(baseUrl, `/web/proposal/${encodeURIComponent(token)}`);
}

/** POST submit (readable path). */
export function proposalSubmitUrlSlug(
  baseUrl: string,
  { clientSlug, date, cartId }: ProposalSlugParams
): string {
  return joinBase(
    baseUrl,
    `/web/proposal/slug/${encodeURIComponent(clientSlug)}/${encodeURIComponent(date)}/${encodeURIComponent(cartId)}/submit`
  );
}

/** POST submit (legacy). */
export function proposalSubmitUrlLegacy(baseUrl: string, token: string): string {
  return joinBase(baseUrl, `/web/proposal/${encodeURIComponent(token)}/submit`);
}
