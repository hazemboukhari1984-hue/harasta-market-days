import List         "mo:core/List";
import Types        "../types/bookings";
import Common       "../types/common";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import BookingsLib "../lib/bookings";

mixin (
  bookings   : List.List<Types.Booking>,
  state      : { var nextId : Nat },
  adminList  : List.List<Principal>,
) {
  /// Submit a new booking. Returns the unique booking reference.
  public shared ({ caller }) func submitBooking(req : Types.BookingRequest) : async Common.BookingRef {
    // Validate
    if (req.merchantName.isEmpty())  Runtime.trap("merchantName required");
    if (req.nationalId.isEmpty())    Runtime.trap("nationalId required");
    if (req.bookingDate.size() != 10) Runtime.trap("bookingDate must be YYYY-MM-DD");
    let ts  = Time.now();
    let id  = state.nextId;
    state.nextId += 1;
    let booking = BookingsLib.buildBooking(id, req, ts);
    bookings.add(booking);
    booking.ref;
  };

  /// Retrieve a single booking by its reference string.
  public query func getBooking(ref : Common.BookingRef) : async ?Types.Booking {
    bookings.find(func(b) { b.ref == ref });
  };

  /// Return all bookings — admin only.
  public shared ({ caller }) func getAllBookings() : async [Types.Booking] {
    if (not caller.isController()) Runtime.trap("Unauthorized");
    bookings.toArray();
  };

  /// Return all bookings for a given date string (YYYY-MM-DD).
  public query func getBookingsByDate(date : Text) : async [Types.Booking] {
    bookings.filter(func(b) { b.bookingDate == date }).toArray();
  };

  /// Return total number of bookings.
  public query func getBookingCount() : async Nat {
    bookings.size();
  };
};
