"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Send } from "lucide-react";

export function ContactPanel() {
  return (
    <motion.section
      id="contact"
      className="relative z-10 flex min-h-screen items-end px-5 py-10 md:px-10"
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.24 }}
      transition={{ duration: 0.65 }}
    >
      <div className="glass-panel mx-auto w-full max-w-3xl p-7 md:p-9">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#7DE8E8]">Contact station</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-white md:text-4xl">Start a signal</h2>
          </div>
          <div className="flex gap-3">
            <a className="icon-button" href="https://github.com/boyedandtoyed" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
              <Github size={19} />
            </a>
            <a className="icon-button" href="https://www.linkedin.com/in/binodtiwari" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <Linkedin size={19} />
            </a>
          </div>
        </div>
        <form className="grid gap-4" action="mailto:contact@binodtiwari.com" method="post" encType="text/plain">
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="field" name="name" required placeholder="Name" />
            <input className="field" name="email" type="email" required placeholder="Email" />
          </div>
          <textarea className="field min-h-36 resize-none" name="message" required placeholder="Message" />
          <button className="button-primary w-fit" type="submit">
            <Send size={17} />
            Send message
          </button>
        </form>
      </div>
    </motion.section>
  );
}
