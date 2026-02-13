import { getProviderOwnMealAction } from "@/actions/provider.action";
import MealListPage from "@/components/modules/Dashboard/provider/mealsList";

export default async function Meals() {
  const fetchProviderOwnMeal = await getProviderOwnMealAction();

  const mealsData = fetchProviderOwnMeal.data || [];
  console.log(mealsData);

  return (
    <div>
      <MealListPage initialMeals={mealsData} />
    </div>
  );
}
