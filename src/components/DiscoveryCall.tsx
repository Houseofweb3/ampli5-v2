"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function CalCall() {
  const router = useRouter();

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        styles: { branding: { brandColor: "#A762FE" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  useEffect(() => {
    getCalApi().then((cal) => {
      cal("on", {
        action: "bookingSuccessful",
        callback: () => {
          router.push("/redirect");
        },
      });
    });
  });

  return (
    <Cal
      calLink="team/bd/discovery-call-house-of-web3"
      style={{
        width: "100%",
        height: "100%",
        overflow: "scroll",
        borderRadius: "24px",
      }}
      config={{ layout: "month_view", theme: "light" }}
    />
  );
}
