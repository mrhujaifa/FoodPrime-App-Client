import Navbar from "@/components/layouts/Navbar";
import { Search } from "lucide-react";
import { ProfileHeader } from "@/components/modules/Restaurant/RestaurantHeader";
import { MenuCard } from "@/components/modules/Restaurant/MenuCard";
import { CartSidebar } from "@/components/modules/Restaurant/CartSidebar";
import { providerServices } from "@/services/provider.services";
import Image from "next/image";
import { mealServices } from "@/services/meal.services";
import { CategoryTabs } from "@/components/modules/Restaurant/CategoryTabs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantProfile = async ({ params }: PageProps) => {
  const paramsId = await params;
  const restaurantSlugId = paramsId.slug;

  const restaurant =
    await providerServices.getSingleProviderProfile(restaurantSlugId);
  const provider = restaurant.data;

  const providerMeals = provider?.meals;

  const categoriesNav = await mealServices.getMealCategories();

  const categories = categoriesNav.data;

  return (
    <div className="max-w-350 mx-auto  font-sans">
      <Navbar />

      <div className="relative h-[300px] md:h-[350px] lg:h-[400px] rounded-xl w-full bg-gray-200 mt-20 group overflow-hidden">
        {provider?.coverUrl ? (
          <Image
            src={provider.coverUrl}
            alt={`${provider?.businessName || "Restaurant"} Cover`}
            fill
            priority
            className="object"
          />
        ) : (
          // Fallback image jodi coverUrl na thake
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-400 font-medium italic">
              No cover image available
            </p>
          </div>
        )}

        {/* Aesthetic Gradient Overlay - Eta text er visibility baray */}
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-12">
        {/* 2. Restaurant Profile Header */}
        <ProfileHeader provider={provider} />

        {/* 3. Sticky Category & Search */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 mb-8 rounded-b-xl px-6 flex items-center justify-between">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            <CategoryTabs categories={categories} />
          </div>
          <div className="hidden md:flex items-center bg-gray-50 px-4 py-2 border border-gray-100 rounded-lg">
            <Search size={18} className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search dish..."
              className="bg-transparent outline-none text-sm w-48"
            />
          </div>
        </div>

        {/* 4. Main Content Layout */}
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Menu Items */}
          <div className="flex-1 space-y-8">
            <h2 className="text-2xl font-black text-[#1a1a1a] flex items-center gap-2">
              <span className="w-2 h-8 bg-yellow-300 inline-block"></span>{" "}
              {/* {activeTab} */}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {providerMeals?.map((meal) => (
                <MenuCard meal={meal} key={meal.id} />
              ))}
            </div>
          </div>

          {/* Sidebar Cart */}
          <div className="w-full xl:w-[400px]">
            <CartSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
