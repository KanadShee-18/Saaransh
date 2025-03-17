export type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  items: string[];
  paymentLink: string;
  priceId: string;
};

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "For personal use",
    price: 99,
    items: [
      "10 PDF uploads per day",
      "Basic support",
      "Email support",
      "Markdown Export",
    ],
    paymentLink: "",
    priceId: "BASIC",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For teams and professionals",
    price: 499,
    items: [
      "Unlimited PDF uploads",
      "Priority support",
      "24/7 priority email support",
      "Markdown Export",
    ],
    paymentLink: "",
    priceId: "PRO",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 15,
      duration: 0.8,
    },
  },
};

export const DEMO_SUMMARY = `
# 🚀 Introduction
📌 Next.js is a powerful React framework for building web applications.
📌 It offers server-side rendering (SSR) and static site generation (SSG).
📌 Designed for performance, scalability, and developer experience.

# 🌟 Features
🔥 Hybrid rendering with SSR and SSG.
🛠️ Built-in API routes for backend logic.
🖼️ Automatic image optimization for faster load times.
⚡ Fast refresh for instant feedback during development.
🔒 Built-in authentication and middleware support.

# 🏗️ How It Works
📤 Pre-renders pages for better performance and SEO.
🔄 Uses file-based routing for simpler navigation.
🔗 Supports dynamic and static routes effortlessly.

# 🎯 Benefits
⏳ Improves load times and SEO with pre-rendering.
📈 Scales efficiently with static exports and edge functions.
💡 Enhances developer experience with intuitive API and tooling.

# ✅ Conclusion
🔄 Next.js simplifies web development with powerful features.
💪 Perfect for modern, scalable, and high-performance apps.
🚀 Start building with Next.js today!
`;
