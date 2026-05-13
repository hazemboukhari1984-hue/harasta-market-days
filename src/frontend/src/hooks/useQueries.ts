import { createActor } from "@/backend";
import type { Booking, BookingRequest } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllBookings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBookingsByDate(date: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Booking[]>({
    queryKey: ["bookings", "date", date],
    queryFn: async () => {
      if (!actor || !date) return [];
      return actor.getBookingsByDate(date);
    },
    enabled: !!actor && !isFetching && !!date,
  });
}

export function useGetBookingCount() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<bigint>({
    queryKey: ["bookingCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getBookingCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBooking(ref: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Booking | null>({
    queryKey: ["booking", ref],
    queryFn: async () => {
      if (!actor || !ref) return null;
      return actor.getBooking(ref);
    },
    enabled: !!actor && !isFetching && !!ref,
  });
}

export function useSubmitBooking() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<string, Error, BookingRequest>({
    mutationFn: async (req: BookingRequest) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitBooking(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["bookingCount"] });
    },
  });
}
