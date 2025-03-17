import { getPriceIdByEmail } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { plans } from "@/utils/constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

export const UserPlanBadge = async () => {
  const user = await currentUser();

  if (!user?.id) return null;

  const email = user?.emailAddresses?.[0]?.emailAddress;

  let priceId: string | null = null;

  if (email) {
    priceId = await getPriceIdByEmail(email);
  }

  let planName = "Buy a plan";

  const plan = plans.find(
    (plan) => plan.priceId.toLowerCase() === priceId?.toLowerCase()
  );

  console.log("Plan in homepage: ", plan);

  if (plan) {
    planName = plan.name;
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden md:flex flex-row items-center",
        !priceId && "from-red-100 to-red-200 border-red-300"
      )}
    >
      <Crown
        className={cn("size-3 mr-1 text-amber-600", !priceId && "text-red-600")}
      />
      {planName}
    </Badge>
  );
};
