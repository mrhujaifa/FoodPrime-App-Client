import MealPageContainer from "@/components/layouts/MealPageContainer";
import { mealServices } from "@/services/meal.services";
import { MealsProviderProfile } from "@/types";

export default async function PrimeMeal() {
  const response = await mealServices.getAllMeals();

  const mealsData: MealsProviderProfile[] =
    response.success && Array.isArray(response.data) ? response.data : [];

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-0 mt-35">
        <MealPageContainer initialMeals={mealsData} />
      </div>
    </div>
  );
}
