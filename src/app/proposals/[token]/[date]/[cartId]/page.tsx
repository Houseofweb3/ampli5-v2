import { ProposalPageContent } from "@/src/components/proposals/ProposalPageContent";

/**
 * Readable proposal link: `/proposals/{clientSlug}/{YYYY-MM-DD}/{cartId}`
 * First path segment must be named `token` to match Next.js (same as legacy `/proposals/{jwt}`).
 * Here `params.token` is the client slug, not a JWT.
 */
export default function ProposalSlugPage({
  params,
}: {
  params: { token: string; date: string; cartId: string };
}) {
  return (
    <ProposalPageContent
      mode="slug"
      clientSlug={params.token}
      date={params.date}
      cartId={params.cartId}
    />
  );
}
