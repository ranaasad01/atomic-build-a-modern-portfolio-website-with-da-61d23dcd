"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import {
  APP_NAME,
  APP_TAGLINE,
  APP_EMAIL,
  CTA_PRIMARY,
} from "@/lib/data";
import { ArrowRight, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, Star, ExternalLink, Code, Layout, Terminal, Sparkles, CheckCircle, Download, ArrowUp, Heart, Eye, Activity } from 'lucide-react';

// ─── Inline Data ────────────────────────────────────────────────────────────

const projects = [
  {
    slug: "luminary-ui",
    title: "Luminary UI",
    tagline: "Component library for modern web apps",
    description:
      "A fully accessible, themeable React component library with 80+ components, dark mode support, and a Figma design system. Used by 2,000+ developers worldwide.",
    tags: ["React", "TypeScript", "Storybook", "Radix UI"],
    image: "https://i.ebayimg.com/images/g/E4gAAOSwDsFhZ8tK/s-l1200.jpg",
    liveUrl: "https://luminary-ui.dev",
    githubUrl: "https://github.com",
    featured: true,
    stars: 2400,
    color: "from-indigo-500 to-purple-600",
  },
  {
    slug: "flowboard",
    title: "Flowboard",
    tagline: "Real-time collaborative kanban board",
    description:
      "A Notion-meets-Trello productivity app with real-time collaboration, drag-and-drop, rich text editing, and team workspaces. Built with Next.js and Supabase.",
    tags: ["Next.js", "Supabase", "Tailwind", "Framer Motion"],
    image: "https://media.licdn.com/dms/image/v2/D560BAQF-iDNCHS_zhw/company-logo_200_200/company-logo_200_200/0/1737560966920/prismanalyticsorg_logo?e=2147483647&v=beta&t=HwHTEepa7WHPdq8kCJBVqWuiDzyZVMVu5QhhysMm5zo",
    liveUrl: "https://flowboard.app",
    githubUrl: "https://github.com",
    featured: true,
    stars: 1800,
    color: "from-cyan-500 to-blue-600",
  },
  {
    slug: "prism-analytics",
    title: "Prism Analytics",
    tagline: "Privacy-first web analytics dashboard",
    description:
      "A lightweight, cookie-free analytics platform that gives you actionable insights without compromising user privacy. GDPR compliant out of the box.",
    tags: ["Go", "PostgreSQL", "React", "Recharts"],
    image: "https://www.novacommercecorp.com/wp-content/uploads/2018/09/NovaCommerce-Corporation-Front-scaled.jpg",
    liveUrl: "https://prism.analytics",
    githubUrl: "https://github.com",
    featured: true,
    stars: 3100,
    color: "from-emerald-500 to-teal-600",
  },
  {
    slug: "nova-commerce",
    title: "Nova Commerce",
    tagline: "Headless e-commerce storefront",
    description:
      "A blazing-fast headless storefront built on Next.js 14 with App Router, Shopify Storefront API, and edge-rendered product pages.",
    tags: ["Next.js", "Shopify", "GraphQL", "Vercel"],
    image: "https://www.novacommercecorp.com/wp-content/uploads/2018/09/NovaCommerce-Corporation-Front-scaled.jpg",
    liveUrl: "https://nova-commerce.vercel.app",
    githubUrl: "https://github.com",
    featured: false,
    stars: 940,
    color: "from-orange-500 to-rose-600",
  },
];

const skills = [
  { name: "React / Next.js", level: 96, category: "frontend" as const },
  { name: "TypeScript", level: 93, category: "frontend" as const },
  { name: "Tailwind CSS", level: 95, category: "frontend" as const },
  { name: "Framer Motion", level: 88, category: "frontend" as const },
  { name: "Node.js", level: 90, category: "backend" as const },
  { name: "PostgreSQL", level: 84, category: "backend" as const },
  { name: "Go", level: 76, category: "backend" as const },
  { name: "GraphQL", level: 82, category: "backend" as const },
  { name: "Figma", level: 89, category: "design" as const },
  { name: "Docker", level: 80, category: "tools" as const },
  { name: "Git / CI/CD", level: 92, category: "tools" as const },
  { name: "Vercel / AWS", level: 85, category: "tools" as const },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO at Verve Labs",
    avatar: "https://www.docker.com/app/uploads/2025/05/DD-hiroko-2320x1456.png",
    text: "Alex delivered our design system in record time. The attention to detail, accessibility, and documentation quality was exceptional. Our dev team's velocity doubled.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Rivera",
    role: "Founder at Stackflow",
    avatar: "http://tinabangel.com/wp-content/uploads/2015/04/MARCUS-RIVERA.png",
    text: "Working with Alex felt like having a senior engineer and a product designer in one. The Flowboard MVP we built together attracted our first 500 users in a week.",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Lead Engineer at Driftly",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    text: "Alex's code is clean, well-tested, and a joy to maintain. The analytics dashboard they built handles millions of events daily without breaking a sweat.",
    rating: 5,
  },
];

