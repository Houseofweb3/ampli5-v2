"use client";

import { ProposalPageContent } from "@/src/components/proposals/ProposalPageContent";

/** Legacy proposal link: `/proposals/{jwt}` → GET/POST `/api/v1/web/proposal/:token` */
export default function ProposalLegacyPage({ params }: { params: { token: string } }) {
  return <ProposalPageContent mode="legacy" legacyToken={params.token} />;
}
