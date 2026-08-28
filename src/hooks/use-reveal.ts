import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll hook backed by IntersectionObserver.
 * Returns a ref to attach and a boolean once visible.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px", ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, options]);

  return { ref, visible };
}
