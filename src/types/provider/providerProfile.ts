export enum CuisineType {
  BENGALI = "BENGALI",
  INDIAN = "INDIAN",
  ITALIAN = "ITALIAN",
  CHINESE = "CHINESE",
  FAST_FOOD = "FAST_FOOD",
  THAI = "THAI",
  MEXICAN = "MEXICAN",
  ARABIC = "ARABIC",
  CONTINENTAL = "CONTINENTAL",
  DESSERT = "DESSERT",
  OTHERS = "OTHERS",
}

export interface IProviderProfile {
  id: string;
  userId: string;
  businessName: string;
  description?: string | null;
  address: string;
  logoUrl?: string | null;
  coverUrl?: string | null;
  isOpen: boolean;
  isVerified: boolean;
  rating?: number;
  totalReviews: number;
  cuisineType?: CuisineType;
  // Frontend-e Decimal ke number hisebe handle kora best practice
  deliveryFee: number;
  estimatedDeliveryTime?: string | null;
  createdAt: Date | string; // API theke string ashle string, naile Date
  updatedAt: Date | string;
}

// Form-er data capture korar jonno amra eibhabe Omit use korte pari
export type ICreateProviderProfile = Omit<
  IProviderProfile,
  | "id"
  | "isVerified"
  | "isOpen"
  | "rating"
  | "totalReviews"
  | "createdAt"
  | "updatedAt"
>;

// type for profile profile page
export enum Spicy {
  NONE = "NONE",
  MILD = "MILD",
  MEDIUM = "MEDIUM",
  HOT = "HOT",
  EXTRA_HOT = "EXTRA_HOT",
}

export interface IReview {
  id: string;
  rating: number;
  comment: string | null;
  parentId: string | null;
  customerId: string;
  mealId: string;
  createdAt: string;
  updatedAt: string;
  replies?: IReview[];
}

export interface ICategory {
  id: string;
  name: string;
  image?: string;
}

export interface IMeal {
  id: string;
  name: string;
  description: string;
  price: string | number; // API theke string ashe, Prisma e Decimal
  discountPrice: string | number | null;
  imageUrl: string | null;
  isAvailable: boolean;
  isVeg: boolean;
  spiciness: Spicy;
  isBestseller: boolean;
  prepTime: number | null;
  calories: number | null;
  categoryId: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
  category?: ICategory;
  rivew?: IReview[]; // Prisma model e 'rivew' spelling e ache tai setai rakhlam
}

export interface IProviderProfileType {
  id: string;
  userId: string;
  businessName: string;
  username: string;
  description: string | null;
  address: string;
  logoUrl: string;
  coverUrl: string | null;
  isOpen: boolean;
  isVerified: boolean;
  rating: number;
  totalReviews: number;
  cuisineType: CuisineType;
  deliveryFee: string | number;
  estimatedDeliveryTime: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    email: string;
  };
  meals?: IMeal[];
}
