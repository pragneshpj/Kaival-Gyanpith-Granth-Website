"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BookOpen, X } from "lucide-react";

type Stage = "closed" | "opening" | "open";

const COVER_MS = 1100;
const LEAF_COUNT = 3;
const LEAF_STAGGER_MS = 180;
const OPEN_DELAY_MS = COVER_MS + LEAF_COUNT * LEAF_STAGGER_MS + 200;

export function BookFlipViewer({
  title,
  cover,
  src,
  openLabel,
  closeLabel,
}: {
  title: string;
  cover: string;
  src: string;
  openLabel: string;
  closeLabel: string;
}) {
  const [stage, setStage] = useState<Stage>("closed");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function openBook() {
    if (stage !== "closed") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setStage("open");
      return;
    }
    setStage("opening");
    timer.current = setTimeout(() => setStage("open"), OPEN_DELAY_MS);
  }

  function closeBook() {
    if (timer.current) clearTimeout(timer.current);
    setStage("closed");
  }

  const flipping = stage !== "closed";

  return (
    <div className="relative mt-10 overflow-hidden rounded-xl border border-gold/30 bg-gradient-to-b from-cream-dark to-cream">
      {stage !== "closed" && (
        <iframe
          title={title}
          src={src}
          allow="autoplay"
          className={`h-[80vh] w-full bg-white transition-opacity duration-700 ${
            stage === "open" ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
          }`}
        />
      )}

      {stage === "open" ? (
        <button
          type="button"
          onClick={closeBook}
          className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-maroon px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-maroon-hover"
        >
          <X className="h-3.5 w-3.5" />
          {closeLabel}
        </button>
      ) : (
        <div className="flex h-[80vh] flex-col items-center justify-center gap-8 px-4">
          <div className="[perspective:2200px]">
            <div
              className="relative aspect-[3/4] w-[min(300px,70vw)] transition-transform duration-1000 ease-out [transform-style:preserve-3d]"
              style={{ transform: flipping ? "translateX(50%)" : "translateX(0)" }}
            >
              <div className="absolute inset-0 rounded-r-md bg-parchment shadow-[0_20px_45px_rgba(84,16,24,0.25)]">
                <div className="absolute inset-y-3 right-0 w-2 rounded-r bg-[repeating-linear-gradient(to_bottom,#e8dcc8_0,#e8dcc8_1px,#fff9ef_1px,#fff9ef_3px)]" />
              </div>

              {Array.from({ length: LEAF_COUNT }, (_, index) => (
                <div
                  key={index}
                  className="absolute inset-0 origin-left rounded-r-md border-l border-[#e8dcc8] bg-parchment [backface-visibility:hidden] [transform-style:preserve-3d]"
                  style={{
                    transform: flipping ? "rotateY(-178deg)" : "rotateY(0deg)",
                    transition: `transform 900ms cubic-bezier(0.45, 0.05, 0.25, 1) ${
                      COVER_MS - 300 + index * LEAF_STAGGER_MS
                    }ms`,
                    zIndex: LEAF_COUNT - index,
                  }}
                >
                  <div className="absolute inset-6 space-y-3 opacity-40">
                    {Array.from({ length: 9 }, (__, line) => (
                      <div key={line} className="h-1.5 rounded bg-muted/40" />
                    ))}
                  </div>
                </div>
              ))}

              <div
                className="absolute inset-0 origin-left [transform-style:preserve-3d]"
                style={{
                  transform: flipping ? "rotateY(-180deg)" : "rotateY(0deg)",
                  transition: `transform ${COVER_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
                  zIndex: LEAF_COUNT + 1,
                }}
              >
                <div className="absolute inset-0 overflow-hidden rounded-r-md shadow-[0_20px_45px_rgba(84,16,24,0.3)] [backface-visibility:hidden]">
                  <Image
                    src={cover}
                    alt={title}
                    fill
                    sizes="300px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/35 to-transparent" />
                </div>
                <div className="absolute inset-0 rounded-l-md bg-maroon-deep [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="absolute inset-3 rounded border border-gold/40" />
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={openBook}
            disabled={flipping}
            className="inline-flex items-center gap-2 rounded-lg bg-maroon px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-maroon-hover disabled:opacity-60"
          >
            <BookOpen className="h-4 w-4" />
            {openLabel}
          </button>
        </div>
      )}
    </div>
  );
}
