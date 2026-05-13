import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { Link } from "@tanstack/react-router";
import { Clock, Layers, Shield, Zap } from "lucide-react";

const FEATURES = [
  { icon: Zap, key: "feat1" },
  { icon: Layers, key: "feat2" },
  { icon: Shield, key: "feat3" },
  { icon: Clock, key: "feat4" },
] as const;

export default function Home() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
        data-ocid="home.hero_section"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-market.dim_1400x700.jpg')",
          }}
          aria-hidden="true"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 hero-overlay" aria-hidden="true" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-sm font-medium">
            <span
              className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
              aria-hidden="true"
            />
            {t("sloganSub")}
          </div>

          {/* Main title */}
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-foreground leading-tight">
            {t("heroTitle")}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("slogan")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/booking">
              <Button
                size="lg"
                className="gradient-gold text-primary-foreground font-semibold px-8 shadow-lg hover:opacity-90 transition-smooth"
                data-ocid="home.hero_book_button"
              >
                {t("heroCta")}
              </Button>
            </Link>
            <Link to="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="border-primary/40 text-primary hover:bg-primary/10 px-8"
                data-ocid="home.hero_pricing_button"
              >
                {t("heroPricingCta")}
              </Button>
            </Link>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            {[
              { num: "42", label: t("storeCount") },
              {
                num: "24/7",
                label: isRTL ? "إنارة مستمرة" : "Continuous Lighting",
              },
              { num: "5", label: isRTL ? "دقائق للتسليم" : "Min Handover" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-display font-bold text-primary">
                  {s.num}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section
        className="bg-muted/20 py-20 px-4"
        data-ocid="home.about_section"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            {t("aboutTitle")}
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto" aria-hidden="true" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("aboutDesc")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {[t("storeCountSmall"), t("storeCountLarge")].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  aria-hidden="true"
                />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="bg-background py-20 px-4"
        data-ocid="home.features_section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              {t("featuresTitle")}
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, key }, i) => (
              <div
                key={key}
                className="bg-card border border-border/60 rounded-xl p-6 space-y-4 hover:border-primary/40 transition-smooth"
                data-ocid={`home.feature_card.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">
                  {t(`${key}Title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`${key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms preview */}
      <section
        className="bg-muted/20 py-20 px-4"
        data-ocid="home.terms_section"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h2 className="font-display text-3xl font-bold text-foreground">
              {t("termsTitle")}
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(["term1", "term2", "term3", "term4"] as const).map((term, i) => (
              <div
                key={term}
                className="bg-card border border-border/60 rounded-xl p-6 space-y-3"
                data-ocid={`home.term_card.${i + 1}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold text-foreground">
                    {t(`${term}Title`)}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`${term}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="bg-card py-16 px-4 text-center"
        data-ocid="home.cta_section"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-display text-3xl font-bold text-foreground">
            {t("heroTitle")}
          </h2>
          <p className="text-muted-foreground">{t("slogan")}</p>
          <Link to="/booking">
            <Button
              size="lg"
              className="gradient-gold text-primary-foreground font-semibold px-10"
              data-ocid="home.cta_book_button"
            >
              {t("heroCta")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
