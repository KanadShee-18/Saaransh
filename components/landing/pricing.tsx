// "use client";

// import { cn } from "@/lib/utils";
// import { ArrowRight, CheckIcon } from "lucide-react";
// import Link from "next/link";

// type Plan = {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   items: string[];
//   paymentLink: string;
//   priceId: string;
// };

// const plans: Plan[] = [
//   {
//     id: "basic",
//     name: "Basic",
//     description: "For personal use",
//     price: 9,
//     items: [
//       "10 PDF uploads",
//       "Basic support",
//       "Email support",
//       "Markdown Export",
//     ],
//     paymentLink: "",
//     priceId: "",
//   },
//   {
//     id: "pro",
//     name: "Pro",
//     description: "For teams and professionals",
//     price: 19,
//     items: [
//       "Unlimited PDF uploads",
//       "Priority support",
//       "24/7 priority email support",
//       "Markdown Export",
//     ],
//     paymentLink: "",
//     priceId: "",
//   },
// ];

// export const PricingSection = () => {
//   return (
//     <section className="relative overflow-hidden" id="pricing">
//       <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
//         <div className="flex items-center justify-center w-full pb-12">
//           <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
//             Pricing
//           </h2>
//         </div>
//         <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
//           {plans.map((plan) => (
//             <PricingCard key={plan.id} {...plan} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const PricingCard = ({
//   id,
//   name,
//   description,
//   price,
//   items,
//   paymentLink,
//   priceId,
// }: Plan) => {
//   const handleBuyNow = async (price: number) => {
//     try {
//       const response = await fetch("/api/payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           order_id: `order_${new Date().getTime()}`,
//           order_amount: price,
//           customer_id: `cust_${new Date().getTime()}`,
//           customer_phone: "9999999999",
//         }),
//       });
//       const data = await response.json();
//       if (!data.success) {
//         alert("Failed to initiate payment. Please try again.");
//         return;
//       }
//       // setPaymentSessionId(data.data.payment_session_id);
//       // initiatePayment(data.data.payment_session_id);
//     } catch (error) {
//       console.error("Network Error:", error);
//     }
//   };
//   return (
//     <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
//       <div
//         className={cn(
//           "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-2xl border-[1px] border-gray-500/20",
//           id === "pro" && "border-rose-500 gap-5 border-2"
//         )}
//       >
//         <div className="flex justify-between items-center gap-4">
//           <div>
//             <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
//             <p className="text-base-content/80 mt-2">{description}</p>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <p className="text-5xl tracking-tight font-extrabold text-slate-800">
//             ${price}
//           </p>
//           <div className="flex flex-col justify-end mb-1">
//             <p className="text-sm uppercase font-semibold">USD</p>
//             <p className="text-xs text-gray-700">/month</p>
//           </div>
//         </div>
//         <div className="space-y-2.5 leading-relaxed text-base flex-1">
//           {items.map((item) => (
//             <li
//               key={item}
//               className="flex items-center gap-2 text-zinc-700 font-medium"
//             >
//               <CheckIcon size={18} className="bg-gray-200 rounded-full p-0.5" />
//               {item}
//             </li>
//           ))}
//         </div>
//         <div className="flex justify-center w-full">
//           <Link
//             onClick={() => handleBuyNow(price)}
//             href={paymentLink}
//             className={cn(
//               "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2 group",
//               id === "pro"
//                 ? "border-rose-900"
//                 : "border-rose-100 from-rose-400 to-rose-500"
//             )}
//           >
//             Buy Now{" "}
//             <ArrowRight
//               size={18}
//               className="group-hover:translate-x-1 transition-transform duration-300"
//             />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  items: string[];
  paymentLink: string;
  priceId: string;
};

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "For personal use",
    price: 9,
    items: [
      "10 PDF uploads",
      "Basic support",
      "Email support",
      "Markdown Export",
    ],
    paymentLink: "",
    priceId: "",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For teams and professionals",
    price: 19,
    items: [
      "Unlimited PDF uploads",
      "Priority support",
      "24/7 priority email support",
      "Markdown Export",
    ],
    paymentLink: "",
    priceId: "",
  },
];

export const PricingSection = () => {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({
  id,
  name,
  description,
  price,
  items,
  paymentLink,
  priceId,
}: Plan) => {
  const router = useRouter();

  const handleBuyNow = async (price: number, name: string) => {
    // Redirect to the payment page with query parameters
    router.push(`/payment?price=${price}&plan=${name}`);
  };

  return (
    <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-2xl border-[1px] border-gray-500/20",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold text-slate-800">
            ${price}
          </p>
          <div className="flex flex-col justify-end mb-1">
            <p className="text-sm uppercase font-semibold">USD</p>
            <p className="text-xs text-gray-700">/month</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-zinc-700 font-medium"
            >
              <CheckIcon size={18} className="bg-gray-200 rounded-full p-0.5" />
              {item}
            </li>
          ))}
        </div>
        <div className="flex justify-center w-full">
          <button
            onClick={() => handleBuyNow(price, name)}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2 group",
              id === "pro"
                ? "border-rose-900"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}
          >
            Buy Now{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
