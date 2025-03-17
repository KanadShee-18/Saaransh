"use client";

import { cn } from "@/lib/utils";
import {
  containerVariants,
  itemVariants,
  Plan,
  plans,
} from "@/utils/constants";
import { ArrowRight, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { MotionDiv, MotionSection } from "@/components/common/motion-wrapper";

export const PricingSection = () => {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden"
      id="pricing"
    >
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <MotionDiv
          variants={itemVariants}
          className="flex items-center justify-center w-full pb-12"
        >
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </MotionDiv>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

const listVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const PricingCard = ({ id, name, description, price, items }: Plan) => {
  const router = useRouter();

  const handleBuyNow = async (price: number, name: string) => {
    router.push(`/payment?price=${price}&plan=${name}`);
  };

  return (
    <MotionDiv
      variants={listVariants}
      whileHover={{ scale: 1.02 }}
      className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300"
    >
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-2xl border-[1px] border-gray-500/20",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <MotionDiv
          variants={listVariants}
          className="flex justify-between items-center gap-4"
        >
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </MotionDiv>
        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold text-slate-800">
            &#8377;{price}
          </p>
          <div className="flex flex-col justify-end mb-1">
            <p className="text-sm uppercase font-semibold">INR</p>
            {price.toString() === "99" ? (
              <p className="text-xs text-gray-700">limited plan</p>
            ) : (
              <p className="text-xs text-gray-700">for lifetime</p>
            )}
          </div>
        </div>
        <MotionDiv
          variants={listVariants}
          className="space-y-2.5 leading-relaxed text-base flex-1"
        >
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-zinc-700 font-medium"
            >
              <CheckIcon size={18} className="bg-gray-200 rounded-full p-0.5" />
              {item}
            </li>
          ))}
        </MotionDiv>
        <MotionDiv
          variants={listVariants}
          className="flex justify-center w-full"
        >
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
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};
