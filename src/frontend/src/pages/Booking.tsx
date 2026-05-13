import { DurationPackage, PaymentMethod, StoreType } from "@/backend";
import { QrCodeDisplay } from "@/components/QrCodeDisplay";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/language-context";
import { useSubmitBooking } from "@/hooks/useQueries";
import { useState } from "react";
import { toast } from "sonner";

const DURATION_OPTIONS = [
  { value: DurationPackage.oneHour, labelKey: "dur1h" },
  { value: DurationPackage.twoHours, labelKey: "dur2h" },
  { value: DurationPackage.threeHours, labelKey: "dur3h" },
  { value: DurationPackage.fourHours, labelKey: "dur4h" },
  { value: DurationPackage.fullDay, labelKey: "durDay" },
  { value: DurationPackage.weekly, labelKey: "durWeek" },
] as const;

const SMALL_PRICES: Record<string, number> = {
  [DurationPackage.oneHour]: 30000,
  [DurationPackage.twoHours]: 50000,
  [DurationPackage.threeHours]: 60000,
  [DurationPackage.fourHours]: 70000,
  [DurationPackage.fullDay]: 85000,
  [DurationPackage.weekly]: 500000,
};

const LARGE_PRICES: Record<string, number> = {
  [DurationPackage.oneHour]: 50000,
  [DurationPackage.twoHours]: 90000,
  [DurationPackage.threeHours]: 120000,
  [DurationPackage.fourHours]: 140000,
  [DurationPackage.fullDay]: 150000,
  [DurationPackage.weekly]: 900000,
};

const DEPOSIT = 100000;

