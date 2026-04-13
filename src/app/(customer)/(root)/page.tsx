import MealPageContainer from "@/components/layouts/MealPageContainer";
import { mealServices } from "@/services/meal.services";
import { MealsProviderProfile } from "@/types";
import { providerServices } from "@/services/provider.services";

const toArray = <T,>(value: T[] | unknown): T[] =>
  Array.isArray(value) ? value : [];

export default async function PrimeMeal() {
  // Fetching meals data from the server
  const mealsData = toArray<MealsProviderProfile>(
    await mealServices.getAllMeals(),
  );
  // Fetching all provider profiles from the server
  const allProvider = toArray(await providerServices.getAllProviderProfile());

  // Fetching meal categories (if needed for filters or display)
  const categories = toArray(await mealServices.getMealCategories());

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-0 mt-35">
        <MealPageContainer
          initialMeals={mealsData}
          allProviders={allProvider}
          categories={categories}
        />
      </div>
    </div>
  );
}
