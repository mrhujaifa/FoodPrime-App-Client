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
  price: string;
  discountPrice: string | null;
  imageUrl: string | null;
  isAvailable: boolean;
  isVeg: boolean;
  spiciness: Spicy;
  isBestseller: boolean;
  prepTime: number | null;
  calories: number | null;
  categoryId: string;
  providerId: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  mealId: string;
  quantity: number;
  price: string; // Current price at the time of order
  meal: Meal; // Nested Meal object
}

export enum OrderStatus {
  PLACED = "PLACED",
  REJECTED = "REJECTED",
  PREPARING = "PREPARING",
  READY = "READY",
  ON_THE_WAY = "ON_THE_WAY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentType {
  COD = "COD",
  ONLINE = "ONLINE",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}

export interface Order {
  id: string;
  name: string;
  email: string;
  orderNumber: string;
  totalPrice: number | string; // Prisma Decimal converts to string/number in JSON
  deliveryAddress: string;
  phoneNumber: string;
  status: OrderStatus;
  paymentMethod: PaymentType;
  paymentStatus: PaymentStatus;
  estimatedArrival?: Date | string | null;
  orderNotes?: string | null;
  customerId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
