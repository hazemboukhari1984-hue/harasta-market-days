import { u as useLanguage, j as jsxRuntimeExports, L as Link, B as Button } from "./index-DhcdhH4l.js";
import { C as Check } from "./check-HlST4nj1.js";
const SMALL_PRICES = [
  { key: "dur1h", price: "30,000", isMin: true },
  { key: "dur2h", price: "50,000" },
  { key: "dur3h", price: "60,000" },
  { key: "dur4h", price: "70,000" },
  { key: "durDay", price: "85,000", highlight: true },
  { key: "durWeek", price: "500,000", highlight: true }
];
const LARGE_PRICES = [
  { key: "dur1h", price: "50,000", isMin: true },
  { key: "dur2h", price: "90,000" },
  { key: "dur3h", price: "120,000" },
  { key: "dur4h", price: "140,000" },
  { key: "durDay", price: "150,000", highlight: true },
  { key: "durWeek", price: "900,000", highlight: true }
];
const INCLUDED = [
  "feat1Title",
  "feat2Title",
  "feat3Title",
  "feat4Title"
];
function PriceCard({
  titleKey,
  descKey,
  prices,
  tier
}) {
  const { t } = useLanguage();
  const isLarge = tier === "large";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `bg-card border rounded-2xl overflow-hidden ${isLarge ? "border-primary/60 shadow-lg" : "border-border/60"}`,
      "data-ocid": `pricing.${tier}_card`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-8 py-6 ${isLarge ? "gradient-gold" : "bg-muted/30"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: `font-display text-2xl font-bold ${isLarge ? "text-primary-foreground" : "text-foreground"}`,
              children: t(titleKey)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-sm mt-1 ${isLarge ? "text-primary-foreground/80" : "text-muted-foreground"}`,
              children: t(descKey)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-8 py-6 space-y-3", children: prices.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center justify-between py-3 rounded-lg px-4 ${row.highlight ? "bg-primary/10 border border-primary/30" : "border border-border/40"}`,
            "data-ocid": `pricing.${tier}_${row.key}_row`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: t(row.key) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-primary", children: row.price }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ms-1", children: t("currency") }),
                row.isMin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t("minBooking") }),
                row.key === "durDay" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t("fullDayNote") })
              ] })
            ]
          },
          row.key
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 pb-6 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: t("pricingSubtitle") }),
          INCLUDED.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 text-sm text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-primary shrink-0" }),
                t(k)
              ]
            },
            k
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-8 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/booking", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: `w-full ${isLarge ? "gradient-gold text-primary-foreground" : "bg-primary/10 text-primary border border-primary/40 hover:bg-primary/20"}`,
            "data-ocid": `pricing.${tier}_book_button`,
            children: t("bookNow")
          }
        ) }) })
      ]
    }
  );
}
function Pricing() {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "bg-card border-b border-border/40 py-14 px-4 text-center",
        "data-ocid": "pricing.header_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl font-bold text-foreground", children: t("pricingTitle") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-0.5 bg-primary mx-auto mt-4",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-4 max-w-xl mx-auto", children: t("pricingSubtitle") })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "max-w-5xl mx-auto px-4 py-16",
        "data-ocid": "pricing.cards_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PriceCard,
            {
              titleKey: "pricingSmallTitle",
              descKey: "pricingSmallDesc",
              prices: SMALL_PRICES,
              tier: "small"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PriceCard,
            {
              titleKey: "pricingLargeTitle",
              descKey: "pricingLargeDesc",
              prices: LARGE_PRICES,
              tier: "large"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/20 py-12 px-4",
        "data-ocid": "pricing.terms_reminder_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: t("termsTitle") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            t("term1Title"),
            ": ",
            t("term1Desc")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/booking", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "gradient-gold text-primary-foreground font-semibold mt-4",
              "data-ocid": "pricing.cta_book_button",
              children: t("bookNow")
            }
          ) })
        ] })
      }
    )
  ] });
}
export {
  Pricing as default
};
