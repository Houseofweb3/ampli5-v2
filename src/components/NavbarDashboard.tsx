/* eslint-disable indent */
/* eslint-disable @next/next/no-img-element */
"use client";

import { NavCartIcon } from "../../public/icons";
import { useLogCart } from "../context/InfluencersContext";
import { useLogpackage } from "../context/PackagesContext";
import { signIn, useSession } from "next-auth/react";
import { useCart } from "../context/CartContext";
import { usePathname, useRouter } from "next/navigation";
import Button from "./ui/button";
import { ALLROUTES, BUTTON_SIZES, BUTTON_TYPES } from "../utils/constants";
import Container from "./ui/container";
import Link from "next/link";
import Image from "next/image";
const NavbarDashBoard = () => {
  const { Logcart } = useLogCart();
  const { Logpackage } = useLogpackage();
  // const [logout, setLogout] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const { cart } = useCart();

  const { data: session } = useSession();
  const User = session?.user;

  const handleCartIconClick = () => {
    const Main = {
      influencers: Logcart,
      packages: Logpackage,
    };
    localStorage.setItem("cartData", JSON.stringify(Main));
    router.push("/dashboard/cart");
  };

  return (
    <>
      <div className="bg-white w-full fixed top-0 z-50">
        <Container className="py-6">
          <div className=" flex items-center justify-between">
            <Link href="/">
              <Image
                alt="Logo"
                width={84}
                height={33}
                className="w-84px lg:w-115px h-fit"
                src="/logo/ampli5.png"
              />
            </Link>
            {pathname.includes("/dashboard/cart") ||
            pathname.includes("/dashboard/checkout") ||
            pathname === ALLROUTES.DASHBOARD ? (
              ""
            ) : (
              <div className="flex  justify-center gap-[38px] items-center ">
                <div
                  className="flex cursor-pointer justify-center items-center gap-2 relative transition-all ease-in-out active:scale-95 "
                  onClick={() => handleCartIconClick()}
                >
                  <div>
                    <NavCartIcon />
                  </div>

                  <div className="bg-primary w-4 h-4 p-2 rounded-full flex justify-center items-center text-white font-Jakarta text-[10px] absolute -top-1 -right-2 ">
                    {User?.id
                      ? cart && cart.influencerCartItems && cart.packageCartItems
                        ? cart.influencerCartItems?.length + cart.packageCartItems?.length
                        : 0
                      : Logcart.length + Logpackage.length}
                  </div>
                </div>
                <div>
                  {User?.id ? (
                    <Image
                      loading="lazy"
                      src={User?.image || ""}
                      width={40}
                      height={40}
                      className="rounded-[20px] cursor-pointer hover:scale-105 transition-all ease-in-out active:scale-95"
                      alt="img"
                      onClick={() => router.push("/dashboard/profile")}
                    />
                  ) : (
                    <Button
                      type={BUTTON_TYPES.PRIMARY}
                      size={BUTTON_SIZES.SMALL}
                      onClick={() =>
                        signIn("google", {
                          callbackUrl: ALLROUTES.REDIRECT_TO_HOME,
                        })
                      }
                    >
                      SIGNUP
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default NavbarDashBoard;
