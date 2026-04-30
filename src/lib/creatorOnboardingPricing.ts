/**
 * Matches creator-onboarding page + dashboard influencer service:
 * buyPrice from rate string; sell = buy + 16%, rounded to nearest 100.
 */

export function stripPriceToNumeric(rate: string): number | null {
  const cleaned = String(rate)
    .replace(/[$,\s]/g, "")
    .trim();
  if (cleaned === "" || cleaned === "0") return null;
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function sellingPriceFromBuyingPrice(buyPrice: number): number {
  return Math.round((buyPrice * 1.16) / 100) * 100;
}

/** CPM = (sellingPrice / avgViews) × 1,000. */
export function cpmFromSellingPrice(sellingPrice: number, avgViews: number): number | null {
  if (!avgViews || avgViews <= 0 || !Number.isFinite(avgViews)) return null;
  return (sellingPrice / avgViews) * 1000;
}

/** CCP = (buyPrice / avgViews) × 1,000. */
export function ccpFromBuyingPrice(buyPrice: number, avgViews: number): number | null {
  if (!avgViews || avgViews <= 0 || !Number.isFinite(avgViews)) return null;
  return (buyPrice / avgViews) * 1000;
}
