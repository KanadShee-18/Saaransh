import Image from "next/image";
import { NavLink } from "./nav-links";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UserPlanBadge } from "@/components/common/plan-badge";
import { BadgeIndianRupee, BookOpen, Upload, User } from "lucide-react";

export const Header = () => {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div>
        <NavLink href={"/"}>
          <Image
            src={"/logo.png"}
            alt="Saaransh"
            width={150}
            height={100}
            className="w-24 sm:w-32 md:w-[150px]"
            quality={100}
            unoptimized
          />
        </NavLink>
      </div>
      <div className="flex lg:justify-center lg:items-center gap-4 lg:gap-12 lg:flex-1">
        <NavLink href={"/#pricing"}>
          <span className="flex items-center gap-1">
            <BadgeIndianRupee className="!size-4" />
            <p className="md:flex hidden">Pricing</p>
          </span>
        </NavLink>
        <SignedIn>
          <NavLink href={"/dashboard"}>
            <span className="flex items-center gap-1">
              <BookOpen className="!size-4" />
              <p className="md:flex hidden">Your Summaries</p>
            </span>
          </NavLink>
        </SignedIn>
      </div>

      <div></div>

      <div className="flex lg:justify-end">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href={"/upload"}>
              <span className="flex items-center gap-1">
                <Upload className="!size-4" />
                <p className="md:flex hidden">Upload a PDF</p>
              </span>
            </NavLink>
            <UserPlanBadge />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>
        <SignedOut>
          <NavLink href={"/sign-in"}>
            <span className="flex items-center gap-1">
              <User className="!size-4" />
              Sign In
            </span>
          </NavLink>
        </SignedOut>
      </div>
    </nav>
  );
};
