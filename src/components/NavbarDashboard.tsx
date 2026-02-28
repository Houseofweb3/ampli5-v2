/* eslint-disable indent */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { NavCartIcon } from "../../public/icons";
import { useLogCart } from "../context/InfluencersContext";
import { usePathname, useRouter } from "next/navigation";
import Button from "./ui/button";
import { ALLROUTES, BUTTON_SIZES, BUTTON_TYPES } from "../utils/constants";
import Container from "./ui/container";
import Link from "next/link";
import Image from "next/image";
import { useDashboardAuthStore, getClient } from "../store/dashboardAuthStore";
import type { AuthClient } from "@/src/types/dashboardAuth";

const NavbarDashBoard = () => {
  const { Logcart } = useLogCart();
  const router = useRouter();
  const pathname = usePathname();

  const storeClient = useDashboardAuthStore((state) => state.client);
  const [cookieClient, setCookieClient] = useState<AuthClient | null>(null);

  useEffect(() => {
    if (!storeClient && typeof document !== "undefined") setCookieClient(getClient());
  }, [storeClient]);

  const client = storeClient ?? cookieClient;

  const handleCartIconClick = () => {
    const Main = {
      influencers: Logcart,
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
                src="/logo.svg"
              />
            </Link>
            {
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

                    <div className="bg-primary min-w-[18px] min-h-[18px] px-1 rounded-full flex justify-center items-center text-white font-Jakarta text-[10px] font-medium absolute -top-1 -right-2">
                      {Logcart?.length ?? 0}
                    </div>
                  </div>
                  <div>
                    {client?.id ? (
                      <div
                        className="w-10 h-10 rounded-full bg-[#7B46F8] flex items-center justify-center text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => router.push("/dashboard/profile")}
                        title={client.name || client.email}
                      >
                        {(client.name || client.email || "?").charAt(0).toUpperCase()}
                      </div>
                    ) : (
                      <Button
                        type={BUTTON_TYPES.PRIMARY}
                        size={BUTTON_SIZES.SMALL}
                        onClick={() => router.push(ALLROUTES.SIGN_UP)}
                      >
                        Sign Up
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
