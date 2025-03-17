import { BgGradient } from "@/components/common/bg-gradient";
import { UpgradeRequired } from "@/components/no-subscription";
import { getPriceIdByEmail } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  let hasActiveSubsription = false;

  const email = user?.emailAddresses?.[0]?.emailAddress;

  if (email) {
    const priceId = await getPriceIdByEmail(email);
    if (priceId !== null) {
      hasActiveSubsription = true;
    }
  }

  if (!hasActiveSubsription) {
    return (
      <div className="w-full max-w-max mx-auto">
        <BgGradient />
        <UpgradeRequired />
      </div>
    );
  }

  return <>{children}</>;
}
