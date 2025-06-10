/* eslint-disable no-unused-vars */
"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function CalCall() {
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
        callback: (e) => {},
      });
    });
  });

  return (
    <Cal
      calLink="team/bd/discovery-call-house-of-web3"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
