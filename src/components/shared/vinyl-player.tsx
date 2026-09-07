"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Disc3, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FavoriteTrack {
  title: string;
  artist: string;
  album: string;
  year?: string;
  coverUrl: string;
  audioUrl?: string;
  spotifyUrl?: string;
}

const defaultTrack: FavoriteTrack = {
  title: "About You",
  artist: "The 1975",
  album: "Being Funny In A Foreign Language",
  year: "2022",
  coverUrl: "https://i.scdn.co/image/ab67616d0000b27300702474f8e0e2b6155d48e3",
  audioUrl: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3",
  spotifyUrl: "https://open.spotify.com/track/3hEfpBHxgieRLz4t3kLNEg",
};

export interface VinylPlayerProps {
  track?: FavoriteTrack;
  className?: string;
}

export function VinylPlayer({
  track = defaultTrack,
  className,
}: VinylPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!progressBarRef.current || !audioRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn(
        "fixed bottom-5 left-5 z-40 font-mono select-none transition-all duration-300",
        className
      )}
    >
      <audio
        ref={audioRef}
        src={track.audioUrl}
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Mode Minimalis (Pill Floating) */}
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            type="button"
            initial={{ scale: 0.85, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 10 }}
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/90 text-zinc-100 border border-zinc-800 shadow-2xl backdrop-blur-md hover:border-zinc-700 transition-all text-[11px]"
          >
            <div className={cn("relative w-3.5 h-3.5 rounded-full overflow-hidden border border-zinc-700", isPlaying && "animate-[spin_3s_linear_infinite]")}>
              <Image src={track.coverUrl} alt={track.title} fill className="object-cover" unoptimized />
            </div>
            <span className="font-semibold text-zinc-200">{track.title}</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400">{track.artist}</span>
            <ChevronUp className="w-3 h-3 text-zinc-500 ml-0.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mode Cardboard Sleeve + Vinyl (Lebih Compact & Simple) */}
      {!isMinimized && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex items-center group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={togglePlay}
          title="Klik untuk Play / Pause"
        >
          <div className="relative flex items-center">
            {/* 💿 1. VINYL RECORD DISC DENGAN FOTO ALBUM */}
            <motion.div
              animate={{
                x: isPlaying ? 64 : isHovered ? 52 : 36, // Posisi compact keluar samping
                rotate: isPlaying ? 360 : 0,
              }}
              transition={{
                x: { type: "spring", stiffness: 190, damping: 22 },
                rotate: isPlaying
                  ? { repeat: Infinity, ease: "linear", duration: 4.5 }
                  : { duration: 0.5 },
              }}
              className="absolute left-4 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-xl z-0 pointer-events-none"
              style={{
                background: "#0c0c0e",
                boxShadow: "0 8px 24px -4px rgba(0, 0, 0, 0.75), inset 0 0 8px rgba(0,0,0,0.9)",
              }}
            >
              {/* Alur Piringan Hitam (Concentric Vinyl Grooves) */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at center, transparent 38%, rgba(0,0,0,0.9) 39%, transparent 40%),
                    repeating-radial-gradient(circle at center, #141416, #141416 1.2px, #08080a 1.6px, #08080a 2.4px),
                    conic-gradient(from 45deg at 50% 50%, rgba(255,255,255,0.15) 0deg, transparent 60deg, rgba(255,255,255,0.12) 180deg, transparent 240deg, rgba(255,255,255,0.15) 360deg)
                  `,
                  mixBlendMode: "screen",
                  opacity: 0.9,
                }}
              />

              {/* 🖼️ FOTO ALBUM DI TENGAH PIRINGAN HITAM */}
              <div className="relative w-[44%] h-[44%] rounded-full overflow-hidden border border-zinc-700/80 shadow-md flex items-center justify-center z-10">
                <Image
                  src={track.coverUrl}
                  alt={track.album}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Spindle hole di tengah album */}
                <div className="absolute w-2 h-2 rounded-full bg-zinc-950 border border-zinc-400/90 shadow-inner z-20" />
                {/* Subtle glass sheen */}
                <div className="absolute inset-0 bg-linear-to-tr from-black/25 via-transparent to-white/20 pointer-events-none" />
              </div>
            </motion.div>

            {/* 📁 2. SLEEVE KARTON MINIMALIS & COMPACT */}
            <div
              className={cn(
                "relative z-10 w-32 h-32 sm:w-36 sm:h-36 rounded-md bg-[#f6f6f4] text-zinc-950 p-3 sm:p-3.5 flex flex-col justify-between shadow-[0_16px_36px_-8px_rgba(0,0,0,0.7)] border border-zinc-300/70 overflow-hidden",
                "after:absolute after:right-0 after:top-0 after:bottom-0 after:w-2 after:bg-linear-to-l after:from-black/30 after:to-transparent after:pointer-events-none"
              )}
            >
              {/* Garis Aksen & Teks Minimalis Mockup */}
              <div>
                <div className="w-6 h-0.5 bg-zinc-950 mb-1.5" />
                <h4 className="text-[11px] sm:text-xs font-black tracking-tight leading-tight uppercase text-zinc-950 truncate">
                  {track.title}
                </h4>
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider truncate">
                  {track.artist}
                </p>
              </div>

              {/* Status Tengah: Equalizer jika playing */}
              <div className="my-auto py-0.5 flex items-center justify-between">
                <span className="text-[7.5px] text-zinc-400 uppercase tracking-widest truncate max-w-[70px]">
                  {track.album}
                </span>

                {isPlaying && (
                  <div className="flex items-end gap-[1.5px] h-2 shrink-0">
                    <span className="w-[1.5px] h-full bg-zinc-950 rounded-full animate-[bounce_0.8s_infinite_100ms]" />
                    <span className="w-[1.5px] h-2/3 bg-zinc-950 rounded-full animate-[bounce_0.8s_infinite_300ms]" />
                    <span className="w-[1.5px] h-4/5 bg-zinc-950 rounded-full animate-[bounce_0.8s_infinite_200ms]" />
                  </div>
                )}
              </div>

              {/* Kontrol Bawah: Progress Line & Tombol */}
              <div className="pt-1 border-t border-zinc-300/80">
                {/* Thin Scrubber Progress */}
                <div
                  ref={progressBarRef}
                  onClick={handleSeek}
                  className="relative w-full h-1 bg-zinc-300 rounded-full cursor-pointer overflow-hidden mb-1.5"
                >
                  <div
                    className="h-full bg-zinc-950 rounded-full transition-all duration-100 ease-linear"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[8px] text-zinc-600 font-mono">
                  {/* Play & Mute */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="w-5 h-5 rounded-full bg-zinc-950 text-white flex items-center justify-center hover:bg-zinc-800 transition-colors shadow-sm active:scale-95"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="w-2 h-2 fill-current" />
                      ) : (
                        <Play className="w-2 h-2 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="text-zinc-500 hover:text-zinc-950 transition-colors p-0.5"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? (
                        <VolumeX className="w-2.5 h-2.5" />
                      ) : (
                        <Volume2 className="w-2.5 h-2.5" />
                      )}
                    </button>
                  </div>

                  {/* Durasi & Tombol Minimize */}
                  <div className="flex items-center gap-1">
                    <span className="text-[7.5px] text-zinc-500">
                      {formatTime(currentTime)}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMinimized(true);
                      }}
                      className="text-zinc-400 hover:text-zinc-900 transition-colors"
                      title="Perkecil player"
                    >
                      <ChevronDown className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default VinylPlayer;
