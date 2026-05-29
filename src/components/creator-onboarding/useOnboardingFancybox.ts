"use client";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const FANCYBOX_UI_OPTIONS = {
  groupAll: false,
  Toolbar: {
    display: {
      left: [],
      middle: [],
      right: ["close"],
    },
  },
} as const;

function resetFancybox() {
  Fancybox.close(true);
  Fancybox.destroy();
}

/** Single uploaded image preview in lightbox. */
export function openOnboardingFancybox(src: string, caption?: string) {
  resetFancybox();

  Fancybox.show(
    [
      {
        src,
        type: "image",
        caption: caption ?? "",
      },
    ],
    {
      ...FANCYBOX_UI_OPTIONS,
      Carousel: { infinite: false },
    }
  );
}
