import { Spicy } from "@/types";
import { z } from "zod";

export const mealSchema = z.object({
  name: z.string().min(3, "Name is too short"),
  description: z.string().min(10, "Description is too short"),
  price: z.coerce.number().min(1, "Price is required"),
  discountPrice: z.coerce.number().optional().nullable(),
  isAvailable: z.boolean().default(true),
  isBestseller: z.boolean().default(false),
  isVeg: z.boolean().default(false),
  spiciness: z.nativeEnum(Spicy).default(Spicy.MEDIUM),
  categoryId: z.string().min(1, "Category is required"),
  // providerId: z.string().min(1, "Provider ID is required"),
  prepTime: z.coerce.number().optional().nullable(),
  calories: z.coerce.number().optional().nullable(),
});

// এই টাইপটিই হবে আপনার ফর্মের আসল টাইপ
export type MealFormValues = z.infer<typeof mealSchema>;
