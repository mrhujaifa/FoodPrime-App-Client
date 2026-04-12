import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { IProviderProfileType } from "@/types/provider/providerProfile";
import Link from "next/link";

interface AllProviderProps {
  brands: IProviderProfileType[];
}

const FALLBACK_BRAND_LOGO = "/logos/logo5.png";

export default function TopBrandsSection({ brands }: AllProviderProps) {
  return (
    <section className="relative z-0 w-full py-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-[26px] font-bold text-[#1f1f1f]">Top Brands</h1>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              aria-label="Previous brands"
              className="top-brands-prev flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 shadow-sm shadow-slate-200/70 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-md hover:shadow-yellow-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5 rotate-180 text-slate-700 transition-colors" />
            </button>
            <button
              type="button"
              aria-label="Next brands"
              className="top-brands-next flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 shadow-sm shadow-slate-200/70 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-md hover:shadow-yellow-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5 text-slate-700 transition-colors" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={18}
          slidesPerView={1.2}
          navigation={{
            nextEl: ".top-brands-next",
            prevEl: ".top-brands-prev",
          }}
          breakpoints={{
            480: { slidesPerView: 1.4 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.6 },
            1024: { slidesPerView: 3.4 },
            1280: { slidesPerView: 4 },
          }}
          className="topBrandsSwiper w-full min-w-0"
        >
          {brands.map((brand) => {
            const logoSrc =
              typeof brand.logoUrl === "string" && brand.logoUrl.trim()
                ? brand.logoUrl
                : FALLBACK_BRAND_LOGO;

            return (
              <SwiperSlide key={brand.id}>
                <Link href={`/restaurant/${brand.id}`}>
                  <div className="group flex min-h-[120px] cursor-pointer items-center gap-4 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 shadow-sm shadow-slate-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-200 hover:shadow-lg hover:shadow-yellow-100/50">
                    <div className="flex h-[96px] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white">
                      <Image
                        src={logoSrc}
                        alt={brand.businessName}
                        width={80}
                        height={80}
                        sizes="80px"
                        className="h-[76px] w-[76px] object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-lg font-semibold leading-[1.25] text-slate-900">
                        {brand.businessName}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {brand.cuisineType}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
