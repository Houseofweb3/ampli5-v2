import type {
  GetProposalResponse,
  SubmitProposalPayload,
  SubmitProposalResponse,
} from "@/src/types/proposal";

const getBaseUrl = () => process.env.NEXT_PUBLIC_DASHBOARD_API_URL || "";

export class ProposalApiError extends Error {
  public readonly status: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ProposalApiError";
    this.status = statusCode;
  }
}

export async function getProposalByToken(token: string): Promise<GetProposalResponse> {
  const res = await fetch(`${getBaseUrl()}/web/proposal/${encodeURIComponent(token)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      (data as { error?: string })?.error ||
      (data as { message?: string })?.message ||
      "Failed to load proposal";
    throw new ProposalApiError(message, res.status);
  }
  return data as GetProposalResponse;
}

export async function submitProposal(
  token: string,
  payload: SubmitProposalPayload
): Promise<SubmitProposalResponse> {
  const res = await fetch(`${getBaseUrl()}/web/proposal/${encodeURIComponent(token)}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const message =
      (data as { error?: string })?.error ||
      (data as { message?: string })?.message ||
      "Failed to submit proposal";
    throw new Error(message);
  }
  return data as SubmitProposalResponse;
}
