export type Language = "ar" | "en";

export { DurationPackage, StoreType, PaymentMethod } from "@/backend";
export type { Booking, BookingRequest, BookingRef } from "@/backend";

export interface PricingTier {
  duration: string;
  labelAr: string;
  labelEn: string;
  smallPrice: number;
  largePrice: number;
  isHighlight?: boolean;
}

export interface FeatureItem {
  icon: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}
