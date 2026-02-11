"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const SignUpBanner = () => {
  return (
    <section className="relative w-full h-[160px] sm:h-[180px] lg:h-[200px] mt-6 overflow-hidden rounded-2xl shadow-sm group">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background/signbanner.jpg"
          alt="Signup Banner"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-12">
        <div className="flex flex-col items-start gap-3 max-w-xs sm:max-w-md md:max-w-lg">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight drop-shadow-md">
            Sign up for <span className="text-yellow-400">free delivery</span>{" "}
            <br className="hidden sm:block" /> on your first order
          </h2>

          <Link href="/signup">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-5 py-2 md:px-7 md:py-2.5 rounded-xl shadow-md transition-all active:scale-95 text-xs md:text-sm flex items-center gap-2">
              Sign Up Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpBanner;
