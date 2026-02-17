"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import { useCart } from "@/src/context/CartContext";
import useHow3client from "@/src/hooks/usehow3client";
import { ALLROUTES, ENDPOINTS } from "@/src/utils/constants";
import CheckoutForm from "./components/checkoutForm";
import OrderSummary from "./components/orderSummary";

const CheckOutPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { cartId, fetchCart, cart } = useCart();
  const router = useRouter();
  const how3 = useHow3client();

  const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] || "");
  const [lastname, setLastName] = useState(user?.name?.split(" ")[1] || "");
  const [email, setEmail] = useState(user?.email || "");
  const [projectName, setProjectName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [coupon, setCoupon] = useState("");
  const [amount, setAmount] = useState(cart?.cutAmount || 0);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const hasEmptyRequiredField =
      !firstName || !lastname || !email || !projectName || !projectUrl || !telegramLink;
    setDisable(hasEmptyRequiredField);
  }, [firstName, lastname, email, projectName, projectUrl, telegramLink]);

  const validateUrl = (url: string) => {
    // Remove whitespace
    url = url.trim();

    // Check if empty
    if (!url) {
      return false;
    }

    // If URL doesn't start with http:// or https://, add https://
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const formatTelegramId = (id: string): string => {
    id = id.trim();
    if (id.startsWith("@")) {
      return id;
    }
    // If it's a numeric ID, return as is, otherwise add @
    return /^\d+$/.test(id) ? id : `@${id}`;
  };

  const validateTelegramId = (id: string): boolean => {
    id = id.trim();
    // Allow numeric IDs
    if (/^\d{4,}$/.test(id)) {
      return true;
    }
    // Allow usernames with or without @
    const username = id.startsWith("@") ? id.slice(1) : id;
    // Username validation: letters, numbers, and underscores, 5+ characters
    return /^[a-zA-Z0-9_]{5,}$/.test(username);
  };

  const validateForm = () => {
    // Check required fields
    if (
      !firstName.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !projectName.trim() ||
      !projectUrl.trim() ||
      !telegramLink.trim()
    ) {
      toast.error("Please fill in all required fields");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Validate URL with more flexible validation
    if (!validateUrl(projectUrl)) {
      toast.error(
        "Please enter a valid website address (e.g., example.com or https://example.com)"
      );
      return false;
    }

    // Validate Telegram ID
    if (!validateTelegramId(telegramLink)) {
      toast.error("Please enter a valid Telegram ID (numeric ID or username)");
      return false;
    }

    return true;
  };

  const CheckoutUserDetails = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Ensure URL has https:// prefix for submission
      let formattedUrl = projectUrl;
      if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
        formattedUrl = "https://" + formattedUrl;
      }

      const checkoutData = {
        cartId,
        totalAmount: amount,
        firstName,
        email,
        lastName: lastname,
        telegramId: formatTelegramId(telegramLink),
        projectUrl: formattedUrl,
        projectName,
        managementFeePercentage: cart?.managementFeePercentage,
        managementFee: cart?.managementFee,
      };

      if (cartId && cart?.cutAmount !== cart?.total) {
        Object.assign(checkoutData, {
          discount: Math.floor(cart?.cutAmount! - cart?.total!),
        });
      }

      const response = await how3.post(ENDPOINTS.CHECKOUT, checkoutData);

      if (response.data) {
        fetchCart();
        toast.success("Invoice sent!");
        localStorage.removeItem("CheckoutData");
        router.push(ALLROUTES.CHECKOUT_TO_COMPLETE);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to process checkout");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-full bg-background-color flex justify-center px-4 md:px-12 xl:px-16 py-12">
        <div className="flex w-full md:flex-row flex-col gap-8">
          <div className="md:w-3/5 w-full">
            <CheckoutForm
              setFirstName={setFirstName}
              firstName={firstName}
              lastName={lastname}
              setLastName={setLastName}
              email={email}
              projectName={projectName}
              projectUrl={projectUrl}
              setEmail={setEmail}
              setProjectName={setProjectName}
              setProjectUrl={setProjectUrl}
              setTelegramLink={setTelegramLink}
              telegramLink={telegramLink}
            />
          </div>

          <div className="w-full md:w-2/5 md:min-w-sm h-full">
            <OrderSummary
              CheckoutUserDetails={CheckoutUserDetails}
              setCoupon={setCoupon}
              coupon={coupon}
              setAmount={setAmount}
              disable={disable}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
