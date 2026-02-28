/**
 * Dashboard route access: public (no auth) vs private (token required).
 */

export const DASHBOARD_SIGN_IN = "/dashboard/sign-in";
export const DASHBOARD_HOME = "/dashboard/influencers";

/** Public: anyone can access (e.g. sign-in, discover). */
export const DASHBOARD_PUBLIC_PATHS: readonly string[] = ["/dashboard", "/dashboard/sign-in"];

/** Private: require cookie token; else redirect to sign-in. */
export const DASHBOARD_PRIVATE_PATHS: readonly string[] = [
  "/dashboard/influencers",
  "/dashboard/cart",
  "/dashboard/profile",
];

function pathMatches(pathname: string | null, route: string): boolean {
  if (pathname == null) return false;
  return pathname === route || pathname.startsWith(route + "/");
}

export function isPublicDashboardPath(pathname: string | null): boolean {
  return DASHBOARD_PUBLIC_PATHS.some((p) => pathMatches(pathname, p));
}

export function isPrivateDashboardPath(pathname: string | null): boolean {
  return DASHBOARD_PRIVATE_PATHS.some((p) => pathMatches(pathname, p));
}
