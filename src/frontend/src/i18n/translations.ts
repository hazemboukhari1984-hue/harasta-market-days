import type { Language } from "@/types";

type TranslationMap = Record<string, string>;

const ar: TranslationMap = {
  // App
  appName: "أيام سوق حرستا",
  appNameEn: "Harasta Market Days",
  slogan: "محلك جاهز.. بالإشغال اليومي والساعي. طاقة مستمرة ومرونة كاملة.",
  sloganSub: "التطبيق الأول في سوريا للمساحات التجارية المرنة",

  // Nav
  navHome: "الرئيسية",
  navPricing: "الأسعار",
  navBooking: "الحجز",
  navAdmin: "لوحة الإدارة",
  navAdminLogin: "دخول الإدارة",

  // Language toggle
  langToggleEn: "English",
  langToggleAr: "العربية",

  // Hero
  heroTitle: "أيام سوق حرستا",
  heroSubtitle: "سوق حرستا للمساحات المرنة — الأول في سوريا",
  heroCta: "احجز الآن",
  heroPricingCta: "استعرض الأسعار",

  // About
  aboutTitle: "عن السوق",
  aboutDesc:
    "التطبيق الأول في سوريا للمساحات التجارية المرنة. نوفر لك 42 محلاً تجارياً مجهزة بالكامل ومضاءة على مدار الساعة في قلب حرستا. استأجر مساحتك على قدر حاجتك فقط: بساعة أو بيوم أو بأسبوع، وابدأ مشروعك فوراً دون تكاليف تأسيس أو التزامات طويلة الأمد.",
  storeCount: "42 محلاً تجارياً",
  storeCountSmall: "31 محلاً صغيراً",
  storeCountLarge: "11 محلاً كبيراً بواجهتين",

  // Pricing
  pricingTitle: "قائمة الأسعار",
  pricingSubtitle: "أسعار شاملة للإنارة الكاملة مع أنظمة الأمان",
  pricingSmallTitle: "المحلات الصغيرة",
  pricingSmallDesc:
    "31 محلاً — للمصممين، تجار الألبسة، العطور، الإكسسوارات، ونقاط تسليم الأونلاين.",
  pricingLargeTitle: "المحلات الكبيرة",
  pricingLargeDesc:
    "11 محلاً بواجهتين — للوكالات الكبرى، معارض المفروشات، السجاد، والفعاليات المتميزة.",
  perHour: "/ ساعة",
  perDay: "/ يوم كامل",
  perWeek: "/ أسبوع",
  currency: "ل.س",
  minBooking: "الحد الأدنى للإشغال",
  fullDayNote: "من 5 إلى 24 ساعة",
  bookNow: "احجز الآن",

  // Duration labels
  dur1h: "ساعة واحدة",
  dur2h: "ساعتان",
  dur3h: "3 ساعات",
  dur4h: "4 ساعات",
  durDay: "باقة اليوم الكامل",
  durWeek: "الباقة الأسبوعية (7 أيام)",

  // Features
  featuresTitle: "الخدمات والمميزات",
  feat1Title: "طاقة مستمرة",
  feat1Desc:
    "الأسعار تشمل الإنارة الكاملة والمستمرة عبر شبكة كهرباء عامة ومحولة خاصة بالسوق.",
  feat2Title: "تصميم لوكس وعصري",
  feat2Desc:
    "المحلات مجهزة بإنارة مخفية وأرضيات وجدران نظيفة وجاهزة فوراً لعرض بضاعتك.",
  feat3Title: "أمان وحراسة",
  feat3Desc: "المنشأة محمية بنظام كاميرات مراقبة وكادر أمني على مدار 24 ساعة.",
  feat4Title: "تسليم فوري",
  feat4Desc:
    "عملية الاستلام والتسليم لا تستغرق أكثر من 5 دقائق لتبدأ البيع فوراً.",

  // Booking form
  bookingTitle: "حجز محل",
  bookingSubtitle: "أكمل النموذج أدناه لتأكيد حجزك",
  fieldMerchantName: "اسم التاجر",
  fieldNationalId: "رقم الهوية الوطنية",
  fieldBookingDate: "تاريخ الحجز",
  fieldStoreType: "نوع المحل",
  fieldDuration: "مدة الإشغال",
  fieldPaymentMethod: "طريقة الدفع",
  storeSmall: "محل صغير",
  storeLarge: "محل كبير (بواجهتين)",
  paymentCash: "نقداً",
  paymentElectronic: "دفع إلكتروني",
  submitBooking: "تأكيد الحجز",
  bookingSuccess: "تم الحجز بنجاح",
  bookingRef: "رقم الحجز",
  totalPrice: "إجمالي السعر",
  deposit: "التأمين المسترد",
  rentalPrice: "سعر الإيجار",

  // Terms
  termsTitle: "شروط الإشغال وحفظ الحقوق",
  term1Title: "التأمين المسترد",
  term1Desc:
    "يُدفع مبلغ 100,000 ل.س كأمانة عند الحجز، ويُعاد للمستأجر فوراً عند تسليم المحل سليماً ونظيفاً.",
  term2Title: "تأكيد الحجز",
  term2Desc:
    "لا يعتبر المحل محجوزاً إلا بعد تسديد القيمة كاملة مسبقاً (نقداً أو عبر وسائل الدفع الإلكتروني المعتمدة).",
  term3Title: "سلامة الديكور",
  term3Desc:
    "يُمنع منعاً باتاً الثقب في الجدران، أو استخدام مواد لاصقة قوية، أو التعديل على التمديدات الكهربائية والإضاءة الأساسية.",
  term4Title: "سياسة الوقت",
  term4Desc:
    "يبدأ احتساب وقت الإشغال الساعي أو اليومي بدقة من لحظة استلام المفتاح من إدارة السوق.",

  // Admin
  adminTitle: "لوحة إدارة السوق",
  adminLoginBtn: "تسجيل الدخول بـ Internet Identity",
  adminLogout: "تسجيل الخروج",
  adminBookings: "الحجوزات",
  adminTotalBookings: "إجمالي الحجوزات",
  adminFilterDate: "فلتر بالتاريخ",
  adminNoBookings: "لا توجد حجوزات",
  adminRef: "رقم الحجز",
  adminMerchant: "التاجر",
  adminDate: "التاريخ",
  adminStore: "النوع",
  adminDuration: "المدة",
  adminTotal: "الإجمالي",
  adminPayment: "الدفع",
  adminActions: "الإجراءات",
  adminQrCode: "رمز QR",

  // QR Code
  qrTitle: "رمز QR للحجز",
  qrDownload: "تحميل الصورة",
  qrPrint: "طباعة التأكيد",
  qrScanHint: "امسح الرمز لعرض تفاصيل الحجز",
  qrViewCode: "عرض رمز QR",

  // Common
  loading: "جارٍ التحميل...",
  error: "حدث خطأ",
  retry: "إعادة المحاولة",
  close: "إغلاق",
  confirm: "تأكيد",
  cancel: "إلغاء",
  save: "حفظ",
  required: "هذا الحقل مطلوب",
  copyrightBuilt: "صُنع بمحبة باستخدام caffeine.ai",
  copyrightRights: "جميع الحقوق محفوظة",

  // Footer
  footerTagline: "منصة التجارة المرنة الأولى في سوريا",
  footerContact: "تواصل معنا",
  footerLinks: "روابط مهمة",
};

