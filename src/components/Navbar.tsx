import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Wrapper from "./Wrapper";
import { Menu } from "./Menu";

const Navbar = async () => {
  const user = true;

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <Wrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 text-lg">
        <div className="flex items-center space-x-10 ">
          <Link href="/" className="flex z-40 font-semibold ">
            check
            <span className="text-primary">it</span>
          </Link>
          <div className="">
          <Menu />
            </div>
            </div>
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: "default",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Comenzar
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/register"
                  className={buttonVariants({
                    size: "default",
                    variant: "ghost",
                  })}
                >
                  Sign up
                </Link>
                <Link
                  href="/api/auth/login"
                  className={buttonVariants({
                    size: "default",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link>
                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: "default",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Comenzar
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </Wrapper>
    </nav>
  );
};
export default Navbar;
