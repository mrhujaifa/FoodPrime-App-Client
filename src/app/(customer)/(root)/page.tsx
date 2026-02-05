import MealPageContainer from "@/components/layouts/MealPageContainer";
import { mealServices } from "@/services/meal.services";
import { MealsProviderProfile } from "@/types";

export default async function PrimeMeal() {
  // ১. সার্ভার সাইড ডেটা ফেচিং
  const response = await mealServices.getAllMeals();

  // ২. ডেটা ভ্যালিডেশন
  const mealsData: MealsProviderProfile[] =
    response.success && Array.isArray(response.data) ? response.data : [];

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-0 mt-35">
        {/* Client Component এ ডেটা পাস করা হচ্ছে */}
        <MealPageContainer initialMeals={mealsData} />
      </div>
    </div>
  );
}
