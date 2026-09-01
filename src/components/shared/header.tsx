import React from "react";
import { MapPin, Globe, Mail } from "lucide-react";
import { VscVerifiedFilled } from "react-icons/vsc";
import Image from "next/image";
import { AsciiBanner } from "./ascii-banner";
import { Separator } from "../ui/separator";

// GitHub Icon
function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// LinkedIn Icon
function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0-.01-3.37 1.68 1.68 0 0 0 .01 3.37m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

// Discord Icon
function DiscordIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

// Medium Icon
function MediumIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

// Hugging Face / Robot Icon
function HuggingFaceIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 0 0-7.07 17.07A10 10 0 1 0 12 2zm-3.5 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-7.2 6.5a.75.75 0 0 1 1.05-.15A4.5 4.5 0 0 0 12 17.5a4.5 4.5 0 0 0 2.65-.95.75.75 0 1 1 .9 1.2A6 6 0 0 1 12 19a6 6 0 0 1-3.55-1.25.75.75 0 0 1-.15-1.25z" />
    </svg>
  );
}

export function Header() {
  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/zickrian",
      icon: <GithubIcon className="w-4.5 h-4.5" />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/zickrian",
      icon: <LinkedinIcon className="w-4.5 h-4.5" />,
    },
    {
      name: "Discord",
      href: "#",
      icon: <DiscordIcon className="w-4.5 h-4.5" />,
    },
    {
      name: "Medium",
      href: "#",
      icon: <MediumIcon className="w-4.5 h-4.5" />,
    },
    {
      name: "Email",
      href: "mailto:contact@zickrian.dev",
      icon: <Mail className="w-4.5 h-4.5" />,
    },
    {
      name: "AI / HuggingFace",
      href: "#",
      icon: <HuggingFaceIcon className="w-4.5 h-4.5" />,
    },
  ];

  return (
    <header className="w-full bg-background text-foreground flex flex-col font-mono selection:bg-secondary border-b border-border">
      {/* 1. Full-width Banner Area with Dynamic ASCII Matrix Shimmer */}
      <div className="relative w-full h-44 sm:h-56 md:h-64 lg:h-72 border-b border-border bg-muted overflow-hidden">
        <AsciiBanner src="/images/banner.jpeg" alt="Profile Banner" />
      </div>

      {/* 2. Profile Info Section */}
      <div className="px-5 sm:px-8 pb-6">
        {/* Avatar (Overlapping the Banner on the bottom-left, cleanly above scanlines) */}
        <div className="relative z-30 -mt-14 sm:-mt-20 mb-4 flex items-end justify-between">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-background bg-background shadow-2xl shrink-0">
            <Image
              src="/images/profile.jpeg"
              alt="Profile Avatar"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Name & Role */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
              Rizky Ardiansyah
            </h1>
            <VscVerifiedFilled size={24} className="text-blue-400 shrink-0" />
          </div>
          <Separator className="my-2" />
          <div className="text-xs sm:text-sm text-muted-foreground">
            Software Engineer
          </div>
          <Separator className="my-2" />
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal mb-4">
          I’m a Software Engineer and Data Scientist based in Indonesia,
          specializing in modern full-stack applications, reliable backend
          systems, machine learning, and data-driven solutions. I build
          practical end-to-end products that turn complex ideas and data into
          intuitive experiences designed to solve real-world problems and create
          meaningful impact.
        </p>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-muted-foreground mb-5">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
            <span>Indonesia</span>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
            <a
              href="https://zickrian.dev"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              zickrian.dev
            </a>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-border pt-4">
          {/* Social Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="w-10 h-10 rounded-xl bg-secondary border border-border hover:bg-accent text-secondary-foreground hover:text-accent-foreground flex items-center justify-center transition-all duration-150 shadow-sm"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
