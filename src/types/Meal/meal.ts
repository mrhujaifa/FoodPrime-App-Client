export enum Spicy {
  NONE = "NONE",
  MILD = "MILD",
  MEDIUM = "MEDIUM",
  HOT = "HOT",
  EXTRA_HOT = "EXTRA_HOT",
}
export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  imageUrl: string | null;
  isAvailable: boolean;
  isVeg: boolean;
  spiciness: Spicy;
  isBestseller: boolean;
  prepTime: number | null;
  calories: number | null;
  categoryId: string;
  providerId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
export interface CreateMealRequest {
  name: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  isAvailable?: boolean;
  isVeg?: boolean;
  spiciness?: Spicy;
  categoryId: string;
  providerId: string;
  prepTime?: number | null;
  calories?: number | null;
}

export interface MealFormData {
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  imageUrl: string;
  isAvailable: boolean;
  isVeg: boolean;
  spiciness: Spicy;
  isBestseller: boolean;
  prepTime: number | null;
  calories: number | null;
  categoryId: string;
  providerId: string;
}
