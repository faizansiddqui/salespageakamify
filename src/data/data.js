// ✅ FILE: data.ts
// Single source of truth for packages + table rows. Use "starter", "standard", "enterprise" keys in tableRows.

export const gigData = {
  description: [
    "I will design and develop a professional eCommerce website that is fast, secure, SEO-friendly, and fully responsive on all devices.",
    "From simple online stores to advanced multi-vendor marketplaces, I help businesses increase sales with smart features, clean design, and easy-to-use admin panels.",
    "I offer complete multi-vendor marketplace development where multiple sellers can register and sell their products, with vendor dashboards, shipping integration, WhatsApp marketing tools, and AI automation.",
  ],

  meta: {
    type: "E-Commerce store",
    features:
      "Marketing, Payment, Shipping, Inventory, Analytics, ChatBot, Booking, Dashboard, Blog, and Admin Panel.",
  },

  seller: {
    name: "Akamify",
    logo: "/akamify.png",
    from: "India",
    memberSince: "Jun 2024",
    avgResponse: "4 hours",
    languages: "Hindi, English, Abkhazian, Bihari",
    about:
      "At Akamify, we help growing brands build a strong and professional digital presence. We offer website development, mobile app development, custom software solutions, e-commerce development, and digital growth support to help businesses move forward with confidence. Our websites and apps are easy to use, modern, and designed to work smoothly on all devices. We help brands sell online, manage their business better, and connect with more customers through smart digital solutions.",
  },

  packages: [
    {
      id: "starter",
      name: "Starter",
      title: "Basic shop — quick launch",
      basePrice: 22770,
      priceLabel: "₹22,770",
      desc: "Clean store, core e‑commerce features and hosting setup.",
      defaultDeliveryDays: 4,
      deliveryOptions: [
        { label: "4 days", days: 4, additional: 0 },
        { label: "2 days", days: 2, additional: 3792 },
      ],
      pages: 5,
      plugins: 3,
      products: "25 / 50",
      revisions: 2,
    },
    {
      id: "standard",
      name: "Standard",
      title: "Growth — conversion focused",
      basePrice: 37950,
      priceLabel: "₹37,950",
      desc: "Adds reviews, order tracking, speed optimizations and analytics.",
      defaultDeliveryDays: 4,
      deliveryOptions: [
        { label: "4 days", days: 4, additional: 0 },
        { label: "2 days", days: 2, additional: 7583 },
      ],
      pages: 10,
      plugins: 6,
      products: "50 / 100",
      revisions: 5,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      title: "Scale — custom & integrated",
      basePrice: 151800,
      priceLabel: "₹151,800",
      desc: "Full inventory, multi-vendor, advanced analytics and integrations.",
      defaultDeliveryDays: 10,
      deliveryOptions: [
        { label: "10 days", days: 10, additional: 0 },
        { label: "5 days", days: 5, additional: 30000 },
      ],
      pages: 25,
      plugins: 12,
      products: "Unlimited / scalable",
      revisions: 10,
    },
  ],

  // tableRows now support values per plan; value can be:
  // - true/false (boolean) -> show tick/cross
  // - string (non-empty) -> show tick + text (e.g. "Quick checkout", "Advanced SEO")
  tableRows: [
    { label: "Clean, mobile-friendly store", starter: true, standard: true, enterprise: true },
    { label: "Product limit (Free cloud)", starter: "25/50", standard: "50/100", enterprise: "Unlimited / scalable" },
    { label: "Unlimited product pages", starter: true, standard: true, enterprise: true },
    { label: "Easy checkout", starter: true, standard: "Quick checkout", enterprise: "Quick + optimized" },
    { label: "Shopping cart + Wishlist/Save later", starter: true, standard: true, enterprise: true },
    { label: "Basic security", starter: true, standard: true, enterprise: "Advanced security" },
    { label: "Payment integration", starter: true, standard: true, enterprise: true },
    { label: "SEO setup", starter: true, standard: true, enterprise: "Advanced SEO" },
    { label: "Admin panel", starter: true, standard: true, enterprise: "Advanced admin" },
    { label: "Product upload", starter: true, standard: true, enterprise: true },
    { label: "CRUD analytics", starter: true, standard: "Advance analytics", enterprise: "Advanced analytics + A/B testing" },
    { label: "Contact + FAQ page", starter: true, standard: true, enterprise: true },
    { label: "Support pages", starter: true, standard: true, enterprise: true },
    { label: "Hosting + Live store setup", starter: true, standard: true, enterprise: true },
    { label: "Product reviews & ratings", starter: false, standard: true, enterprise: true },
    { label: "Order tracking", starter: false, standard: true, enterprise: true },
    { label: "Sponsored features", starter: false, standard: true, enterprise: "Marketing support" },
    { label: "Advanced search & filters", starter: false, standard: true, enterprise: "Fast + typo tolerant + faceted nav" },
    { label: "Admin panel with full CRUD", starter: false, standard: true, enterprise: true },
    { label: "Speed optimization", starter: false, standard: true, enterprise: true },
    { label: "Scaling support", starter: false, standard: true, enterprise: true },
    { label: "Basic CMS", starter: false, standard: true, enterprise: "Advance CMS" },
    { label: "Monthly reports", starter: false, standard: true, enterprise: true },
    { label: "Personalized recommendations (AI)", starter: false, standard: false, enterprise: true },
    { label: "Loyalty program / gift cards", starter: false, standard: false, enterprise: true },
    { label: "Multi-currency / multi-language", starter: false, standard: false, enterprise: true },
    { label: "Full order + inventory management", starter: false, standard: false, enterprise: true },
    { label: "Advanced promotions", starter: false, standard: false, enterprise: true },
    { label: "Custom integrations", starter: false, standard: false, enterprise: true },
    { label: "Customer profile creation", starter: false, standard: false, enterprise: true },
    { label: "Audit log & monitoring", starter: false, standard: false, enterprise: true },
    { label: "Meta marketing support", starter: false, standard: false, enterprise: true },
    { label: "WhatsApp / Shipping dashboard integration", starter: false, standard: false, enterprise: true },
    { label: "RTO handling / IVR support", starter: false, standard: false, enterprise: true },
    { label: "Role-based access", starter: false, standard: false, enterprise: true },
    { label: "Multi-vendor support", starter: false, standard: false, enterprise: true },
  ],
};