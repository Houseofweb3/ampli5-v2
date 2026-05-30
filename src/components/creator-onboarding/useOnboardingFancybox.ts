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

export type OnboardingFancyboxSlide = { src: string; caption: string };

/** Platform example gallery only (not mixed with uploads or other platforms). */
export function openOnboardingFancyboxGallery(
  slides: OnboardingFancyboxSlide[],
  startIndex = 0
) {
  if (slides.length === 0) return;

  resetFancybox();

  Fancybox.show(
    slides.map((slide) => ({
      src: slide.src,
      type: "image" as const,
      caption: slide.caption,
    })),
    {
      ...FANCYBOX_UI_OPTIONS,
      startIndex: Math.min(Math.max(0, startIndex), slides.length - 1),
      Carousel: { infinite: false },
    }
  );
}
