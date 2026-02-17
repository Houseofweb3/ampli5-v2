import React, { Dispatch, SetStateAction } from "react";
import { TelegramIcon, EmailIcon, LinkIcon } from "../../../../../public/icons";
import Input from "../../../../components/ui/input";
import { INPUT_VARIANTS } from "../../../../utils/constants";

interface CheckoutFormProps {
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  projectName: string;
  setProjectName: Dispatch<SetStateAction<string>>;
  projectUrl: string;
  setProjectUrl: Dispatch<SetStateAction<string>>;
  email: string;
  telegramLink: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setTelegramLink: Dispatch<SetStateAction<string>>;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  projectName,
  setProjectName,
  projectUrl,
  setProjectUrl,
  email,
  setEmail,
  setTelegramLink,
  telegramLink,
}) => {
  return (
    <div className="font-Jakarta">
      <div className="flex flex-col gap-5">
        <div className="font-bold text-2xl font-Jakarta md:leading-[24px]">Checkout</div>

        <div className="font-semibold md:text-base text-sm font-Jakarta md:leading-[22px]">
          Campaign Details
        </div>
      </div>
      <div className="pt-4 md:pt-10 w-full grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-3">
        <div className="flex flex-col gap-3">
          <div className="font-semibold md:text-sm md:leading-[20px]">First Name*</div>
          <div className="items-center">
            <Input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant={INPUT_VARIANTS.OUTLINED}
              name="firstName"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-bold md:text-sm md:leading-[20px]">Last Name*</div>
          <div className="items-center">
            <Input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant={INPUT_VARIANTS.OUTLINED}
              name="lastName"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-bold md:text-sm md:leading-[20px]">Project Name*</div>
          <div className="items-center">
            <Input
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              variant={INPUT_VARIANTS.OUTLINED}
              name="projectName"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-bold md:text-sm md:leading-[20px]">Project URL*</div>
          <div className="flex gap-3 border w-full border-gray-300 rounded-md bg-white">
            <div className="py-[14px] pl-[16px]">
              <LinkIcon />
            </div>
            <div className="w-full">
              <Input
                required
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                variant={INPUT_VARIANTS.TRANSPARENT}
                className="border-none"
                name="projectUrl"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-bold md:text-sm md:leading-[20px]">Email*</div>
          <div className="flex gap-3 border w-full border-gray-300 rounded-md bg-white">
            <div className="py-[14px] pl-[16px]">
              <EmailIcon />
            </div>
            <div className="w-full">
              <Input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                variant={INPUT_VARIANTS.TRANSPARENT}
                className="border-none"
                name="email"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-bold md:text-sm md:leading-[20px]">Telegram ID*</div>
          <div className="flex gap-3 border w-full border-gray-300 rounded-md bg-white">
            <div className="py-[14px] pl-[16px]">
              <TelegramIcon />
            </div>
            <div className="w-full">
              <Input
                required
                value={telegramLink}
                onChange={(e) => setTelegramLink(e.target.value)}
                type="text"
                variant={INPUT_VARIANTS.TRANSPARENT}
                className="border-none"
                name="telegramLink"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
