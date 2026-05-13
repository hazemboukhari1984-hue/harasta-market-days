import Types   "../types/bookings";
import Common  "../types/common";
import Principal "mo:core/Principal";

module {
  /// Calculates the rental price in SYP based on store type and duration.
  public func calcPrice(storeType : Types.StoreType, duration : Types.DurationPackage) : Nat {
    switch (storeType, duration) {
      case (#small, #oneHour)    { 30_000  };
      case (#small, #twoHours)   { 50_000  };
      case (#small, #threeHours) { 60_000  };
      case (#small, #fourHours)  { 70_000  };
      case (#small, #fullDay)    { 85_000  };
      case (#small, #weekly)     { 500_000 };
      case (#large, #oneHour)    { 50_000  };
      case (#large, #twoHours)   { 90_000  };
      case (#large, #threeHours) { 120_000 };
      case (#large, #fourHours)  { 140_000 };
      case (#large, #fullDay)    { 150_000 };
      case (#large, #weekly)     { 900_000 };
    };
  };

  /// Generates a unique booking reference from id and timestamp.
  public func makeRef(id : Nat, ts : Common.Timestamp) : Common.BookingRef {
    // ts is nanoseconds since epoch — convert to seconds then extract date
    let secs : Int = ts / 1_000_000_000;
    // Days since Unix epoch (1970-01-01)
    let days : Int = secs / 86_400;
    // Gregorian calendar proleptic approximation
    let z : Int = days + 719_468;
    let era : Int = (if (z >= 0) z else z - 146_096) / 146_097;
    let doe : Int = z - era * 146_097;
    let yoe : Int = (doe - doe / 1460 + doe / 36_524 - doe / 146_096) / 365;
    let y : Int = yoe + era * 400;
    let doy : Int = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp : Int = (5 * doy + 2) / 153;
    let d : Int = doy - (153 * mp + 2) / 5 + 1;
    let m : Int = mp + (if (mp < 10) 3 else -9);
    let yr : Int = y + (if (m <= 2) 1 else 0);
    let pad2 = func(n : Int) : Text {
      let t = n.toText();
      if (t.size() < 2) { "0" # t } else { t };
    };
    let seqStr = func(n : Nat) : Text {
      let t = n.toText();
      let sz = t.size();
      if (sz >= 3) { t }
      else if (sz == 2) { "0" # t }
      else { "00" # t };
    };
    "HMD-" # yr.toText() # pad2(m) # pad2(d) # "-" # seqStr(id + 1);
  };

  /// Builds a Booking record from a request, assigned id, and timestamp.
  public func buildBooking(
    id      : Nat,
    req     : Types.BookingRequest,
    ts      : Common.Timestamp,
  ) : Types.Booking {
    let DEPOSIT : Nat = 100_000;
    let rental  = calcPrice(req.storeType, req.duration);
    {
      id;
      ref           = makeRef(id, ts);
      merchantName  = req.merchantName;
      nationalId    = req.nationalId;
      bookingDate   = req.bookingDate;
      storeType     = req.storeType;
      duration      = req.duration;
      rentalPrice   = rental;
      deposit       = DEPOSIT;
      totalPrice    = rental + DEPOSIT;
      paymentMethod = req.paymentMethod;
      createdAt     = ts;
    };
  };

  /// Returns true if the caller is authorised as admin.
  public func isAdmin(caller : Principal, admins : [Principal], controllers : [Principal]) : Bool {
    if (admins.find(func(p) { Principal.equal(p, caller) }) != null) return true;
    controllers.find(func(p) { Principal.equal(p, caller) }) != null;
  };
};
