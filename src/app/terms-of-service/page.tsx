import React from "react";
import Container from "../../components/ui/container";
import { Metadata } from "next";
import TermsOfServiceContent from "@/src/components/TermsOfServiceContent";

export const metadata: Metadata = {
  title: "Terms of Service | Ampli5",
  description: "Terms of Service for Ampli5 by HOW3 Pte Ltd.",
};

export default function TermsOfServicePage() {
  return (
    <Container className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <TermsOfServiceContent />
      </div>
    </Container>
  );
}
