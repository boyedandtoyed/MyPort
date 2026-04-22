"use client";

import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-[#03040b]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.75, ease: "easeInOut" } }}
        >
          <div className="flex w-[min(420px,86vw)] flex-col items-center gap-8">
            <div className="loader-system" aria-hidden="true">
              <span />
              <i />
            </div>
            <div className="w-full space-y-3 text-center">
              <p className="font-heading text-sm uppercase tracking-[0.32em] text-white/75">
                Initializing solar system...
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#FDB813] via-[#7DE8E8] to-[#C1440E]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
