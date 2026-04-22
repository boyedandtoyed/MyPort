"use client";

import { useCallback, useEffect, useState } from "react";

export type SpaceSection = "solar" | "about" | "skills" | "contact" | "top";

export function useScrollSection() {
  const [activeSection, setActiveSection] = useState<SpaceSection>("solar");

  useEffect(() => {
    const onScroll = () => {
      const ratio = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      if (ratio > 0.76) setActiveSection("contact");
      else if (ratio > 0.52) setActiveSection("skills");
      else if (ratio > 0.26) setActiveSection("about");
      else setActiveSection("solar");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const travelTo = useCallback((section: SpaceSection) => {
    if (section === "top" || section === "solar") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("solar");
      return;
    }

    const target = document.getElementById(section);
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
    setActiveSection(section);
  }, []);

  return { activeSection, travelTo, setActiveSection };
}
