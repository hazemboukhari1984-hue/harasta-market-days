import type { backendInterface, Booking, DurationPackage, PaymentMethod, StoreType } from "../backend";

const sampleBookings: Booking[] = [
  {
    id: BigInt(1),
    ref: "BK-2026-001",
    merchantName: "أحمد محمد الحسن",
    duration: "fullDay" as unknown as DurationPackage,
    paymentMethod: "cash" as unknown as PaymentMethod,
    rentalPrice: BigInt(85000),
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    deposit: BigInt(100000),
    nationalId: "12345678",
    bookingDate: "2026-05-15",
    storeType: "small" as unknown as StoreType,
    totalPrice: BigInt(185000),
  },
  {
    id: BigInt(2),
    ref: "BK-2026-002",
    merchantName: "سمير عبد الرحمن",
    duration: "weekly" as unknown as DurationPackage,
    paymentMethod: "electronic" as unknown as PaymentMethod,
    rentalPrice: BigInt(900000),
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    deposit: BigInt(100000),
    nationalId: "87654321",
    bookingDate: "2026-05-13",
    storeType: "large" as unknown as StoreType,
    totalPrice: BigInt(1000000),
  },
];

export const mockBackend: backendInterface = {
  getAllBookings: async () => sampleBookings,
  getBooking: async (ref) => sampleBookings.find((b) => b.ref === ref) ?? null,
  getBookingCount: async () => BigInt(sampleBookings.length),
  getBookingsByDate: async (date) => sampleBookings.filter((b) => b.bookingDate === date),
  submitBooking: async () => "BK-2026-003",
};
