import { DurationPackage, PaymentMethod, StoreType } from "@/backend";
import type { Booking } from "@/backend";
import { QrCodeDisplay } from "@/components/QrCodeDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/language-context";
import {
  useGetAllBookings,
  useGetBookingCount,
  useGetBookingsByDate,
} from "@/hooks/useQueries";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Calendar, LogOut, QrCode, ShieldCheck } from "lucide-react";
import { useState } from "react";

function formatPrice(n: bigint) {
  return Number(n).toLocaleString();
}
function BookingQrModal({
  ref: bookingRef,
  onClose,
  t,
}: {
  ref: string;
  onClose: () => void;
  t: (k: string) => string;
}) {
  return (
    <button
      type="button"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      aria-label="close modal"
      data-ocid="admin.qr_modal"
    >
      <dialog
        open
        className="bg-card border border-border/60 rounded-2xl p-6 max-w-xs w-full mx-4 space-y-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground text-base">
            {t("qrTitle")}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors rounded-lg p-1 hover:bg-muted/40"
            aria-label={t("close")}
            data-ocid="admin.qr_modal.close_button"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs text-muted-foreground text-center">
            {t("qrScanHint")}
          </p>
          <p className="font-mono text-sm font-bold text-primary">
            {bookingRef}
          </p>
        </div>
        <QrCodeDisplay
          value={bookingRef}
          label={t("bookingRef")}
          size={200}
          showButtons={true}
        />
      </dialog>
    </button>
  );
}

function DurationLabel({
  dur,
  t,
}: { dur: DurationPackage; t: (k: string) => string }) {
  const map: Record<DurationPackage, string> = {
    [DurationPackage.oneHour]: t("dur1h"),
    [DurationPackage.twoHours]: t("dur2h"),
    [DurationPackage.threeHours]: t("dur3h"),
    [DurationPackage.fourHours]: t("dur4h"),
    [DurationPackage.fullDay]: t("durDay"),
    [DurationPackage.weekly]: t("durWeek"),
  };
  return <span>{map[dur] ?? dur}</span>;
}

function BookingRow({
  booking,
  t,
  index,
  onQrClick,
}: {
  booking: Booking;
  t: (k: string) => string;
  index: number;
  onQrClick: (ref: string) => void;
}) {
  const isLarge = booking.storeType === StoreType.large;
  return (
    <tr
      className="border-b border-border/40 hover:bg-muted/20 transition-colors"
      data-ocid={`admin.booking_row.${index}`}
    >
      <td className="px-4 py-3 font-mono text-xs text-primary">
        {booking.ref}
      </td>
      <td className="px-4 py-3 font-medium text-foreground">
        {booking.merchantName}
      </td>
      <td className="px-4 py-3 text-muted-foreground text-sm">
        {booking.bookingDate}
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            isLarge
              ? "bg-primary/20 text-primary"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {isLarge ? t("storeLarge") : t("storeSmall")}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">
        <DurationLabel dur={booking.duration} t={t} />
      </td>
      <td className="px-4 py-3 text-end font-semibold text-foreground">
        {formatPrice(booking.totalPrice)} {t("currency")}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">
        {booking.paymentMethod === PaymentMethod.cash
          ? t("paymentCash")
          : t("paymentElectronic")}
      </td>
      <td className="px-4 py-3">
        <button
          type="button"
          onClick={() => onQrClick(booking.ref)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
          aria-label={`${t("qrViewCode")} — ${booking.ref}`}
          data-ocid={`admin.qr_view_button.${index}`}
        >
          <QrCode className="w-3.5 h-3.5" />
          {t("qrViewCode")}
        </button>
      </td>
    </tr>
  );
}

export default function Admin() {
  const { t, isRTL } = useLanguage();
  const { loginStatus, login, clear } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";

  const [filterDate, setFilterDate] = useState("");
  const [qrRef, setQrRef] = useState<string | null>(null);

  const allBookings = useGetAllBookings();
  const dateBookings = useGetBookingsByDate(filterDate);
  const countQuery = useGetBookingCount();

  const bookings = filterDate
    ? (dateBookings.data ?? [])
    : (allBookings.data ?? []);
  const isLoading = filterDate ? dateBookings.isLoading : allBookings.isLoading;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div
          className="bg-card border border-primary/40 rounded-2xl p-10 max-w-md w-full text-center space-y-6"
          data-ocid="admin.login_panel"
        >
          <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {t("adminTitle")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isRTL
              ? "يرجى تسجيل الدخول للوصول إلى لوحة الإدارة"
              : "Please sign in to access the administration panel"}
          </p>
          <Button
            onClick={() => login()}
            className="w-full gradient-gold text-primary-foreground font-semibold"
            data-ocid="admin.login_button"
          >
            {t("adminLoginBtn")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* QR Modal */}
      {qrRef && (
        <BookingQrModal ref={qrRef} onClose={() => setQrRef(null)} t={t} />
      )}

      {/* Admin header */}
      <section
        className="bg-card border-b border-border/40 py-8 px-4"
        data-ocid="admin.header_section"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {t("adminTitle")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {t("adminTotalBookings")}:{" "}
              <span className="font-bold text-primary">
                {countQuery.data !== undefined
                  ? Number(countQuery.data).toString()
                  : "—"}
              </span>
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => clear()}
            className="border-border/60 text-muted-foreground hover:text-destructive hover:border-destructive/40 flex items-center gap-2"
            data-ocid="admin.logout_button"
          >
            <LogOut className="w-4 h-4" />
            {t("adminLogout")}
          </Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Date filter */}
        <div className="flex items-center gap-3" data-ocid="admin.date_filter">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <label
            htmlFor="filterDate"
            className="text-sm font-medium text-foreground"
          >
            {t("adminFilterDate")}
          </label>
          <Input
            id="filterDate"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-48 bg-secondary border-input text-foreground"
            dir="ltr"
            data-ocid="admin.filter_date_input"
          />
          {filterDate && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setFilterDate("")}
              className="text-muted-foreground hover:text-foreground"
              data-ocid="admin.clear_filter_button"
            >
              {t("close")}
            </Button>
          )}
        </div>

        {/* Bookings table */}
        <div
          className="bg-card border border-border/60 rounded-2xl overflow-hidden"
          data-ocid="admin.bookings_table"
        >
          {isLoading ? (
            <div
              className="p-12 text-center text-muted-foreground"
              data-ocid="admin.loading_state"
            >
              {t("loading")}
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center" data-ocid="admin.empty_state">
              <p className="text-muted-foreground">{t("adminNoBookings")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/30 border-b border-border/60">
                    {[
                      t("adminRef"),
                      t("adminMerchant"),
                      t("adminDate"),
                      t("adminStore"),
                      t("adminDuration"),
                      t("adminTotal"),
                      t("adminPayment"),
                      t("adminQrCode"),
                    ].map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-start text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, i) => (
                    <BookingRow
                      key={booking.ref}
                      booking={booking}
                      t={t}
                      index={i + 1}
                      onQrClick={setQrRef}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
