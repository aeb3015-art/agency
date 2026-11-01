"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from "motion/react";
import Lenis from "lenis";

/* ---------- Provider: smooth scroll + reduced-motion flag ---------- */
const MotionCtx = createContext({ reduced: false });
export const useMotionPref = () => useContext(MotionCtx);

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion() ?? false;
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // anchor links
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href")!);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <MotionCtx.Provider value={{ reduced }}>
      {children}
      {!reduced && <Cursor />}
    </MotionCtx.Provider>
  );
}

/* ---------- Page transition ---------- */
export function PageTransition({ children }: { children: ReactNode }) {
  const { reduced } = useMotionPref();
  if (reduced) return <>{children}</>;
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ---------- Custom cursor (pointer: fine only) ---------- */
function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [active, setActive] = useState(false);
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    if (!mq.matches) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setActive(!!t.closest("a, button, [role=button], input, select, textarea, label"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  if (!fine) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-signal-bright/70 will-change-transform"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: active ? 44 : 14, height: active ? 44 : 14, backgroundColor: active ? "rgba(107,149,255,0.18)" : "rgba(107,149,255,0.9)" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  );
}

/* ---------- Reveal (fade/slide in view) ---------- */
export function FadeIn({ children, className = "", delay = 0, y = 28, as = "div", once = true }: { children: ReactNode; className?: string; delay?: number; y?: number; as?: "div" | "section" | "li" | "article" | "p" | "span"; once?: boolean }) {
  const { reduced } = useMotionPref();
  const Comp = (motion as unknown as Record<string, typeof motion.div>)[as];
  if (reduced) {
    const Plain = as as "div";
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Comp className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </Comp>
  );
}

/* ---------- Staggered children ---------- */
const containerV: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const itemV: Variants = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } };

export function Stagger({ children, className = "", as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ul" | "ol" }) {
  const { reduced } = useMotionPref();
  const Comp = (motion as unknown as Record<string, typeof motion.div>)[as];
  if (reduced) {
    const Plain = as as "div";
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Comp className={className} variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -8% 0px" }}>
      {children}
    </Comp>
  );
}
export function StaggerItem({ children, className = "", as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const { reduced } = useMotionPref();
  const Comp = (motion as unknown as Record<string, typeof motion.div>)[as];
  if (reduced) {
    const Plain = as as "div";
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Comp className={className} variants={itemV}>
      {children}
    </Comp>
  );
}

/* ---------- Split text: word-by-word mask reveal ---------- */
export function SplitText({ text, className = "", as: Tag = "span", delay = 0, stagger = 0.045, once = true }: { text: string; className?: string; as?: "span" | "h1" | "h2" | "p"; delay?: number; stagger?: number; once?: boolean }) {
  const { reduced } = useMotionPref();
  const words = text.split(" ");
  if (reduced) return <Tag className={className}>{text}</Tag>;
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 3, opacity: 0 }}
            whileInView={{ y: 0, rotate: 0, opacity: 1 }}
            viewport={{ once, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/* ---------- Parallax on scroll ---------- */
export function Parallax({ children, className = "", amount = 60 }: { children: ReactNode; className?: string; amount?: number }) {
  const { reduced } = useMotionPref();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ---------- Tilt (mouse 3D) ---------- */
export function Tilt({ children, className = "", max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const { reduced } = useMotionPref();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 1200 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * max * 2);
        rx.set(-py * max * 2);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Magnetic (buttons) ---------- */
export function Magnetic({ children, className = "", strength = 0.35 }: { children: ReactNode; className?: string; strength?: number }) {
  const { reduced } = useMotionPref();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Spotlight card (cursor-following glow) ---------- */
export function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`spotlight ${className}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Count up ---------- */
export function CountUp({ to, prefix = "", suffix = "", decimals = 0, duration = 1.6, className = "" }: { to: number; prefix?: string; suffix?: string; decimals?: number; duration?: number; className?: string }) {
  const { reduced } = useMotionPref();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [v, setV] = useState(reduced ? to : 0);
  useEffect(() => {
    if (!inView || reduced) return;
    const c = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (n) => setV(n) });
    return () => c.stop();
  }, [inView, reduced, to, duration]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------- Typewriter lines (terminal) ---------- */
export function TypedLines({ lines, className = "", speed = 220 }: { lines: ReactNode[]; className?: string; speed?: number }) {
  const { reduced } = useMotionPref();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [n, setN] = useState(reduced ? lines.length : 0);
  useEffect(() => {
    if (!inView || reduced) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= lines.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [inView, reduced, lines.length, speed]);
  return (
    <div ref={ref} className={className}>
      {lines.map((l, i) => (
        <motion.div key={i} initial={false} animate={{ opacity: i < n ? 1 : 0, x: i < n ? 0 : -6 }} transition={{ duration: 0.3 }} style={{ minHeight: "1.75em" }}>
          {i < n ? l : null}
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- Sequential entrance for hero panels ---------- */
export function Enter({ children, className = "", delay = 0, from = { y: 40, x: 0, rotate: 0 } }: { children: ReactNode; className?: string; delay?: number; from?: { y?: number; x?: number; rotate?: number } }) {
  const { reduced } = useMotionPref();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial={{ opacity: 0, y: from.y ?? 40, x: from.x ?? 0, rotate: from.rotate ?? 0, scale: 0.96 }} animate={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }} transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ---------- Scroll progress bar ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-signal to-signal-bright" style={{ scaleX }} />;
}

/* ---------- Header hide/show on scroll ---------- */
export function useScrollDirection() {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last.current && y > 160);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return hidden;
}
