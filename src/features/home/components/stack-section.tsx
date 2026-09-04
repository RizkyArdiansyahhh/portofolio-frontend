"use client";

import React from "react";
import HatchedPattern from "@/components/ui/hatched-pattern";
import {
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiKeras,
  SiScikitlearn,
  SiOpencv,
  SiPandas,
  SiNumpy,
  SiStreamlit,
  SiHuggingface,
  SiLangchain,
  SiAnthropic,
  SiGooglegemini,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiBun,
  SiMysql,
  SiCplusplus,
  SiFastapi,
  SiPostgresql,
  SiDocker,
  SiGithub,
  SiPrometheus,
  SiGrafana,
  SiMlflow,
} from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import { VscAzure, VscVscode } from "react-icons/vsc";
import { TbChartHistogram } from "react-icons/tb";
import { type IconType } from "react-icons";

export interface StackItem {
  name: string;
  icon: IconType;
  color: string;
}

export interface StackCategory {
  id: string;
  name: string;
  items: StackItem[];
}

const stackCategories: StackCategory[] = [
  {
    id: "01",
    name: "AI / ML",
    items: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "Keras", icon: SiKeras, color: "#D00000" },
      { name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
      { name: "Pandas", icon: SiPandas, color: "#E70488" },
      { name: "NumPy", icon: SiNumpy, color: "#4DABCF" },
      { name: "Matplotlib", icon: TbChartHistogram, color: "#11557C" },
      { name: "MLflow", icon: SiMlflow, color: "#0194E2" },
      { name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B" },
      { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E" },
      { name: "LangChain", icon: SiLangchain, color: "#22C55E" },
      { name: "Claude", icon: SiAnthropic, color: "#D97706" },
      { name: "ChatGPT", icon: RiOpenaiFill, color: "#10A37F" },
      { name: "Gemini", icon: SiGooglegemini, color: "#4E82EE" },
    ],
  },
  {
    id: "02",
    name: "Frontend",
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    id: "03",
    name: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Bun", icon: SiBun, color: "#FBF0DF" },
      { name: "SQL", icon: SiMysql, color: "#4479A1" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    ],
  },
  {
    id: "04",
    name: "DevOps / Cloud",
    items: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Microsoft Azure", icon: VscAzure, color: "#0078D4" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Prometheus", icon: SiPrometheus, color: "#E6522C" },
      { name: "Grafana", icon: SiGrafana, color: "#F46800" },
      { name: "Visual Studio Code", icon: VscVscode, color: "#007ACC" },
    ],
  },
];

export function StackSection() {
  return (
    <>
      <section className="w-full text-zinc-300 font-mono text-sm px-5 py-6 space-y-6">
        {/* 🏷️ Header: Stack */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-zinc-200 tracking-tight">
            Stack
          </h2>
        </div>

        {/* 🧱 Categories List */}
        <div className="w-full border-t border-zinc-800/60">
          {stackCategories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col sm:flex-row border-b border-zinc-800/60"
            >
              {/* Kolom Kiri: 01 AI / ML dengan Garis Putus-putus (Dashed) */}
              <div className="sm:w-44 shrink-0 px-4 py-4 sm:border-r border-dashed border-zinc-800/80 flex items-start">
                <span className="text-xs sm:text-sm font-mono text-zinc-400 font-medium">
                  {category.id} {category.name}
                </span>
              </div>

              {/* Kolom Kanan: Badges / Pills dengan Brand Color saat Hover */}
              <div className="flex-1 p-4 flex flex-wrap gap-2 items-center">
                {category.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      style={{ "--brand": item.color } as React.CSSProperties}
                      className="group inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800/90 text-xs font-mono text-zinc-300 cursor-default"
                    >
                      <Icon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-(--brand) shrink-0" />
                      <span className="group-hover:text-white">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <HatchedPattern />
    </>
  );
}

export default StackSection;
