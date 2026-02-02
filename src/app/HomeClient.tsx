"use client";

import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue } from "framer-motion";
import {
  Phone,
  Users,
  Brain,
  FileText,
  BarChart3,
  Globe,
  Target,
  CheckCircle2,
  ArrowRight,
  Shield,
  Eye,
  Package,
  ShoppingCart,
  Layers,
  Sparkles,
  Menu,
  X,
  DollarSign,
  XCircle,
  Mail,
  MessageSquare,
  User,
  Send
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LeadsDashboard } from "../components/revenue-automation/LeadsDashboard";

// ============================================
// ANIMATED COUNTER COMPONENT
// Numbers rapidly count up when scrolling into view
// ============================================
function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  className = ""
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setDisplayValue(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + 'M';
    }
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  );
}

// ============================================
// TEXT REVEAL ANIMATION COMPONENT
// Words stagger in sequentially for cinematic effect
// ============================================
function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.08,
  as: _as = "span"
}: {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const words = children.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1] as const
      }
    }
  };

  return (
    <motion.span
      className={`inline ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: "1000px" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block"
          style={{ transformOrigin: "center bottom" }}
        >
          {word}
          {index < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ============================================
// MAGNETIC BUTTON COMPONENT
// Button subtly pulls toward cursor on hover
// ============================================
function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  style,
  strength = 0.3
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      ref={ref as React.RefObject<HTMLAnchorElement & HTMLButtonElement>}
      href={href}
      onClick={onClick}
      className={className}
      style={{
        ...style,
        x: springX,
        y: springY
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </MotionComponent>
  );
}

// ============================================
// BROWSER GRAVEYARD COMPONENT
// Animated browser windows that crack and die without systems
// ============================================
function BrowserGraveyard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [deadBrowsers, setDeadBrowsers] = useState<number[]>([]);

  const browserFailures = [
    {
      url: "yoursite.com/contact",
      title: "Contact Form",
      issue: "Can't answer the phone",
      icon: Phone,
      deathDelay: 0.5,
    },
    {
      url: "yoursite.com/leads",
      title: "Lead Capture",
      issue: "Can't track leads",
      icon: Users,
      deathDelay: 1.2,
    },
    {
      url: "yoursite.com/tasks",
      title: "Task Manager",
      issue: "Can't assign tasks",
      icon: Brain,
      deathDelay: 1.9,
    },
    {
      url: "yoursite.com/billing",
      title: "Invoicing",
      issue: "Can't send invoices",
      icon: FileText,
      deathDelay: 2.6,
    },
    {
      url: "yoursite.com/analytics",
      title: "Analytics",
      issue: "Can't show what's working",
      icon: BarChart3,
      deathDelay: 3.3,
    },
  ];

  // Trigger browser deaths sequentially when in view
  useEffect(() => {
    if (!isInView) return;

    browserFailures.forEach((browser, index) => {
      const timer = setTimeout(() => {
        setDeadBrowsers(prev => [...prev, index]);
      }, browser.deathDelay * 1000);

      return () => clearTimeout(timer);
    });
  }, [isInView]);

  return (
    <div ref={containerRef} className="relative">
      {/* Graveyard ground effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-900/50 to-transparent pointer-events-none" />

      {/* Browser windows grid */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 max-w-5xl mx-auto">
        {browserFailures.map((browser, index) => {
          const isDead = deadBrowsers.includes(index);
          const IconComponent = browser.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
                rotateX: 0,
              } : {}}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="perspective-1000 w-[calc(50%-6px)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <motion.div
                className="relative"
                animate={isDead ? {
                  rotateX: [0, 5, -3, 2, 0],
                  y: [0, -5, 0],
                } : {}}
                transition={{ duration: 0.4 }}
              >
                {/* Browser window */}
                <div className={`relative rounded-xl overflow-hidden border-2 transition-all duration-500 ${
                  isDead
                    ? "border-red-500/50 shadow-lg shadow-red-500/20"
                    : "border-white/10"
                }`}>
                  {/* Browser chrome/header */}
                  <div className={`px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-1 sm:gap-2 transition-colors duration-500 ${
                    isDead ? "bg-red-950/50" : "bg-[#2d2d2d]"
                  }`}>
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-500 ${isDead ? "bg-red-500" : "bg-[#ff5f56]"}`} />
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-500 ${isDead ? "bg-red-500/50" : "bg-[#ffbd2e]"}`} />
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-500 ${isDead ? "bg-red-500/30" : "bg-[#27ca40]"}`} />
                    <div className={`ml-1 sm:ml-3 flex-1 rounded px-1.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-xs font-mono truncate transition-colors duration-500 ${
                      isDead ? "bg-red-950/50 text-red-400/60" : "bg-[#1a1a1a] text-white/40"
                    }`}>
                      {browser.url}
                    </div>
                  </div>

                  {/* Browser content */}
                  <div className={`relative p-3 sm:p-6 min-h-[100px] sm:min-h-[140px] flex flex-col items-center justify-center transition-colors duration-500 ${
                    isDead ? "bg-[#1a0a0a]" : "bg-[#1a1a22]"
                  }`}>
                    {/* Crack overlay when dead */}
                    <AnimatePresence>
                      {isDead && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 pointer-events-none"
                        >
                          {/* Crack lines SVG */}
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150" preserveAspectRatio="none">
                            <motion.path
                              d="M100,0 L95,30 L85,35 L90,60 L75,80 L80,100 L70,120 L65,150"
                              stroke="rgba(239,68,68,0.4)"
                              strokeWidth="2"
                              fill="none"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                            <motion.path
                              d="M95,30 L120,45 L130,40 L150,55"
                              stroke="rgba(239,68,68,0.3)"
                              strokeWidth="1.5"
                              fill="none"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.2, delay: 0.1 }}
                            />
                            <motion.path
                              d="M85,35 L60,50 L50,45 L30,60"
                              stroke="rgba(239,68,68,0.3)"
                              strokeWidth="1.5"
                              fill="none"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.2, delay: 0.15 }}
                            />
                            <motion.path
                              d="M90,60 L110,75 L125,70"
                              stroke="rgba(239,68,68,0.25)"
                              strokeWidth="1"
                              fill="none"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.15, delay: 0.2 }}
                            />
                          </svg>

                          {/* Glitch effect */}
                          <motion.div
                            className="absolute inset-0 bg-red-500/10"
                            animate={{
                              opacity: [0, 0.3, 0, 0.2, 0],
                            }}
                            transition={{
                              duration: 0.5,
                              times: [0, 0.1, 0.2, 0.3, 0.5],
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Icon */}
                    <motion.div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 transition-colors duration-500 ${
                        isDead ? "bg-red-500/20" : "bg-white/5"
                      }`}
                      animate={isDead ? { scale: [1, 0.9, 1], rotate: [0, -5, 5, 0] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-500 ${
                        isDead ? "text-red-400" : "text-white/40"
                      }`} />
                    </motion.div>

                    {/* Title */}
                    <p className={`text-xs sm:text-sm font-semibold mb-1 transition-colors duration-500 ${
                      isDead ? "text-red-300" : "text-white/60"
                    }`}>
                      {browser.title}
                    </p>

                    {/* Status message */}
                    <AnimatePresence mode="wait">
                      {isDead ? (
                        <motion.div
                          key="dead"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1 sm:gap-2"
                        >
                          <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                          <p className="text-[10px] sm:text-xs text-red-400 font-medium">{browser.issue}</p>
                        </motion.div>
                      ) : (
                        <motion.p
                          key="alive"
                          className="text-[10px] sm:text-xs text-white/30"
                        >
                          Loading...
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Tombstone that rises when dead */}
                <AnimatePresence>
                  {isDead && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-[10px] text-neutral-400 font-medium whitespace-nowrap"
                    >
                      R.I.P. {browser.title}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Final message after all browsers die */}
      <AnimatePresence>
        {deadBrowsers.length === browserFailures.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/20">
              <span className="text-2xl">💀</span>
              <p className="text-red-300 font-semibold">5 websites died. 0 leads captured.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// CHAOS SLOT MACHINE COMPONENT
// Interactive slot machine showing business pain points
// ============================================
function ChaosSlotMachine() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [reelResults, setReelResults] = useState<[number, number, number]>([0, 0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const chaosItems = [
    { icon: Phone, label: "Missed Call", stat: "47 this month", color: "red" },
    { icon: Users, label: "Cold Lead", stat: "$12,000 lost", color: "orange" },
    { icon: Brain, label: "Forgotten Task", stat: "3 dropped today", color: "purple" },
    { icon: FileText, label: "Late Invoice", stat: "$8,500 unpaid", color: "yellow" },
    { icon: BarChart3, label: "No Data", stat: "Flying blind", color: "neutral" },
  ];

  // Auto-spin when component comes into view
  useEffect(() => {
    if (isInView && !hasSpun) {
      const timer = setTimeout(() => {
        handleSpin();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasSpun]);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Generate random results with staggered timing
    const newResults: [number, number, number] = [
      Math.floor(Math.random() * chaosItems.length),
      Math.floor(Math.random() * chaosItems.length),
      Math.floor(Math.random() * chaosItems.length),
    ];

    // Simulate spinning with delays
    setTimeout(() => {
      setReelResults(prev => [newResults[0], prev[1], prev[2]]);
    }, 1000);
    setTimeout(() => {
      setReelResults(prev => [prev[0], newResults[1], prev[2]]);
    }, 1500);
    setTimeout(() => {
      setReelResults(prev => [prev[0], prev[1], newResults[2]]);
      setIsSpinning(false);
      setHasSpun(true);
    }, 2000);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "red": return { bg: "bg-red-500/20", border: "border-red-500/40", text: "text-red-400", glow: "shadow-red-500/20" };
      case "orange": return { bg: "bg-orange-500/20", border: "border-orange-500/40", text: "text-orange-400", glow: "shadow-orange-500/20" };
      case "purple": return { bg: "bg-purple-500/20", border: "border-purple-500/40", text: "text-purple-400", glow: "shadow-purple-500/20" };
      case "yellow": return { bg: "bg-yellow-500/20", border: "border-yellow-500/40", text: "text-yellow-400", glow: "shadow-yellow-500/20" };
      default: return { bg: "bg-neutral-500/20", border: "border-neutral-500/40", text: "text-neutral-400", glow: "shadow-neutral-500/20" };
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Slot Machine Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Machine Frame */}
        <div className="relative rounded-2xl sm:rounded-3xl border-2 border-white/10 bg-gradient-to-b from-[#1a1a22] to-[#0f0f14] p-4 sm:p-8 md:p-12 overflow-hidden">
          {/* Decorative lights */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 opacity-50" />
          <div className="absolute -top-1 left-1/4 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: "0.3s" }} />
          <div className="absolute -top-1 left-3/4 w-2 h-2 rounded-full bg-red-500 animate-pulse" style={{ animationDelay: "0.6s" }} />

          {/* Title inside machine */}
          <div className="text-center mb-4 sm:mb-8">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-neutral-500 mb-1 sm:mb-2">Daily Business</p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">CHAOS ROULETTE</h3>
          </div>

          {/* Reels Container */}
          <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-8">
            {([0, 1, 2] as const).map((reelIndex) => {
              const item = chaosItems[reelResults[reelIndex]];
              if (!item) return null;
              const colors = getColorClasses(item.color);
              const IconComponent = item.icon;

              return (
                <div
                  key={reelIndex}
                  className="relative"
                >
                  {/* Reel window frame */}
                  <div className="absolute -inset-2 rounded-xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                  {/* Reel content */}
                  <motion.div
                    className={`relative w-20 sm:w-24 md:w-32 h-28 sm:h-32 md:h-40 rounded-lg sm:rounded-xl border-2 ${colors.border} ${colors.bg} flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden`}
                    animate={isSpinning ? {
                      y: [0, -20, 0, 20, 0, -10, 0, 10, 0],
                    } : {}}
                    transition={{
                      duration: 0.3,
                      repeat: isSpinning ? Infinity : 0,
                      delay: reelIndex * 0.1,
                    }}
                  >
                    {/* Spinning blur effect */}
                    {isSpinning && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
                      />
                    )}

                    {/* Icon */}
                    <motion.div
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl ${colors.bg} flex items-center justify-center mb-1 sm:mb-2 shadow-lg ${colors.glow}`}
                      animate={!isSpinning && hasSpun ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3, delay: reelIndex * 0.2 + 0.3 }}
                    >
                      <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${colors.text}`} />
                    </motion.div>

                    {/* Label */}
                    <motion.p
                      className="text-[10px] sm:text-xs md:text-sm font-bold text-white text-center leading-tight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isSpinning ? 0.3 : 1 }}
                    >
                      {item.label}
                    </motion.p>

                    {/* Stat */}
                    <motion.p
                      className={`text-[9px] sm:text-[10px] md:text-xs ${colors.text} text-center mt-0.5 sm:mt-1 font-semibold`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isSpinning ? 0 : 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {item.stat}
                    </motion.p>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Spin Button */}
          <div className="flex justify-center">
            <motion.button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`relative px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg transition-all ${
                isSpinning
                  ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 shadow-lg shadow-red-500/30"
              }`}
              whileHover={!isSpinning ? { scale: 1.05 } : {}}
              whileTap={!isSpinning ? { scale: 0.95 } : {}}
            >
              {isSpinning ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    &#9696;
                  </motion.span>
                  Spinning...
                </span>
              ) : (
                "SPIN THE CHAOS"
              )}
            </motion.button>
          </div>

          {/* Result message */}
          <AnimatePresence>
            {hasSpun && !isSpinning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 sm:mt-6 text-center px-2"
              >
                <p className="text-neutral-400 text-xs sm:text-sm mb-2">Sound familiar? This happens every day without systems.</p>
                <p className="text-red-400 font-semibold text-sm sm:text-base">Spin again to see more problems you&apos;re facing.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Pain points below the machine */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto"
      >
        {chaosItems.map((item, index) => {
          const colors = getColorClasses(item.color);
          const IconComponent = item.icon;

          return (
            <motion.div
              key={index}
              className={`p-4 rounded-xl border ${colors.border} ${colors.bg} text-center`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <IconComponent className={`w-5 h-5 ${colors.text} mx-auto mb-2`} />
              <p className="text-xs font-semibold text-white">{item.label}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

function ScrollZoomImage({
  src,
  alt,
  children
}: {
  src: string;
  alt: string;
  children?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1.15]);

  return (
    <div ref={containerRef} className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a22]">
      <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        <div className="ml-4 flex-1 bg-[#1a1a1a] rounded px-3 py-1 text-xs text-white/40 font-mono">prod.oneapp.today</div>
      </div>
      <div className="overflow-hidden">
        <motion.div style={{ scale }}>
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        </motion.div>
      </div>
      {children}
    </div>
  );
}

export function OneAppPageContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'starter' | 'growth' | 'scale'>('growth');

  const pricingTiers = {
    starter: {
      name: "Starter",
      price: 497,
      description: "Essential business automation",
      features: [
        "Custom Next.js website",
        "AI page builder access",
        "Basic lead capture forms",
        "Mobile-optimized design",
        "Monthly support calls",
      ],
      notIncluded: ["AI voice agents", "Advanced CRM features"],
      popular: false,
    },
    growth: {
      name: "Growth",
      price: 997,
      description: "Full system ownership",
      features: [
        "Everything in Starter",
        "AI voice agent (24/7 calls)",
        "OneApp CRM access",
        "Automated follow-ups",
        "Lead scoring & routing",
        "Priority support",
      ],
      notIncluded: [] as string[],
      popular: true,
    },
    scale: {
      name: "Scale",
      price: 1497,
      description: "Enterprise-level growth",
      features: [
        "Everything in Growth",
        "Multiple AI voice agents",
        "Advanced analytics dashboard",
        "Custom integrations",
        "Dedicated account manager",
        "Quarterly strategy sessions",
      ],
      notIncluded: [] as string[],
      popular: false,
    }
  };

  return (
    <div className="relative bg-[#121218] text-white overflow-hidden noise-bg dark">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/[0.08] backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/oneapp-logo.png"
              alt="OneApp Logo"
              width={280}
              height={70}
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a href="#problem" className="text-sm text-neutral-400 hover:text-white transition-colors">The Problem</a>
            <a href="#journey" className="text-sm text-neutral-400 hover:text-white transition-colors">Your Journey</a>
            <a href="#pricing" className="text-sm text-neutral-400 hover:text-white transition-colors">Pricing</a>
            <a href="#contact" className="text-sm text-neutral-400 hover:text-white transition-colors">Contact</a>
            <MagneticButton
              href="#cta"
              className="px-6 py-2.5 rounded-full text-white font-semibold text-sm transition-colors flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
              }}
              strength={0.35}
            >
              Book a Call
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#problem" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-300">The Problem</a>
                <a href="#journey" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-300">Your Journey</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-300">Pricing</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-300">Contact</a>
                <a
                  href="#cta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-4 px-6 rounded-2xl text-white font-semibold text-center"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  }}
                >
                  Book a Call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - Minimal Centered Design */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
        {/* Subtle radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.15),transparent)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          {/* Headline with Cinematic Text Reveal */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tight leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-6 text-white">
            <TextReveal delay={0.1} staggerDelay={0.12}>
              Automate More.
            </TextReveal>
            <br />
            <TextReveal delay={0.5} staggerDelay={0.12}>
              Manage Less. Grow Faster.
            </TextReveal>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-neutral-400 mb-8 sm:mb-10 max-w-2xl mx-auto px-2"
          >
            We replace scattered tools with one connected system. <span className="text-purple-400">Powered by OneApp AI.</span>
          </motion.p>

          {/* CTA Button with Magnetic Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MagneticButton
              href="#cta"
              className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-[#121218] font-semibold text-sm sm:text-base hover:bg-neutral-200 transition-colors"
              strength={0.4}
            >
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Dashboard Component */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 w-full max-w-6xl mx-auto mt-10 sm:mt-16 px-2 sm:px-4"
        >
          <LeadsDashboard dashboardUrl="oneapp.today" />
        </motion.div>
      </section>

      {/* The Problem Section - Chaos Slot Machine */}
      <section id="problem" className="py-24 md:py-32 px-6 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">The Chaos</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">Most service businesses struggle with a fragmented system that leaks revenue every day.</p>
          </motion.div>

          <ChaosSlotMachine />

          <motion.div {...fadeInUp} className="mt-16 text-center">
            <div className="inline-block px-8 py-4 rounded-2xl bg-red-500/5 border border-red-500/20">
              <p className="text-lg md:text-xl font-semibold text-red-400">
                This isn&apos;t a marketing problem. It&apos;s a systems problem.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Websites Fail Section - Browser Graveyard */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent relative overflow-hidden">
        {/* Fog/mist effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-900/30 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">Why Websites Alone <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">Fail</span></h2>
            <p className="text-xl text-neutral-400 mb-2">Traffic without systems is just expensive noise.</p>
            <p className="text-sm text-neutral-500">Watch what happens to websites without backend systems...</p>
          </motion.div>

          <BrowserGraveyard />

          <motion.div {...fadeInUp} className="mt-20 text-center">
            <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed">
              That&apos;s why most website &quot;redesigns&quot; <span className="text-white font-semibold">don&apos;t move the needle.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Your Journey Section - Introduction */}
      <section id="journey" className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">Your Journey With OneApp</h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">From broken systems to a revenue-generating machine. Here&apos;s exactly how we transform your business in 6 phases.</p>
          </motion.div>
        </div>
      </section>

      {/* Phase 1: Custom Website Build */}
      <section className="py-24 md:py-32 px-6 md:px-8 relative">
        <div className="absolute inset-0 bg-purple-500/5 blur-[120px] rounded-full opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass text-sm text-purple-300 mb-8 border border-purple-500/20">
                <span className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">1</span>
                <span className="font-bold tracking-wider">PHASE ONE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">We Build It. <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">You Own It.</span></h2>
              <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                We craft your website in our AI-powered page builder, then hand you the keys. Need a new landing page? Just ask. Want to update your hero section? One prompt. No more WordPress nightmares or waiting on developers—you&apos;re always one conversation away from your next update.
              </p>
              <div className="space-y-4">
                {[
                  "Blazing-fast Next.js under the hood",
                  "Edit anything with simple AI prompts",
                  "No coding required—ever",
                  "Launch new pages in minutes, not weeks",
                  "Mobile-perfect and SEO-optimized automatically"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              {...fadeInUp}
              className="relative"
            >
              <ScrollZoomImage
                src="/screenshots/siteBuilder-desktop.png"
                alt="AI-Powered Site Builder"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Phase 2: SEO Automation */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              {...fadeInUp}
              className="relative order-2 lg:order-1"
            >
              <ScrollZoomImage
                src="/screenshots/blogGenerator-desktop.png"
                alt="AI Content Management"
              />
              {/* Floating AI badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -left-4 rounded-xl border border-purple-500/30 shadow-xl bg-[#1a1a22] p-3 animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">AI Ready</p>
                    <p className="text-[10px] text-neutral-500">Content Assistant</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div {...fadeInUp} className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass text-sm text-purple-300 mb-8 border border-purple-500/20">
                <span className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">2</span>
                <span className="font-bold tracking-wider">PHASE TWO</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">SEO on <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">Autopilot</span></h2>
              <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                We automate your entire SEO journey. From keyword research to blog posts, jobs pages to landing pages—our AI handles the heavy lifting. Industry-specific traffic tools and PR distribution get you found by the right people, without the grind.
              </p>
              <div className="space-y-4">
                {[
                  "AI-powered keyword research tailored to your market",
                  "Automated blog posts that actually rank",
                  "Jobs pages and landing pages on demand",
                  "Industry-specific traffic tools built in",
                  "PR distribution to boost your authority"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Phase 3: Leads Flow In */}
      <section className="py-24 md:py-32 px-6 md:px-8 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass text-sm text-purple-300 mb-8 border border-purple-500/20">
                <span className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">3</span>
                <span className="font-bold tracking-wider">PHASE THREE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Leads Start <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">Flowing In</span></h2>
              <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                Your new website has smart forms that capture every inquiry and funnel them directly into your OneApp dashboard. No more lost leads. No more manual data entry.
              </p>
              <div className="space-y-4">
                {[
                  "Smart forms that capture all lead details",
                  "Instant notifications when leads come in",
                  "Automatic lead scoring and prioritization",
                  "All leads organized in one central dashboard",
                  "Follow-up sequences triggered automatically"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              {...fadeInUp}
              className="relative"
            >
              <ScrollZoomImage
                src="/screenshots/leads-desktop.png"
                alt="Lead Management Dashboard"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Phase 4: OneApp CRM */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              {...fadeInUp}
              className="relative order-2 lg:order-1"
            >
              <ScrollZoomImage
                src="/screenshots/taskPlanner-calendar-desktop.png"
                alt="OneApp CRM Dashboard"
              />
            </motion.div>
            <motion.div {...fadeInUp} className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass text-sm text-purple-300 mb-8 border border-purple-500/20">
                <span className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">4</span>
                <span className="font-bold tracking-wider">PHASE FOUR</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">OneApp Becomes Your <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">Command Center</span></h2>
              <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                OneApp isn&apos;t just a CRM—it&apos;s the central nervous system for your entire business. Manage leads, track customer interactions, assign tasks, and handle customer service all from one powerful dashboard.
              </p>
              <div className="space-y-4">
                {[
                  "Complete customer history at your fingertips",
                  "Task management with clear ownership",
                  "Automated follow-ups and reminders",
                  "Customer service tickets in one place",
                  "Team collaboration built right in"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Phase 5: AI Agents Answer Calls */}
      <section className="py-24 md:py-32 px-6 md:px-8 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass text-sm text-purple-300 mb-8 border border-purple-500/20">
                <span className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">5</span>
                <span className="font-bold tracking-wider">PHASE FIVE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">AI Agents <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">Answer Your Calls</span></h2>
              <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                Never miss another call. Our AI-powered voice agents handle incoming calls 24/7, qualify leads, answer questions, and book appointments—all while sounding completely natural.
              </p>
              <div className="space-y-4">
                {[
                  "24/7 call answering—no more missed opportunities",
                  "Natural-sounding AI that represents your brand",
                  "Automatic call logging and transcription",
                  "Smart lead qualification on every call",
                  "Instant handoff to your team when needed"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              {...fadeInUp}
              className="relative"
            >
              <ScrollZoomImage
                src="/screenshots/callHistory-desktop.png"
                alt="AI Voice Agents Dashboard"
              />
              {/* Floating call notification */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-4 -right-4 rounded-xl border border-white/10 shadow-xl bg-[#1a1a22] p-3 animate-float"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Call Answered</p>
                    <p className="text-[10px] text-neutral-500">AI Agent Active</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Phase 6: Revenue Increases */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              {...fadeInUp}
              className="relative order-2 lg:order-1"
            >
              <ScrollZoomImage
                src="/screenshots/revenueGrowth-desktop.png"
                alt="Revenue Analytics Dashboard"
              />
              {/* Floating Widget 1 - Total Revenue with Animated Counter */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-4 -left-4 z-20 rounded-2xl border border-green-500/30 shadow-xl bg-[#1a1a22] p-4 animate-float"
                style={{ animationDelay: '0s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">
                      <AnimatedCounter value={1250400} prefix="$" duration={2.5} />
                    </p>
                    <p className="text-[10px] text-green-400 font-semibold">+47% Revenue</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Widget 2 - Total Leads with Animated Counter */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: -20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute top-8 -right-4 z-20 rounded-2xl border border-purple-500/30 shadow-xl bg-[#1a1a22] p-4 animate-float"
                style={{ animationDelay: '0.5s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">
                      <AnimatedCounter value={4500} duration={2} />
                    </p>
                    <p className="text-[10px] text-purple-400 font-semibold">+65% Leads</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Widget 3 - Web Traffic with Animated Counter */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="absolute bottom-20 -left-6 z-20 rounded-2xl border border-purple-500/30 shadow-xl bg-[#1a1a22] p-4 animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">
                      <AnimatedCounter value={120000} duration={2.2} />
                    </p>
                    <p className="text-[10px] text-purple-400 font-semibold">+62% Traffic</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Widget 4 - SEO Ranking */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -right-4 z-20 rounded-2xl border border-yellow-500/30 shadow-xl bg-[#1a1a22] p-4 animate-float"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">Top 3</p>
                    <p className="text-[10px] text-yellow-400 font-semibold">SEO Ranking</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div {...fadeInUp} className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass text-sm text-green-300 mb-8 border border-green-500/20">
                <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">6</span>
                <span className="font-bold tracking-wider">THE RESULT</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Your Revenue <span className="text-green-400">Increases</span></h2>
              <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                With every piece working together—website, leads, calls, CRM, and content—your business becomes a well-oiled machine. No more missed opportunities. No more revenue leaks. Just growth.
              </p>
              <div className="space-y-4">
                {[
                  "Zero missed calls = more closed deals",
                  "Faster lead response = higher conversion rates",
                  "Automated follow-ups = no opportunity left behind",
                  "Clear visibility = smarter business decisions",
                  "Less chaos = more time to scale"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                {...fadeInUp}
                className="mt-10"
              >
                <div className="inline-block px-6 py-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                  <p className="text-lg font-semibold text-green-300">
                    This is how businesses stop leaking revenue and start scaling.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">This Isn&apos;t a Website Project.</h2>
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent mb-12">It&apos;s a Business Upgrade.</p>
            <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl mx-auto">
              Most agencies stop at launch. Most software leaves you to figure it out. We deliver the complete system—website, automation, and ongoing support—so your business actually grows.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-32 px-6 md:px-8 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-400 mb-6">
              <DollarSign className="w-4 h-4" />
              Simple Pricing
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              The <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">Investment</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              One setup fee. One monthly fee. Complete business system ownership.
            </p>
          </motion.div>

          {/* Setup Fee */}
          <motion.div {...fadeInUp} className="mb-16 max-w-xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-3">One-Time Setup</p>
            <div className="text-6xl md:text-7xl font-bold text-white mb-3">$3,500</div>
            <p className="text-lg text-neutral-400 mb-6">Custom website build + system integration</p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-neutral-300">Includes 30-day launch guarantee</span>
            </div>
          </motion.div>

          {/* Tier Selector */}
          <motion.div {...fadeInUp} className="flex justify-center gap-2 mb-8">
            {(['starter', 'growth', 'scale'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTier === tier
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {pricingTiers[tier].name}
                {pricingTiers[tier].popular && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-500 text-white text-xs">Popular</span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {(['starter', 'growth', 'scale'] as const).map((tier, index) => {
              const plan = pricingTiers[tier];
              const isSelected = selectedTier === tier;

              return (
                <motion.div
                  key={tier}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-8 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-white/10 border-purple-500/50 scale-105 shadow-2xl shadow-purple-500/10'
                      : 'glass border-white/5 hover:border-white/20'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-500 text-white text-xs font-bold">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-4xl font-black text-white mb-1">
                      ${plan.price}<span className="text-lg text-neutral-400">/mo</span>
                    </div>
                    <p className="text-sm text-neutral-400">{plan.description}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className="text-neutral-300">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm opacity-50">
                        <XCircle className="w-4 h-4 text-neutral-500 shrink-0" />
                        <span className="text-neutral-500">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <MagneticButton
                    href="#cta"
                    className={`block w-full py-3 rounded-full text-center font-semibold transition-colors ${
                      isSelected
                        ? 'bg-purple-500 text-white hover:bg-purple-400'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    strength={0.3}
                  >
                    Get Started
                  </MagneticButton>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeInUp} className="mt-16 text-center">
            <p className="text-xl text-purple-300 font-bold italic">
              Everything connected. Everything supported.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-24 md:py-32 px-6 md:px-8 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">Who This Is <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">For</span></h2>
            <p className="text-xl text-neutral-400">Strategic systems for ambitious service businesses.</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "High-volume service businesses",
              "Teams tired of juggling manual tasks",
              "Owners who want clarity, not complexity",
              "Businesses ready to scale beyond 7 figures",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-5 p-6 rounded-2xl glass border border-white/5"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                  <CheckCircle2 className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-lg text-white/80 font-medium">{item}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-16 text-center">
            <p className="text-xl text-neutral-400 leading-relaxed">
              If you want things to &quot;just work&quot; — <span className="text-purple-300 font-bold">this is for you.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ecommerce Add-On Section */}
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase mb-6">
              Optional Module
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"><span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">Ecommerce Expansion</span></h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">Selling products? OneApp handles the heavy lifting of modern retail.</p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto"
          >
            {[
              { icon: ShoppingCart, title: "Orders", description: "Centralized order management across all channels." },
              { icon: Package, title: "Inventory", description: "Real-time inventory sync preventing overselling." },
              { icon: Layers, title: "Product Data", description: "Manage complex product data and variants easily." },
              { icon: Globe, title: "Listings", description: "Push listings to marketplaces instantly." },
              { icon: Eye, title: "Visibility", description: "Multi-channel visibility in one dashboard." }
            ].map((item, index) => (
              <motion.div
                key={index}
                {...staggerItem}
                className="p-6 rounded-2xl glass border border-white/5 hover:border-purple-500/20 transition-colors w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="mt-16 text-center">
            <p className="text-lg text-purple-300 font-medium">
              Same platform. Same dashboard. No fragmentation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-brand-500/5 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
              Get in <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed px-2">
              Ready to transform your business? Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.form
            {...fadeInUp}
            className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission
              const formData = new FormData(e.currentTarget);
              console.log('Form submitted:', Object.fromEntries(formData));
              alert('Thank you for your inquiry! We\'ll be in touch soon.');
              e.currentTarget.reset();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                  <User className="w-4 h-4 text-purple-400" />
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                  <Phone className="w-4 h-4 text-purple-400" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                <Mail className="w-4 h-4 text-purple-400" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="john@company.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            {/* Inquiry Reason Field */}
            <div className="space-y-2">
              <label htmlFor="reason" className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                Why are you inquiring?
              </label>
              <textarea
                id="reason"
                name="reason"
                required
                rows={4}
                placeholder="Tell us about your business needs and how we can help..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-white text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
                  boxShadow: '0 20px 50px rgba(168, 85, 247, 0.4)'
                }}
              >
                Send Inquiry
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-500/5 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 tracking-tight leading-tight">
              Let&apos;s Fix the <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">Engine</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
              Book a walkthrough. See exactly where your business is leaking revenue and how we can plug the holes.
            </p>

            <MagneticButton
              href="#contact"
              className="group inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 rounded-full font-bold text-white text-base sm:text-lg md:text-xl lg:text-2xl transition-colors"
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
                boxShadow: '0 20px 50px rgba(168, 85, 247, 0.4)'
              }}
              strength={0.25}
            >
              Get Your Walkthrough
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Image
              src="/oneapp-logo.png"
              alt="OneApp Logo"
              width={200}
              height={50}
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
          </Link>
          <p className="text-neutral-500 text-xs sm:text-sm font-medium text-center">
            © {new Date().getFullYear()} OneApp. Precision-engineered growth.
          </p>
        </div>
      </footer>
    </div>
  );
}