const en: TranslationMap = {
  appName: "Harasta Market Days",
  appNameEn: "Harasta Market Days",
  slogan:
    "Your store is ready — daily & hourly occupancy. Continuous power, full flexibility.",
  sloganSub: "Syria's first flexible commercial space platform",

  navHome: "Home",
  navPricing: "Pricing",
  navBooking: "Book Now",
  navAdmin: "Admin Panel",
  navAdminLogin: "Admin Login",

  langToggleEn: "English",
  langToggleAr: "العربية",

  heroTitle: "Harasta Market Days",
  heroSubtitle: "Syria's first flexible commercial space marketplace",
  heroCta: "Book Now",
  heroPricingCta: "View Pricing",

  aboutTitle: "About The Market",
  aboutDesc:
    "Syria's first flexible commercial space platform. We offer 42 fully equipped shops with 24/7 lighting in the heart of Harasta. Rent your space only for what you need — by hour, day, or week. Start your business immediately without setup costs or long-term commitments.",
  storeCount: "42 Commercial Shops",
  storeCountSmall: "31 Small Shops",
  storeCountLarge: "11 Large Double-Frontage Shops",

  pricingTitle: "Pricing",
  pricingSubtitle: "Prices include full lighting and security systems",
  pricingSmallTitle: "Small Shops",
  pricingSmallDesc:
    "31 shops — for designers, clothing traders, perfumes, accessories, and online delivery points.",
  pricingLargeTitle: "Large Shops",
  pricingLargeDesc:
    "11 double-frontage shops — for large agencies, furniture showrooms, carpets, and premium events.",
  perHour: "/ hour",
  perDay: "/ full day",
  perWeek: "/ week",
  currency: "SYP",
  minBooking: "Minimum occupancy",
  fullDayNote: "5 to 24 hours",
  bookNow: "Book Now",

  dur1h: "1 Hour",
  dur2h: "2 Hours",
  dur3h: "3 Hours",
  dur4h: "4 Hours",
  durDay: "Full Day Package",
  durWeek: "Weekly Package (7 days)",

  featuresTitle: "Features & Services",
  feat1Title: "Continuous Power",
  feat1Desc:
    "Prices include full and continuous lighting via the public grid and the market's private transformer.",
  feat2Title: "Luxury Modern Design",
  feat2Desc:
    "Shops are equipped with concealed lighting, clean floors and walls — ready immediately for display.",
  feat3Title: "Security & Guards",
  feat3Desc:
    "The facility is protected by a surveillance camera system and security staff 24 hours a day.",
  feat4Title: "Instant Handover",
  feat4Desc:
    "The handover process takes no more than 5 minutes so you can start selling immediately.",

  bookingTitle: "Book a Store",
  bookingSubtitle: "Complete the form below to confirm your booking",
  fieldMerchantName: "Merchant Name",
  fieldNationalId: "National ID Number",
  fieldBookingDate: "Booking Date",
  fieldStoreType: "Store Type",
  fieldDuration: "Occupancy Duration",
  fieldPaymentMethod: "Payment Method",
  storeSmall: "Small Shop",
  storeLarge: "Large Shop (Double-frontage)",
  paymentCash: "Cash",
  paymentElectronic: "Electronic Payment",
  submitBooking: "Confirm Booking",
  bookingSuccess: "Booking Confirmed!",
  bookingRef: "Booking Reference",
  totalPrice: "Total Price",
  deposit: "Refundable Deposit",
  rentalPrice: "Rental Price",

  termsTitle: "Terms & Conditions",
  term1Title: "Refundable Deposit",
  term1Desc:
    "A deposit of 100,000 SYP is paid at booking and returned immediately when the store is handed back in clean condition.",
  term2Title: "Booking Confirmation",
  term2Desc:
    "The store is not considered booked until the full amount is paid in advance (cash or approved electronic payment).",
  term3Title: "Décor Safety",
  term3Desc:
    "Drilling walls, using strong adhesives, or modifying electrical installations and primary lighting is strictly prohibited.",
  term4Title: "Time Policy",
  term4Desc:
    "Hourly or daily occupancy time is counted precisely from the moment the key is received from market management.",

  adminTitle: "Market Administration Panel",
  adminLoginBtn: "Sign in with Internet Identity",
  adminLogout: "Sign Out",
  adminBookings: "Bookings",
  adminTotalBookings: "Total Bookings",
  adminFilterDate: "Filter by Date",
  adminNoBookings: "No bookings found",
  adminRef: "Booking Ref",
  adminMerchant: "Merchant",
  adminDate: "Date",
  adminStore: "Type",
  adminDuration: "Duration",
  adminTotal: "Total",
  adminPayment: "Payment",
  adminActions: "Actions",
  adminQrCode: "QR Code",

  // QR Code
  qrTitle: "Booking QR Code",
  qrDownload: "Download Image",
  qrPrint: "Print Confirmation",
  qrScanHint: "Scan to view booking details",
  qrViewCode: "View QR Code",

  loading: "Loading...",
  error: "An error occurred",
  retry: "Try Again",
  close: "Close",
  confirm: "Confirm",
  cancel: "Cancel",
  save: "Save",
  required: "This field is required",
  copyrightBuilt: "Built with love using caffeine.ai",
  copyrightRights: "All rights reserved",

  footerTagline: "Syria's first flexible commercial space platform",
  footerContact: "Contact Us",
  footerLinks: "Quick Links",
};

export const translations: Record<Language, TranslationMap> = { ar, en };

export function t(lang: Language, key: string): string {
  return translations[lang][key] ?? key;
}
