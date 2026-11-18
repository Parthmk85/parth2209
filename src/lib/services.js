// Service pages (/services/[slug]) and the homepage services grid read from here.
// `categories` are /work project categories, so each page lists real client sites.
// Keep every claim factual: no prices, client counts or rankings we can't back.

export const SERVICES = [
  {
    slug: "website-development",
    name: "Website Development",
    title: "Website Development Company in India",
    summary: "Fast, mobile-first business websites, from a simple informational site to a premium animated one.",
    intro:
      "We design and build business websites that load fast, read well on a phone and bring enquiries straight to your WhatsApp. Choose a clean informational site, or an animated one with scroll and hover motion that makes the brand feel premium.",
    points: [
      "Home, about, services and contact pages written around your business",
      "Mobile-first layouts that stay quick to load",
      "Scroll, hover and section animations for premium brands",
      "Google- and AI-search-friendly structure: metadata, sitemap, schema",
      "Enquiry forms that reach you on WhatsApp",
      "Your own domain, SSL and hosting set up for you",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Node.js"],
    categories: ["informational", "animated"],
    faqs: [
      ["How much does a business website cost?", "It depends on the number of pages, design and features. We quote after a free discovery call, once we understand what you need."],
      ["Will the website work on mobile?", "Yes. Every site is built mobile-first and tested on phones before launch."],
      ["Can I update the content myself?", "Yes, when you need it we add an admin panel so you can edit text, images and projects without touching code."],
    ],
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    title: "E-commerce Website Development Company in India",
    summary: "Custom online stores with UPI, card and netbanking payments, order tracking and an admin panel to run it.",
    intro:
      "We build custom e-commerce websites for brands that want to sell online on their own domain: product catalogue, payments, orders and stock in one place, with an admin panel you can actually run the business from.",
    points: [
      "Product catalogue with variants, sizes and stock",
      "UPI, cards and netbanking through Indian payment gateways",
      "Cart, checkout and order tracking",
      "Admin panel for products, orders and inventory",
      "WhatsApp order and payment notifications",
      "SEO-ready product and category pages",
    ],
    tech: ["Next.js", "React", "Node.js", "PostgreSQL", "MongoDB", "Payment gateway integration"],
    categories: ["ecommerce"],
    faqs: [
      ["Which payment methods can my store accept?", "UPI, debit and credit cards and netbanking through Indian payment gateways."],
      ["Do I get an admin panel?", "Yes. Every store comes with an admin panel to manage products, stock and orders."],
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    title: "Mobile App Development Company in India",
    summary: "Android and iOS apps built with Flutter and React Native, with the backend and admin panel behind them.",
    intro:
      "We build Android and iOS apps for businesses, along with the API and admin panel the app needs to run. One codebase with Flutter or React Native keeps both platforms in step.",
    points: [
      "Android and iOS from one codebase",
      "Backend API and database built alongside the app",
      "Admin panel to manage users, content and orders",
      "Login, notifications and payments",
    ],
    tech: ["Flutter", "React Native", "Node.js", "Python APIs", "PostgreSQL", "MongoDB"],
    categories: [],
    faqs: [
      ["Do you build for both Android and iOS?", "Yes. We use Flutter or React Native so one codebase runs on both."],
      ["Do you also build the backend?", "Yes. The API, database and admin panel are part of the project."],
    ],
  },
  {
    slug: "crm-erp-development",
    name: "Custom CRM & ERP Development",
    title: "Custom CRM & ERP Software Development in India",
    summary: "CRM, ERP, inventory and billing software built around how your business already works.",
    intro:
      "Off-the-shelf software makes your team change how they work. We build custom CRM and ERP software around your existing process: leads and follow-ups, staff, inventory, billing and reports in one place, with WhatsApp and payment integrations.",
    points: [
      "Leads, clients and follow-ups in one place",
      "Inventory, billing and accounting modules",
      "Roles and permissions for your team",
      "Reports and dashboards",
      "WhatsApp and payment integrations",
      "Web, desktop or offline: Electron and .NET when it must run without internet",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "MySQL", "Prisma", "Electron", ".NET"],
    categories: ["crm"],
    faqs: [
      ["Why custom CRM instead of an existing tool?", "A custom CRM follows your process instead of forcing your team into someone else's, and you only pay for features you use."],
      ["Can it work offline?", "Yes. When needed we build desktop software with Electron or .NET that runs without internet."],
      ["Can it send WhatsApp messages?", "Yes. We integrate the WhatsApp Business API for reminders, follow-ups and notifications."],
    ],
  },
];

export const serviceBySlug = (slug) => SERVICES.find((s) => s.slug === slug);
