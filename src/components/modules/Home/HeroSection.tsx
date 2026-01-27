"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MoveRight, Leaf, Clock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const HERO_CONTENT = {
  title: {
    regular: "Healthy Meals",
    highlight: "Delivered Daily.",
  },
  description:
    "Experience the joy of chef-prepared meals using farm-fresh ingredients delivered straight to your doorstep.",
  features: [
    { icon: Leaf, label: "100% Organic" },
    { icon: Clock, label: "Fast Delivery" },
    { icon: ShieldCheck, label: "Safe Case" },
  ],
  actions: [
    { label: "Start Your Order", variant: "default" as const, icon: true },
    { label: "Explore Menu", variant: "outline" as const, icon: false },
  ],
  stats: {
    count: "8,000+",
    label: "Active Members",
    subLabel: "Joining the healthy revolution",
  },
};

const Hero = () => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-black flex items-center lg:mt-8">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: `url('/images/heroBanner.webp')` }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" /> */}
      </div>

      <div className="container relative mx-auto px-6 md:px-12">
        <div className="max-w-[500px] space-y-7">
          {/* Minimalist Features - Dot Separated Look */}
          <div className="flex flex-wrap items-center gap-4 border-l-2 border-emerald-500 pl-4">
            {HERO_CONTENT.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <feature.icon className="size-3.5 text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>

          {/* Headline - Balanced Typography */}
          <div className="space-y-1">
            <h1 className="text-4xl font-light tracking-tight text-white/90 sm:text-5xl lg:text-6xl">
              {HERO_CONTENT.title.regular}
            </h1>
            <h1 className="text-5xl font-black tracking-tighter text-white sm:text-6xl lg:text-7xl leading-none">
              <span className="text-emerald-500 italic font-serif">
                {HERO_CONTENT.title.highlight}
              </span>
            </h1>
          </div>

          {/* Description - Focused Width */}
          <p className="max-w-[420px] text-sm leading-relaxed text-gray-400 md:text-base opacity-90 font-medium">
            {HERO_CONTENT.description}
          </p>

          {/* Premium Designer Buttons */}
          <div className="flex items-center gap-4 pt-4">
            {HERO_CONTENT.actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                className={cn(
                  "h-12 px-8 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-none",
                  action.variant === "default" &&
                    "bg-emerald-600 text-white rounded-sm hover:bg-emerald-500 hover:-translate-y-1 shadow-[0_10px_20px_rgba(16,185,129,0.2)]",
                  action.variant === "outline" &&
                    "border-white/20 bg-transparent rounded-sm text-white hover:bg-white hover:text-black",
                )}
              >
                {action.label}
                {action.icon && <MoveRight className="ml-2 size-4" />}
              </Button>
            ))}
          </div>

          {/* Social Proof - Clean & Integrated */}
          <div className="flex items-center gap-4 pt-8 opacity-80">
            <div className="flex -space-x-3">
              {[1, 2, 3, , 4].map((i) => (
                <div
                  key={i}
                  className="size-9 rounded-full border-2 border-black bg-neutral-900 ring-1 ring-emerald-500/20"
                >
                  <img
                    src={`https://i.pravatar.cc/150?u=daily-dish-${i}`}
                    alt="Customer"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="flex flex-col">
              <span className="text-sm font-black text-white leading-none">
                {HERO_CONTENT.stats.count} Members
              </span>
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter mt-1">
                Trust our taste
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
