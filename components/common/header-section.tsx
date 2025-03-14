import Image from "next/image";
import SAARANSH_LOGO from "@/public/images/saaransh-logo.png";
import { Button } from "@/components/ui/button";
import { NavLink } from "./nav-links";

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
        <NavLink href={"/pricing"}>Pricing</NavLink>
        {isLoggedIn && <NavLink href={"/dashboard"}>Your Summaries</NavLink>}
      </div>

      <div className="flex lg:justify-end">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <NavLink href={"/upload"}>Upload a PDF</NavLink>
            <div>Pro</div>
            <Button>User</Button>
          </div>
        ) : (
          <div>
            <NavLink href={"/sign-in"}>Sign In</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};
