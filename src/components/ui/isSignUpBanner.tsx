"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface SignedInBannerProps {
  userName?: string;
}

export default function SignedInBanner({
  userName = "there",
}: SignedInBannerProps) {
  return (
    <section className="group relative mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-slate-900 shadow-xl">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background/isSignuped.jpg"
          alt="Welcome Banner"
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
      </div>

      {/* Content - Reduced Padding and Height */}
      <div className="relative z-10 flex min-h-[140px] flex-col justify-center px-6 py-5 sm:min-h-[160px] sm:px-10">
        <div className="max-w-xl">
          {/* Compact Badge */}
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-yellow-400 backdrop-blur-md">
            <Sparkles size={10} className="animate-pulse" />
            Signed In
          </div>

          {/* Title - Slightly Smaller for Compact Look */}
          <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl md:text-3xl">
            Welcome back, <span className="text-yellow-400">{userName}</span>!
          </h2>

          <p className="mt-1 max-w-sm text-xs leading-relaxed text-gray-300 sm:text-sm">
            Ready to order your favorite meal?
          </p>

          {/* Action Button - More Compact */}
          <div className="mt-4">
            <Link
              href="/meals"
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-yellow-400 px-6 py-2 text-xs font-bold text-black transition-all hover:bg-yellow-300 active:scale-95"
            >
              <span className="relative z-10">Order Now</span>
              <ArrowRight
                size={14}
                className="relative z-10 transition-transform group-hover/btn:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
