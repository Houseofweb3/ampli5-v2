"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarDashBoard from "./NavbarDashboard";
import NavbarHome from "./NavbarHome";

export default function Navbar(): JSX.Element {
  const pathname = usePathname();
  const [isDashboard, setIsDashboard] = useState(pathname.startsWith("/dashboard"));

  useEffect(() => {
    // Update state whenever pathname changes to trigger re-render
    setIsDashboard(pathname.startsWith("/dashboard"));
  }, [pathname]);

  return <>{isDashboard ? <NavbarDashBoard /> : <NavbarHome />}</>;
}
