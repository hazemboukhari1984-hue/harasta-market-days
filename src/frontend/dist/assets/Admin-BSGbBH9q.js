import { c as createLucideIcon, u as useLanguage, f as useInternetIdentity, r as reactExports, j as jsxRuntimeExports, S as ShieldCheck, B as Button } from "./index-DhcdhH4l.js";
import { a as useGetAllBookings, b as useGetBookingsByDate, c as useGetBookingCount, I as Input, Q as QrCodeDisplay, S as StoreType, P as PaymentMethod, D as DurationPackage } from "./useQueries-DrAdgREb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1", key: "1tu5fj" }],
  ["rect", { width: "5", height: "5", x: "16", y: "3", rx: "1", key: "1v8r4q" }],
  ["rect", { width: "5", height: "5", x: "3", y: "16", rx: "1", key: "1x03jg" }],
  ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3", key: "177gqh" }],
  ["path", { d: "M21 21v.01", key: "ents32" }],
  ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7", key: "8crl2c" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M12 3h.01", key: "n36tog" }],
  ["path", { d: "M12 16v.01", key: "133mhm" }],
  ["path", { d: "M16 12h1", key: "1slzba" }],
  ["path", { d: "M21 12v.01", key: "1lwtk9" }],
  ["path", { d: "M12 21v-1", key: "1880an" }]
];
const QrCode = createLucideIcon("qr-code", __iconNode);
function formatPrice(n) {
  return Number(n).toLocaleString();
}
function BookingQrModal({
  ref: bookingRef,
  onClose,
  t
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm",
      onClick: onClose,
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      "aria-label": "close modal",
      "data-ocid": "admin.qr_modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "dialog",
        {
          open: true,
          className: "bg-card border border-border/60 rounded-2xl p-6 max-w-xs w-full mx-4 space-y-4 shadow-2xl",
          onClick: (e) => e.stopPropagation(),
          onKeyDown: (e) => e.stopPropagation(),
          "aria-modal": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base", children: t("qrTitle") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "text-muted-foreground hover:text-foreground transition-colors rounded-lg p-1 hover:bg-muted/40",
                  "aria-label": t("close"),
                  "data-ocid": "admin.qr_modal.close_button",
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: t("qrScanHint") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-bold text-primary", children: bookingRef })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              QrCodeDisplay,
              {
                value: bookingRef,
                label: t("bookingRef"),
                size: 200,
                showButtons: true
              }
            )
          ]
        }
      )
    }
  );
}
function DurationLabel({
  dur,
  t
}) {
  const map = {
    [DurationPackage.oneHour]: t("dur1h"),
    [DurationPackage.twoHours]: t("dur2h"),
    [DurationPackage.threeHours]: t("dur3h"),
    [DurationPackage.fourHours]: t("dur4h"),
    [DurationPackage.fullDay]: t("durDay"),
    [DurationPackage.weekly]: t("durWeek")
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: map[dur] ?? dur });
}
function BookingRow({
  booking,
  t,
  index,
  onQrClick
}) {
  const isLarge = booking.storeType === StoreType.large;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-border/40 hover:bg-muted/20 transition-colors",
      "data-ocid": `admin.booking_row.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-primary", children: booking.ref }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: booking.merchantName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-sm", children: booking.bookingDate }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isLarge ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`,
            children: isLarge ? t("storeLarge") : t("storeSmall")
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DurationLabel, { dur: booking.duration, t }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-end font-semibold text-foreground", children: [
          formatPrice(booking.totalPrice),
          " ",
          t("currency")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: booking.paymentMethod === PaymentMethod.cash ? t("paymentCash") : t("paymentElectronic") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onQrClick(booking.ref),
            className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-primary/40 text-primary hover:bg-primary/10 transition-colors",
            "aria-label": `${t("qrViewCode")} — ${booking.ref}`,
            "data-ocid": `admin.qr_view_button.${index}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3.5 h-3.5" }),
              t("qrViewCode")
            ]
          }
        ) })
      ]
    }
  );
}
function Admin() {
  const { t, isRTL } = useLanguage();
  const { loginStatus, login, clear } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const [filterDate, setFilterDate] = reactExports.useState("");
  const [qrRef, setQrRef] = reactExports.useState(null);
  const allBookings = useGetAllBookings();
  const dateBookings = useGetBookingsByDate(filterDate);
  const countQuery = useGetBookingCount();
  const bookings = filterDate ? dateBookings.data ?? [] : allBookings.data ?? [];
  const isLoading = filterDate ? dateBookings.isLoading : allBookings.isLoading;
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-primary/40 rounded-2xl p-10 max-w-md w-full text-center space-y-6",
        "data-ocid": "admin.login_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/20 mx-auto flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t("adminTitle") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: isRTL ? "يرجى تسجيل الدخول للوصول إلى لوحة الإدارة" : "Please sign in to access the administration panel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => login(),
              className: "w-full gradient-gold text-primary-foreground font-semibold",
              "data-ocid": "admin.login_button",
              children: t("adminLoginBtn")
            }
          )
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    qrRef && /* @__PURE__ */ jsxRuntimeExports.jsx(BookingQrModal, { ref: qrRef, onClose: () => setQrRef(null), t }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card border-b border-border/40 py-8 px-4",
        "data-ocid": "admin.header_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t("adminTitle") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              t("adminTotalBookings"),
              ":",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: countQuery.data !== void 0 ? Number(countQuery.data).toString() : "—" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => clear(),
              className: "border-border/60 text-muted-foreground hover:text-destructive hover:border-destructive/40 flex items-center gap-2",
              "data-ocid": "admin.logout_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
                t("adminLogout")
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", "data-ocid": "admin.date_filter", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "filterDate",
            className: "text-sm font-medium text-foreground",
            children: t("adminFilterDate")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "filterDate",
            type: "date",
            value: filterDate,
            onChange: (e) => setFilterDate(e.target.value),
            className: "w-48 bg-secondary border-input text-foreground",
            dir: "ltr",
            "data-ocid": "admin.filter_date_input"
          }
        ),
        filterDate && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => setFilterDate(""),
            className: "text-muted-foreground hover:text-foreground",
            "data-ocid": "admin.clear_filter_button",
            children: t("close")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-card border border-border/60 rounded-2xl overflow-hidden",
          "data-ocid": "admin.bookings_table",
          children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-12 text-center text-muted-foreground",
              "data-ocid": "admin.loading_state",
              children: t("loading")
            }
          ) : bookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center", "data-ocid": "admin.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: t("adminNoBookings") }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/30 border-b border-border/60", children: [
              t("adminRef"),
              t("adminMerchant"),
              t("adminDate"),
              t("adminStore"),
              t("adminDuration"),
              t("adminTotal"),
              t("adminPayment"),
              t("adminQrCode")
            ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "px-4 py-3 text-start text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                children: col
              },
              col
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bookings.map((booking, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              BookingRow,
              {
                booking,
                t,
                index: i + 1,
                onQrClick: setQrRef
              },
              booking.ref
            )) })
          ] }) })
        }
      )
    ] })
  ] });
}
export {
  Admin as default
};