const stats = [
  { label: "Projects Shipped", value: "40+", icon: Activity },
  { label: "Happy Clients", value: "28", icon: Heart },
  { label: "GitHub Stars", value: "8.2k", icon: Star },
  { label: "Years Experience", value: "7", icon: Sparkles },
];

const services = [
  {
    icon: Layout,
    title: "UI / UX Design",
    description:
      "Pixel-perfect interfaces grounded in user research. From wireframes to high-fidelity Figma prototypes that developers love to implement.",
    highlights: ["Design Systems", "Figma Prototyping", "Accessibility Audits"],
    color: "from-indigo-500/20 to-purple-500/10",
    border: "border-indigo-500/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: Code,
    title: "Frontend Engineering",
    description:
      "Performant, accessible React & Next.js applications with smooth animations, responsive layouts, and rock-solid TypeScript foundations.",
    highlights: ["React / Next.js 14", "TypeScript", "Framer Motion"],
    color: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: Terminal,
    title: "Full-Stack Development",
    description:
      "End-to-end product development — REST & GraphQL APIs, database design, auth, real-time features, and cloud deployment on Vercel or AWS.",
    highlights: ["Node.js / Go APIs", "PostgreSQL", "Supabase / AWS"],
    color: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
];

const categoryColors: Record<string, string> = {
  frontend: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
  backend: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  design: "bg-pink-500/15 text-pink-300 border-pink-500/25",
  tools: "bg-amber-500/15 text-amber-300 border-amber-500/25",
};

const skillCategories = ["frontend", "backend", "design", "tools"] as const;
type SkillCategory = (typeof skillCategories)[number];

// ─── Sub-components (inline) ─────────────────────────────────────────────────

function SkillBar({ name, level, category }: { name: string; level: number; category: string }) {
  return (
    <motion.div variants={fadeInUp} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/80">{name}</span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[category] ?? "bg-white/10 text-white/50 border-white/10"}`}
        >
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${
            category === "frontend"
              ? "from-indigo-500 to-purple-500"
              : category === "backend"
              ? "from-emerald-500 to-teal-500"
              : category === "design"
              ? "from-pink-500 to-rose-500"
              : "from-amber-500 to-orange-500"
          }`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        />
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/4 border border-white/8 hover:border-white/16 transition-colors duration-300 shadow-xl shadow-black/20"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-white/5 to-white/2">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30`} />
        {/* Stars badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs text-white/80">
          <Star size={11} className="text-amber-400 fill-amber-400" />
          {(project.stars / 1000).toFixed(1)}k
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm text-white/50 mt-0.5">{project.tagline}</p>
        </div>
        <p className="text-sm text-white/60 leading-relaxed flex-1">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-white/6 border border-white/10 text-white/55"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-1">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Eye size={13} />
              Live Demo
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 text-xs font-medium text-white/40 hover:text-white/70 transition-colors"
            >
              <Github size={13} />
              Source
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSkillTab, setActiveSkillTab] = useState<SkillCategory>("frontend");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const filteredSkills = skills.filter((s) => s.category === activeSkillTab);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setContactForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSent(true);
    setContactForm({ name: "", email: "", message: "" });
  }

  const motionProps = shouldReduceMotion
    ? {}
    : { variants: fadeInUp, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
      >
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/12 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-600/6 rounded-full blur-[100px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Available for freelance work
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08]">
                <span className="text-white">Hi, I'm </span>
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {APP_NAME}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/50 font-light tracking-wide">
                {APP_TAGLINE}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed"
            >
              I craft high-performance web applications and design systems that delight users and
              scale with your business. From pixel-perfect UIs to robust backend APIs — I ship
              products end-to-end.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href={CTA_PRIMARY.href}
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(99,102,241,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all duration-200"
              >
                {CTA_PRIMARY.label}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/6 border border-white/12 text-white/80 hover:text-white hover:bg-white/10 font-semibold text-sm transition-all duration-200"
              >
                <Mail size={16} />
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Social proof row */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-6 pt-4"
            >
              {[
                { icon: Github, label: "GitHub", href: "https://github.com" },
                { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white/30 hover:text-white/70 transition-colors duration-200"
                >
                  <s.icon size={20} />
                </motion.a>
              ))}
              <span className="w-px h-5 bg-white/10" />
              <a
                href={`mailto:${APP_EMAIL}`}
                className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200"
              >
                {APP_EMAIL}
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-white/20 tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-y border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/4 via-transparent to-purple-600/4 pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-1">
                  <stat.icon size={18} />
                </div>
                <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0">
                <img
                  src="https://media.licdn.com/dms/image/v2/C5603AQE-oMdEA4-lZg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516522176575?e=2147483647&v=beta&t=NNza9NbD-soKscrNPIBTk-qTQ2z583NAZI6yUgYwXZ0"
                  alt="Alex Morgan — Full-Stack Developer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <p className="text-sm font-semibold text-white">Open to opportunities</p>
                      <p className="text-xs text-white/50">Freelance & full-time roles</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-purple-500/8 rounded-full blur-2xl pointer-events-none" />
            </motion.div>

            {/* Text side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                  About Me
                </span>
                <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white leading-tight">
                  Turning ideas into{" "}
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    digital reality
                  </span>
                </h2>
              </motion.div>

              <motion.p variants={fadeInUp} className="text-white/60 leading-relaxed text-base">
                I'm a full-stack developer and designer based in San Francisco with 7 years of
                experience building products that people love. I specialize in React ecosystems,
                design systems, and developer tooling — but I'm equally comfortable architecting
                a Go microservice or designing a brand identity in Figma.
              </motion.p>

              <motion.p variants={fadeInUp} className="text-white/60 leading-relaxed text-base">
                Previously at <span className="text-white font-medium">Vercel</span>,{" "}
                <span className="text-white font-medium">Linear</span>, and{" "}
                <span className="text-white font-medium">Stripe</span>. Now I work independently
                with startups and scale-ups who care deeply about craft, performance, and
                accessibility.
              </motion.p>

              <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className={`rounded-xl p-4 bg-gradient-to-br ${service.color} border ${service.border} space-y-2`}
                  >
                    <service.icon size={18} className={service.iconColor} />
                    <p className="text-sm font-semibold text-white">{service.title}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-2">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20"
                >
                  Work with me
                  <ArrowRight size={15} />
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/6 border border-white/12 text-white/70 hover:text-white font-semibold text-sm transition-colors"
                >
                  <Download size={15} />
                  Resume
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.015]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...motionProps}
            className="text-center space-y-4 mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Skills & Expertise
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              My{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                tech stack
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-base">
              Seven years of hands-on experience across the full stack — from design tokens to
              database indexes.
            </p>
          </motion.div>

          {/* Category tabs */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {skillCategories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveSkillTab(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 border ${
                  activeSkillTab === cat
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/8"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Skill bars */}
          <motion.div
            key={activeSkillTab}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {filteredSkills.map((skill) => (
              <SkillBar key={skill.name} {...skill} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...motionProps}
            className="text-center space-y-4 mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              What I Do
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Services I{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                offer
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-base">
              Whether you need a polished UI, a scalable API, or a complete product — I've got
              you covered.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`rounded-2xl p-7 bg-gradient-to-br ${service.color} border ${service.border} space-y-5 group cursor-default`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-white/5 border ${service.border} flex items-center justify-center ${service.iconColor}`}
                >
                  <service.icon size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{service.description}</p>
                </div>
                <ul className="space-y-2">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle size={13} className={service.iconColor} />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.015]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...motionProps}
            className="text-center space-y-4 mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Portfolio
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Selected{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                projects
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-base">
              A curated selection of work I'm proud of — spanning design systems, SaaS products,
              and open-source tools.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/6 border border-white/12 text-white/70 hover:text-white font-semibold text-sm transition-all duration-200"
            >
              <Github size={16} />
              View all on GitHub
              <ExternalLink size={13} className="opacity-50" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/6 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...motionProps}
            className="text-center space-y-4 mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Testimonials
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              What clients{" "}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                say
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl p-7 bg-white/4 border border-white/8 hover:border-white/14 transition-colors duration-300 space-y-5"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-white/65 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.015]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...motionProps}
            className="text-center space-y-4 mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Contact
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Let's build something{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                great
              </span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto text-base">
              Have a project in mind? I'd love to hear about it. Send me a message and I'll get
              back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-3xl bg-white/4 border border-white/8 p-8 md:p-10"
          >
            {formSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Message sent!</h3>
                <p className="text-white/50 text-sm">
                  Thanks for reaching out. I'll be in touch within 24 hours.
                </p>
                <motion.button
                  onClick={() => setFormSent(false)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-white/8 border border-white/12 text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  Send another
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={handleFormChange}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={handleFormChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={handleFormChange}
                    placeholder="Tell me about your project — what you're building, your timeline, and how I can help..."
                    className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200 resize-none"
                  />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <p className="text-xs text-white/30">
                    Or email directly:{" "}
                    <a href={`mailto:${APP_EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                      {APP_EMAIL}
                    </a>
                  </p>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(99,102,241,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 transition-all duration-200"
                  >
                    Send Message
                    <ArrowRight size={15} />
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}