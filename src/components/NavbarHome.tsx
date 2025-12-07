"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Container from "./ui/container";
import Image from "next/image";
import ExploreBtn from "./ui/explorebtn";
import Link from "next/link";
import { AuthProfile } from "../data/data";
import PrimaryButton from "./ui/PrimaryButton";
import { signIn } from "next-auth/react";
import { useAuthStore } from "../store/auth";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axiosInstance";
import Loader from "./ui/loader";
import { usePathname, useRouter } from "next/navigation";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { cn } from "../lib/utils";

const servicesData = [
  {
    name: "AEO LLM Marketing",
    href: "/services/aeo-llm-marketing",
    icon: "/icons/1.png",
  },
  {
    name: "AI Video Generation",
    href: "/services/ai-ad-generation",
    icon: "/icons/2.png",
  },
  {
    name: "Partnership as a service",
    href: "/services/ugc-creator-arena",
    icon: "/icons/3.png",
  },
  {
    name: "Influencer Marketing",
    href: "/services/influencer-marketing",
    icon: "/icons/4.png",
  },
  {
    name: "Founder Led Marketing",
    href: "/services/founder-led-marketing",
    icon: "/icons/5.png",
  },
];

export default function NavbarHome(): JSX.Element {
  const pathname = usePathname();
  const [isAmpli5, setIsAmpli5] = useState(pathname.includes("/ampli5"));

  const { token, user, logout } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsServicesOpen(false);
    setIsAmpli5(pathname.includes("/ampli5"));
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutHandler = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await axiosInstance.post("/auth/logout", { refreshToken: token });
      logout();
      router.replace("/");
    } catch (error) {
      toast.error("Failed to Logout");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(pathname, "pathname");

  return (
    <header id="mainHeader" className="bg-white w-full fixed top-0 z-50">
      <Container className="py-18px">
        <div className=" flex items-center justify-between">
          <Link href="/">
            <Image
              alt="Logo"
              width={84}
              height={33}
              className="w-84px lg:w-115px h-full"
              src="/logo/ampli5.png"
            />
          </Link>
          {token ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/bounty-hunt"
                className="font-medium text-18 hover:text-primary transition-colors duration-200"
              >
                Bounties
              </Link>

              <div className="relative" ref={profileRef}>
                {user?.profile_picture ? (
                  <Image
                    height={57}
                    width={57}
                    alt="profile"
                    src={user?.profile_picture}
                    onClick={() => setIsProfileOpen((pre) => !pre)}
                    className="w-30px h-30px lg:w-57px lg:h-57px rounded-full  object-contain bg-white shadow-xl cursor-pointer"
                  />
                ) : (
                  <ExploreBtn
                    onClick={() => setIsProfileOpen((pre) => !pre)}
                    className="bg-blue-btn uppercase text-white! hover:text-white p-0 rounded-full overflow-hidden w-30px h-30px lg:w-57px lg:h-57px text-14 lg:text-20 hover:shadow-xl hover:bg-blue-btn"
                    disabled={false}
                  >
                    {user?.name?.[0] || "U"}
                  </ExploreBtn>
                )}
                {isProfileOpen ? (
                  <div className="absolute top-24 right-0 bg-white border border-gray-bg rounded-xl p-2 px-7 z-50 min-w-200px">
                    {AuthProfile.map((value, index) => (
                      <Fragment key={value.id}>
                        {value.id ? (
                          <Link
                            href={value.id}
                            onClick={() => setIsProfileOpen(false)}
                            className="text-16 font-normal text-black inline-block w-full py-3 hover:text-primary transition-colors duration-200 "
                          >
                            {value.label}
                          </Link>
                        ) : (
                          <button
                            onClick={logoutHandler}
                            disabled={isLoading}
                            className="text-16 font-normal flex gap-2 items-center text-black  hover:text-primary transition-colors duration-200 w-full py-3.5 text-left cursor-pointer disabled:pointer-events-none"
                          >
                            {isLoading && (
                              <Loader
                                lineColor="border-t-blue-btn/50"
                                loaderColor="border-blue-btn"
                              />
                            )}
                            {value.label}
                          </button>
                        )}
                        {index < AuthProfile.length - 1 && (
                          <hr className="border-light-gray-bg" />
                        )}
                      </Fragment>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="items-center gap-2 sm:gap-4 hidden md:flex">
                <Link
                  href="/for-project"
                  className=" lg:text-xl font-medium capitalize  py-1 text-14 !text-black"
                >
                  Case studies
                </Link>
                <button
                  className="border border-solid rounded-4xl flex items-center justify-center lg:text-xl font-medium capitalize bg-white  text-[#7B46F8] border-[#7B46F8] s px-4 lg:px-7 py-1.5 lg:py-4 text-14 "
                  onClick={() => setIsServicesOpen((pre) => !pre)}
                >
                  Other Services
                  <Image
                    alt="Arrow"
                    width={1000}
                    height={1000}
                    className={cn(
                      "w-4 ml-2 hidden sm:block transition-transform duration-300",
                      isServicesOpen ? "rotate-180" : ""
                    )}
                    src="/icons/dropdown-icon.png"
                  />
                </button>
                {isAmpli5 ? (
                  <PrimaryButton
                    className="text-white text-sm sm:text-base px-2 sm:px-6 lg:px-12 py-1.5 sm:py-2 lg:py-4"
                    onClick={() =>
                      signIn("twitter", { callbackUrl: "/api/user/verify" })
                    }
                  >
                    <span>Login</span>
                    <span className="sm:block hidden">/Signup</span>
                  </PrimaryButton>
                ) : (
                  <Link href="/ampli5">
                    <PrimaryButton className="text-white text-sm sm:text-base px-2 sm:px-6 lg:px-12 py-1.5 sm:py-2 lg:py-4">
                      <span>For Creators</span>
                    </PrimaryButton>
                  </Link>
                )}
              </div>
              <button
                className="md:hidden text-20"
                onClick={() => setIsServicesOpen((pre) => !pre)}
              >
                {isServicesOpen ? (
                  <FiX className="text-32" />
                ) : (
                  <FiMenu className="text-32" />
                )}
              </button>
            </div>
          )}
        </div>
      </Container>

      {isServicesOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 w-full max-w-[650px] px-2">
          <Link
            href="/case-studies"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group  md:hidden "
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium !text-black group-hover:text-blue-btn transition-colors">
                Case studies
              </p>
            </div>
            <FiArrowUpRight />
          </Link>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
            {servicesData.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                {service.icon ? (
                  <div className="flex-shrink-0 sm:w-10 sm:h-10 w-8 h-8 flex items-center justify-center">
                    <Image
                      src={service.icon}
                      alt={service.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : null}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black group-hover:text-blue-btn transition-colors">
                    {service.name}
                  </p>
                </div>
                <FiArrowUpRight />
              </Link>
            ))}
          </div>

          <div className="block w-full mt-4 md:hidden">
            {isAmpli5 ? (
              <PrimaryButton
                className="text-white text-sm sm:text-base  lg:px-12 py-2 !w-full"
                onClick={() =>
                  signIn("twitter", { callbackUrl: "/api/user/verify" })
                }
              >
                Login/Signup
              </PrimaryButton>
            ) : (
              <Link href="/ampli5">
                <PrimaryButton className="text-white text-sm sm:text-base  lg:px-12 py-2 !w-full">
                  <span>For Creators</span>
                </PrimaryButton>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
