import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface BookingRequest {
    merchantName: string;
    duration: DurationPackage;
    paymentMethod: PaymentMethod;
    nationalId: string;
    bookingDate: string;
    storeType: StoreType;
}
export type BookingRef = string;
export interface Booking {
    id: bigint;
    ref: BookingRef;
    merchantName: string;
    duration: DurationPackage;
    paymentMethod: PaymentMethod;
    rentalPrice: bigint;
    createdAt: Timestamp;
    deposit: bigint;
    nationalId: string;
    bookingDate: string;
    storeType: StoreType;
    totalPrice: bigint;
}
export enum DurationPackage {
    fourHours = "fourHours",
    oneHour = "oneHour",
    twoHours = "twoHours",
    fullDay = "fullDay",
    threeHours = "threeHours",
    weekly = "weekly"
}
export enum PaymentMethod {
    cash = "cash",
    electronic = "electronic"
}
export enum StoreType {
    large = "large",
    small = "small"
}
export interface backendInterface {
    getAllBookings(): Promise<Array<Booking>>;
    getBooking(ref: BookingRef): Promise<Booking | null>;
    getBookingCount(): Promise<bigint>;
    getBookingsByDate(date: string): Promise<Array<Booking>>;
    submitBooking(req: BookingRequest): Promise<BookingRef>;
}
