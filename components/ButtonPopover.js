"use client";

import { Popover, Transition } from "@headlessui/react";
import ButtonCheckout from "@/components/ButtonCheckout";
import config from "@/config";

const ButtonPopover = () => {
  return (
    <Popover className="relative z-10">
      {({ open }) => (
        <>
          <Popover.Button className="btn">
            Choose a plan
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 duration-200 ${
                open ? "transform rotate-180 " : ""
              }`}
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
             <Popover.Panel className="absolute left-0 z-10 mt-3 w-screen max-w-full sm:max-w-sm lg:max-w-2xl transform">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-base-content ring-opacity-5">
            <div className="relative grid gap-4 bg-base-100 p-4">
              {/* Beginner Plan */}
              <div className="text-sm flex items-center gap-3 p-2 cursor-pointer hover:bg-base-200 rounded-lg duration-200">
                <p className="font-bold">Beginner</p>
                <ButtonCheckout
                  mode="payment"
                  priceId={config.stripe.plans[0].priceId}
                />
              </div>
              {/* Veteran Plan */}
              <div className="text-sm flex items-center gap-3 p-2 cursor-pointer hover:bg-base-200 rounded-lg duration-200">
                <p className="font-bold">Veteran</p>
                <ButtonCheckout
                  mode="payment"
                  priceId={config.stripe.plans[1].priceId}
                />
              </div>
              {/* Premium Plan */}
              <div className="text-sm flex items-center gap-3 p-2 cursor-pointer hover:bg-base-200 rounded-lg duration-200">
                <p className="font-bold">Premium</p>
                <ButtonCheckout
                  mode="payment"
                  priceId={config.stripe.plans[2].priceId}
                />
              </div>
            </div>
          </div>
        </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ButtonPopover;
