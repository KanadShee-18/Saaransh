import Image from "next/image";
import SAARANSH_LOGO from "@/public/images/saaransh-logo.png";
import { NavLink } from "./nav-links";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const Header = () => {
  const isLoggedIn = false;
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div>
        <NavLink href={"/"}>
          <Image
            src={SAARANSH_LOGO}
            alt="Saaransh"
            width={150}
            height={100}
            quality={100}
          />
        </NavLink>
      </div>
      <div className="flex lg:justify-center lg:items-center gap-4 lg:gap-12 lg:flex-1">
        <NavLink href={"/#pricing"}>Pricing</NavLink>
        <SignedIn>
          <NavLink href={"/dashboard"}>Your Summaries</NavLink>
        </SignedIn>
      </div>

      <div className="flex lg:justify-end">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href={"/upload"}>Upload a PDF</NavLink>
            <div>Pro</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>
        <SignedOut>
          <NavLink href={"/sign-in"}>Sign In</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
};