export default function Booking() {
  const { t, isRTL } = useLanguage();
  const { mutateAsync, isPending } = useSubmitBooking();

  const [merchantName, setMerchantName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [storeType, setStoreType] = useState<StoreType>(StoreType.small);
  const [duration, setDuration] = useState<DurationPackage>(
    DurationPackage.oneHour,
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.cash,
  );
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const priceMap = storeType === StoreType.small ? SMALL_PRICES : LARGE_PRICES;
  const rentalPrice = priceMap[duration] ?? 0;
  const totalPrice = rentalPrice + DEPOSIT;

  function validate() {
    const e: Record<string, string> = {};
    if (!merchantName.trim()) e.merchantName = t("required");
    if (!nationalId.trim()) e.nationalId = t("required");
    if (!bookingDate) e.bookingDate = t("required");
    if (!termsAccepted)
      e.terms = isRTL ? "يجب الموافقة على الشروط" : "You must accept the terms";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      const ref = await mutateAsync({
        merchantName: merchantName.trim(),
        nationalId: nationalId.trim(),
        bookingDate,
        storeType,
        duration,
        paymentMethod,
      });
      setSuccessRef(ref);
      toast.success(t("bookingSuccess"));
    } catch {
      toast.error(t("error"));
    }
  }

  if (successRef) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
        <div
          className="bg-card border border-primary/40 rounded-2xl p-8 max-w-md w-full text-center space-y-6"
          data-ocid="booking.success_state"
        >
          <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            {t("bookingSuccess")}
          </h2>

          {/* QR Code */}
          <div className="bg-background rounded-xl p-5 border border-border/40 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t("qrTitle")}
            </p>
            <QrCodeDisplay
              value={successRef}
              label={t("qrScanHint")}
              size={200}
              showButtons={true}
            />
            <p className="font-mono text-base font-bold text-primary">
              {successRef}
            </p>
          </div>

          <div className="border-t border-border/40 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("rentalPrice")}</span>
              <span className="font-semibold text-foreground">
                {rentalPrice.toLocaleString()} {t("currency")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("deposit")}</span>
              <span className="font-semibold text-foreground">
                {DEPOSIT.toLocaleString()} {t("currency")}
              </span>
            </div>
            <div className="flex justify-between border-t border-border/40 pt-2">
              <span className="font-bold text-foreground">
                {t("totalPrice")}
              </span>
              <span className="font-bold text-primary text-lg">
                {totalPrice.toLocaleString()} {t("currency")}
              </span>
            </div>
          </div>
          <Button
            onClick={() => setSuccessRef(null)}
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/10"
            data-ocid="booking.new_booking_button"
          >
            {isRTL ? "حجز آخر" : "New Booking"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Page header */}
      <section
        className="bg-card border-b border-border/40 py-12 px-4 text-center"
        data-ocid="booking.header_section"
      >
        <h1 className="font-display text-4xl font-bold text-foreground">
          {t("bookingTitle")}
        </h1>
        <div
          className="w-16 h-0.5 bg-primary mx-auto mt-4"
          aria-hidden="true"
        />
        <p className="text-muted-foreground mt-3">{t("bookingSubtitle")}</p>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border/60 rounded-2xl p-8 space-y-6"
          data-ocid="booking.form"
        >
          {/* Merchant Name */}
          <div className="space-y-2">
            <Label
              htmlFor="merchantName"
              className="text-foreground font-medium"
            >
              {t("fieldMerchantName")}
            </Label>
            <Input
              id="merchantName"
              value={merchantName}
              onChange={(e) => setMerchantName(e.target.value)}
              className="bg-secondary border-input text-foreground"
              dir={isRTL ? "rtl" : "ltr"}
              data-ocid="booking.merchant_name_input"
            />
            {errors.merchantName && (
              <p
                className="text-destructive text-xs"
                data-ocid="booking.merchant_name_field_error"
              >
                {errors.merchantName}
              </p>
            )}
          </div>

          {/* National ID */}
          <div className="space-y-2">
            <Label htmlFor="nationalId" className="text-foreground font-medium">
              {t("fieldNationalId")}
            </Label>
            <Input
              id="nationalId"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              className="bg-secondary border-input text-foreground"
              dir="ltr"
              data-ocid="booking.national_id_input"
            />
            {errors.nationalId && (
              <p
                className="text-destructive text-xs"
                data-ocid="booking.national_id_field_error"
              >
                {errors.nationalId}
              </p>
            )}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label
              htmlFor="bookingDate"
              className="text-foreground font-medium"
            >
              {t("fieldBookingDate")}
            </Label>
            <Input
              id="bookingDate"
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="bg-secondary border-input text-foreground"
              dir="ltr"
              data-ocid="booking.date_input"
            />
            {errors.bookingDate && (
              <p
                className="text-destructive text-xs"
                data-ocid="booking.date_field_error"
              >
                {errors.bookingDate}
              </p>
            )}
          </div>

          {/* Store Type */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">
              {t("fieldStoreType")}
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: StoreType.small, labelKey: "storeSmall" },
                { value: StoreType.large, labelKey: "storeLarge" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setStoreType(opt.value)}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-smooth ${
                    storeType === opt.value
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border/60 text-muted-foreground hover:border-primary/40"
                  }`}
                  data-ocid={`booking.store_type_${opt.value}`}
                >
                  {t(opt.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">
              {t("fieldDuration")}
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setDuration(opt.value)}
                  className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-smooth text-start ${
                    duration === opt.value
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border/60 text-muted-foreground hover:border-primary/40"
                  }`}
                  data-ocid={`booking.duration_${opt.value}`}
                >
                  <span className="block">{t(opt.labelKey)}</span>
                  <span className="text-xs font-bold">
                    {priceMap[opt.value]?.toLocaleString()} {t("currency")}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">
              {t("fieldPaymentMethod")}
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: PaymentMethod.cash, labelKey: "paymentCash" },
                {
                  value: PaymentMethod.electronic,
                  labelKey: "paymentElectronic",
                },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setPaymentMethod(opt.value)}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-smooth ${
                    paymentMethod === opt.value
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border/60 text-muted-foreground hover:border-primary/40"
                  }`}
                  data-ocid={`booking.payment_${opt.value}`}
                >
                  {t(opt.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Price summary */}
          <div
            className="bg-muted/30 border border-border/40 rounded-xl p-5 space-y-2"
            data-ocid="booking.price_summary"
          >
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("rentalPrice")}</span>
              <span className="font-medium text-foreground">
                {rentalPrice.toLocaleString()} {t("currency")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("deposit")}</span>
              <span className="font-medium text-foreground">
                {DEPOSIT.toLocaleString()} {t("currency")}
              </span>
            </div>
            <div className="flex justify-between border-t border-border/40 pt-2">
              <span className="font-bold text-foreground">
                {t("totalPrice")}
              </span>
              <span className="font-bold text-primary text-lg">
                {totalPrice.toLocaleString()} {t("currency")}
              </span>
            </div>
          </div>

          {/* T&C Acceptance */}
          <div
            className="flex items-start gap-3 bg-muted/30 border border-border/40 rounded-xl p-4"
            data-ocid="booking.terms_section"
          >
            <Checkbox
              id="termsAccepted"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              className="mt-0.5 border-primary/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              data-ocid="booking.terms_checkbox"
            />
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="termsAccepted"
                className="text-sm text-foreground leading-relaxed cursor-pointer"
              >
                {isRTL
                  ? "أوافق على الشروط والأحكام وأُقر بدفع التأمين المسترد 100,000 ل.س"
                  : "I agree to the Terms & Conditions and acknowledge the refundable deposit of 100,000 SYP"}
              </Label>
              <p className="text-xs text-muted-foreground">
                {isRTL
                  ? "يُعاد التأمين فور تسليم المحل سليماً ونظيفاً"
                  : "Deposit is refunded upon clean handover of the store"}
              </p>
            </div>
          </div>
          {errors.terms && (
            <p
              className="text-destructive text-xs -mt-2"
              data-ocid="booking.terms_field_error"
            >
              {errors.terms}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending || !termsAccepted}
            className="w-full gradient-gold text-primary-foreground font-semibold py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            data-ocid="booking.submit_button"
          >
            {isPending ? t("loading") : t("submitBooking")}
          </Button>
        </form>
      </div>
    </div>
  );
}
