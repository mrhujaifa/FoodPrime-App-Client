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

export type SpicinessLevel = "MILD" | "MEDIUM" | "SPICY" | "EXTRA_SPICY";

export interface Provider {
  id: string;
  businessName: string;
  rating: number;
  estimatedDeliveryTime: string;
}

export interface MealsProvider {
  id: string;
  name: string;
  description: string;
  price: string | number;
  discountPrice?: string | number;
  imageUrl: string;
  isAvailable: boolean;
  isVeg: boolean;
  spiciness: SpicinessLevel;
  isBestseller: boolean;
  prepTime: number;
  calories: number;
  categoryId: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
  provider: Provider; // Nested provider object
}

// Service Response er jonno common type
// export interface ServiceResponse<T> {
//   success: boolean;
//   data?: T;
//   message: string;
//   errors?: any;
// }

// ১. Provider টাইপ
export interface ProviderProfile {
  id: string;
  businessName: string;
  description?: string | null;
  address?: string;
  logoUrl?: string | null;
  coverUrl?: string | null;
  isOpen?: boolean;
  isVerified?: boolean;
  rating: number; // API তে 0 দেখাচ্ছে
  totalReviews?: number;
  estimatedDeliveryTime?: string | null;
  deliveryFee?: string | number; // Decimal টাইপ অনেক সময় string হয়ে আসে
}

// ২. Count টাইপ (Prisma _count)
export interface MealCount {
  orderItems: number;
  rivew: number; // আপনার স্কিমায় rivew বানানটি এমন আছে
}

export interface Category {
  id: string;
  name: string;
  image?: string | null;
}

// ৩. মেইন Meal বা MealsProvider টাইপ
export interface MealsProviderProfile {
  id: string;
  name: string;
  description: string;
  businessName: string;
  price: string | number; // API তে "100" string হিসেবে আসছে
  discountPrice?: string | number | null; // API তে "20" string হিসেবে আসছে
  imageUrl: string;
  coverUrl?: string;
  isAvailable: boolean;
  isVeg: boolean;
  spiciness: "NONE" | "MILD" | "MEDIUM" | "HOT" | "EXTRA_HOT";
  isBestseller: boolean;
  prepTime?: number | null;
  calories?: number | null;
  categoryId: string;
  providerId: string;
  category?: Category;
  meals: Meal[];
  createdAt: string; // ISO Date string
  updatedAt: string;
  provider: ProviderProfile; // রিলেশন ডেটা
  _count?: MealCount;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface IMeal {
  id: string;
  name: string;
  description: string;
  price: number | string;
  discountPrice?: number | string | null;
  imageUrl?: string | null;
  isAvailable: boolean;
  isVeg: boolean;
  spiciness: Spicy;
  isBestseller: boolean;
  prepTime?: number | null;
  calories?: number | null;
  categoryId: string;
  providerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UpdateMealPayload = {
  name?: string;
  description?: string;
  price?: number | string;
  discountPrice?: number | string | null;
  imageUrl?: string | null;
  isAvailable?: boolean;
  isVeg?: boolean;
  spiciness?: Spicy;
  isBestseller?: boolean;
  prepTime?: number | string;
  calories?: number | string;
  categoryId?: string;
};
