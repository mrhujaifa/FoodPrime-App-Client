import AllRestaurants from "@/components/modules/Restaurant/AllRestaurants";
import { FilterSidebarUI } from "@/components/layouts/FilterSidebar";
import SignUpBanner from "@/components/layouts/signUpBanner";
import Hero from "@/components/modules/Home/HeroSection";
import { mealServices } from "@/services/meal.services";
import { MealsProviderProfile } from "@/types";
import { providerServices } from "@/services/provider.services";
import { useSession } from "@/hooks/useSession";
import { userService } from "@/services/user.services";

export default async function PrimeMeal() {
  const response = await mealServices.getAllMeals();

  // const session = await userService.getSession();

  // const providerId = session.data.user.id;

  // const providerId = response.data;

  // console.log(providerId);

  // const provider = await providerServices.getSingleProviderProfile(providerId);

  // console.log("provider-----", provider.data);

  const mealsData: MealsProviderProfile[] = Array.isArray(response.data)
    ? response.data
    : [];

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-35">
        {/* ১. উপরে হিরো সেকশন থাকতে পারে */}
        {/* <Hero /> */}

        {/* ২. মেইন লেআউট কন্টেইনার (Flexbox ব্যবহার করে) */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* বাম পাশে ফিল্টার সাইডবার (ডেক্সটপে ফিক্সড উইডথ) */}
          <div className="w-full md:w-72 flex-shrink-0">
            <FilterSidebarUI />
          </div>

          {/* ডান পাশে ফিল্টার করা কন্টেন্ট বা খাবারের লিস্ট */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Available Meals
              </h1>
              <span className="text-sm text-gray-500 font-medium">
                Showing 12 results
              </span>
            </div>

            <SignUpBanner />
            <div>
              <AllRestaurants mealsData={mealsData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
