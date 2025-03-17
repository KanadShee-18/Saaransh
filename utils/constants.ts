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
