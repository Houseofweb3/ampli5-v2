"use client";
import { useState, useEffect } from "react";
import DataTablePackages from "./data-table";
import { columnsPackages } from "./columns";
import { useSession } from "next-auth/react";
import { useLogpackage } from "@/src/context/PackagesContext";
import { FilledCartIcon, CartWhiteIcon } from "@/public/icons";
import { useCart } from "@/src/context/CartContext";
import useHow3client from "@/src/hooks/usehow3client";
import toast from "react-hot-toast";
import { ENDPOINTS } from "@/src/utils/constants";

const MainPackges = ({ data }: { data: any }) => {
  const { handlePackageChange, Logpackage } = useLogpackage();
  const { data: session } = useSession();
  const user = session?.user;

  const { cartId, fetchCart, cart } = useCart();
  const how3 = useHow3client();

  const [isAdded, setIsAdded] = useState(false);

  const AddPackage = async () => {
    try {
      if (cartId) {
        const response = await how3.post(`/api/v1/package-cart-item`, {
          packageId: data.id,
          cartId: cartId,
        });

        if (response.data.id) {
          fetchCart();
          toast.success("Product added to cart successfully.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RemoveFromCart = async () => {
    try {
      if (cartId) {
        const IsPackage = cart?.packageCartItems.find(
          (main: any) => main.package.id === data.id
        );

        const response = await how3.delete(
          `${ENDPOINTS.PACKAGES_CART_ITEM}/${IsPackage.id}`
        );
        if (response.data) {
          fetchCart();
          console.log(response.data);
          toast.success("Product removed from cart successfully.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ToggleCart = async (Packagedata: any) => {
    if (!user) {
      handlePackageChange(Packagedata);
    } else {
      if (!isAdded) {
        AddPackage();
        setIsAdded((prev) => !prev);
      } else {
        setIsAdded((prev) => !prev);
        RemoveFromCart();
      }
    }
  };

  const isInLogPackageCart = () => {
    return Logpackage?.find((main: any) => main.id === data.id);
  };

  const CheckPackages = () => {
    const PackageId = data.id;

    const IsPackage = cart?.packageCartItems.find(
      (main: any) => main.package.id === PackageId
    );

    setIsAdded(IsPackage ? true : false);
  };

  useEffect(() => {
    if (user) {
      CheckPackages();
    }
  }, []);

  return (
    <>
      <div className="flex  flex-col gap-3 p-4 border-[1.5px] border-normal shadow-xl rounded-xl justify-center">
        <div className="flex justify-between">
          <div className="text-xl font-[600] items-center justify-center flex text-left">
            {data.header}
          </div>

          <div>
            {user ? (
              isAdded ? (
                <>
                  <button
                    onClick={() => {
                      ToggleCart(data);
                    }}
                    className="xl:p-[10px] px-1 py-1 xl:text-lg text-sm flex gap-3 bg-primary rounded-[6px] text-white"
                  >
                    <div>
                      <FilledCartIcon />
                    </div>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    ToggleCart(data);
                  }}
                  className="xl:p-[10px] px-1 py-1 xl:text-lg text-sm flex gap-3 bg-primary rounded-[6px] text-white"
                >
                  <div>Add to Cart</div>
                  <div>
                    <CartWhiteIcon />
                  </div>
                </button>
              )
            ) : isInLogPackageCart() ? (
              <>
                <button
                  onClick={() => {
                    ToggleCart(data);
                  }}
                  className="xl:p-[10px] px-1 py-1 xl:text-lg text-sm flex gap-3 bg-primary rounded-[6px] text-white"
                >
                  <div>
                    <FilledCartIcon />
                  </div>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  ToggleCart(data);
                }}
                className="xl:p-[10px] px-1 py-1 xl:text-lg text-sm flex gap-3 bg-primary rounded-[6px] text-white"
              >
                <div>Add to Cart</div>
                <div>
                  <CartWhiteIcon />
                </div>
              </button>
            )}
          </div>
        </div>
        <DataTablePackages data={data.packageItems} columns={columnsPackages} />

        <div className="w-full flex justify-center">
          <div className="md:grid flex flex-col gap-1 flex-[0.65] grid-cols-4 justify-between  text-[11px]">
            {data.guaranteedFeatures.map((data: string) => {
              return (
                <div
                  key={data}
                  className="text-[10px] leading-[16px] text-light-gray "
                >
                  {data}
                </div>
              );
            })}
          </div>

          <div className="flex-[0.35] flex justify-end px-3">
            <div className="flex flex-col justify-between">
              <div className="text-2xl font-[700]">${data.cost}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPackges;
