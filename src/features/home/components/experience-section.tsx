"use client";

import HatchedPattern from "@/components/ui/hatched-pattern";
import { ExperienceCard } from "./experience-card";

const dummyExperiences = [
  {
    company: "PT Custompedia Creative Group",
    role: "AI Engineer Intern",
    employmentType: "Internship",
    startDate: "07.2026",
    endDate: "Present",
    duration: "2m",
    descriptions: [
      "Developed an internal ERP with AI-powered modules for recruitment, EMS, scheduling, & workflow automation.",
      "Translated business requirements into functional specifications, workflows, and test scenarios to support ERP development.",
      "Conducted defect analysis and collaborated with developers to troubleshoot issues and ensure successful implementation of ERP functionalities.",
      "Reduced production error rates from 88% to 2%, significantly improving system reliability by optimizing asynchronous processing and Cloudflare R2 storage workflows.",
      "Coordinated with 20+ stakeholders across teams to integrate AI agents and automation workflows into internal business operations, ensuring successful adoption and implementation.",
    ],
    skills: ["Next.js", "NestJS", "PostgreSQL", "AI Agents", "Cloudflare R2"],
    defaultOpen: true,
  },
];

export function ExperienceSection() {
  return (
    <>
      <section className="w-full text-zinc-300 font-mono text-sm px-5 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-zinc-200 tracking-tight">
            Experience
          </h2>
          <span className="text-xs text-zinc-500 font-mono">
            {dummyExperiences.length} Roles
          </span>
        </div>

        <div className="space-y-6">
          {dummyExperiences.map((exp, idx) => (
            <ExperienceCard key={idx} {...exp} />
          ))}
        </div>
      </section>
      <HatchedPattern />
    </>
  );
}

export default ExperienceSection;
