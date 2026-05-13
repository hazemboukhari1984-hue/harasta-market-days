import List          "mo:core/List";
import BookingsApi   "mixins/bookings-api";
import BTypes        "types/bookings";

actor {
  let bookings  = List.empty<BTypes.Booking>();
  let state     = { var nextId = 0 };
  let adminList = List.empty<Principal>();

  include BookingsApi(bookings, state, adminList);
};
