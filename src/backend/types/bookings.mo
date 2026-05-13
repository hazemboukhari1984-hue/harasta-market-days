import Types "common";

module {
  public type StoreType = { #small; #large };

  public type DurationPackage = {
    #oneHour;
    #twoHours;
    #threeHours;
    #fourHours;
    #fullDay;
    #weekly;
  };

  public type PaymentMethod = { #cash; #electronic };

  public type Booking = {
    id          : Nat;
    ref         : Types.BookingRef;
    merchantName: Text;
    nationalId  : Text;
    bookingDate : Text;
    storeType   : StoreType;
    duration    : DurationPackage;
    rentalPrice : Nat;
    deposit     : Nat;
    totalPrice  : Nat;
    paymentMethod : PaymentMethod;
    createdAt   : Types.Timestamp;
  };

  public type BookingRequest = {
    merchantName  : Text;
    nationalId    : Text;
    bookingDate   : Text;
    storeType     : StoreType;
    duration      : DurationPackage;
    paymentMethod : PaymentMethod;
  };
};
