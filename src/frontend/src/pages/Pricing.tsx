import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

const SMALL_PRICES = [
  { key: "dur1h", price: "30,000", isMin: true },
  { key: "dur2h", price: "50,000" },
  { key: "dur3h", price: "60,000" },
  { key: "dur4h", price: "70,000" },
  { key: "durDay", price: "85,000", highlight: true },
  { key: "durWeek", price: "500,000", highlight: true },
] as const;

const LARGE_PRICES = [
  { key: "dur1h", price: "50,000", isMin: true },
  { key: "dur2h", price: "90,000" },
  { key: "dur3h", price: "120,000" },
  { key: "dur4h", price: "140,000" },
  { key: "durDay", price: "150,000", highlight: true },
  { key: "durWeek", price: "900,000", highlight: true },
] as const;

const INCLUDED = [
  "feat1Title",
  "feat2Title",
  "feat3Title",
  "feat4Title",
] as const;

function PriceCard({
  titleKey,
  descKey,
  prices,
  tier,
}: {
  titleKey: string;
  descKey: string;
  prices: ReadonlyArray<{
    key: string;
    price: string;
    isMin?: boolean;
    highlight?: boolean;
  }>;
  tier: "small" | "large";
}) {
  const { t } = useLanguage();
  const isLarge = tier === "large";

  return (
    <div
      className={`bg-card border rounded-2xl overflow-hidden ${
        isLarge ? "border-primary/60 shadow-lg" : "border-border/60"
      }`}
      data-ocid={`pricing.${tier}_card`}
    >
      {/* Header */}
      <div className={`px-8 py-6 ${isLarge ? "gradient-gold" : "bg-muted/30"}`}>
        <h2
          className={`font-display text-2xl font-bold ${
            isLarge ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          {t(titleKey)}
        </h2>
        <p
          className={`text-sm mt-1 ${
            isLarge ? "text-primary-foreground/80" : "text-muted-foreground"
          }`}
        >
          {t(descKey)}
        </p>
      </div>

      {/* Price rows */}
      <div className="px-8 py-6 space-y-3">
        {prices.map((row) => (
          <div
            key={row.key}
            className={`flex items-center justify-between py-3 rounded-lg px-4 ${
              row.highlight
                ? "bg-primary/10 border border-primary/30"
                : "border border-border/40"
            }`}
            data-ocid={`pricing.${tier}_${row.key}_row`}
          >
            <span className="font-medium text-foreground">{t(row.key)}</span>
            <div className="text-end">
              <span className="text-lg font-bold text-primary">
                {row.price}
              </span>
              <span className="text-xs text-muted-foreground ms-1">
                {t("currency")}
              </span>
              {row.isMin && (
                <div className="text-xs text-muted-foreground">
                  {t("minBooking")}
                </div>
              )}
              {row.key === "durDay" && (
                <div className="text-xs text-muted-foreground">
                  {t("fullDayNote")}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Included */}
      <div className="px-8 pb-6 space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          {t("pricingSubtitle")}
        </p>
        {INCLUDED.map((k) => (
          <div
            key={k}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Check className="w-4 h-4 text-primary shrink-0" />
            {t(k)}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-8 pb-8">
        <Link to="/booking">
          <Button
            className={`w-full ${
              isLarge
                ? "gradient-gold text-primary-foreground"
                : "bg-primary/10 text-primary border border-primary/40 hover:bg-primary/20"
            }`}
            data-ocid={`pricing.${tier}_book_button`}
          >
            {t("bookNow")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <div className="bg-background min-h-screen">
      {/* Page header */}
      <section
        className="bg-card border-b border-border/40 py-14 px-4 text-center"
        data-ocid="pricing.header_section"
      >
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
          {t("pricingTitle")}
        </h1>
        <div
          className="w-16 h-0.5 bg-primary mx-auto mt-4"
          aria-hidden="true"
        />
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          {t("pricingSubtitle")}
        </p>
      </section>

      {/* Cards */}
      <section
        className="max-w-5xl mx-auto px-4 py-16"
        data-ocid="pricing.cards_section"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PriceCard
            titleKey="pricingSmallTitle"
            descKey="pricingSmallDesc"
            prices={SMALL_PRICES}
            tier="small"
          />
          <PriceCard
            titleKey="pricingLargeTitle"
            descKey="pricingLargeDesc"
            prices={LARGE_PRICES}
            tier="large"
          />
        </div>
      </section>

      {/* Terms reminder */}
      <section
        className="bg-muted/20 py-12 px-4"
        data-ocid="pricing.terms_reminder_section"
      >
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {t("termsTitle")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("term1Title")}: {t("term1Desc")}
          </p>
          <Link to="/booking">
            <Button
              className="gradient-gold text-primary-foreground font-semibold mt-4"
              data-ocid="pricing.cta_book_button"
            >
              {t("bookNow")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
