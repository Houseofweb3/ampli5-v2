import { Suspense } from "react";
import React from "react";
import SignupForm from "../../components/SignupForm";
import RequireAuth from "../../components/PubliceAuth";

export default function Page() {
  return (
    <Suspense>
      <RequireAuth>
        <SignupForm />
      </RequireAuth>
    </Suspense>
  );
}
