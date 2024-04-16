import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import PopUpModal from "./components/PopUpModal";

const Landing = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attemptedConnectionFromSection, setAttemptedConnectionFromSection] =
    useState(false);

  // create an ethers provider
  let ethersProvider;

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any");
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (wallet && attemptedConnectionFromSection) {
        setIsModalOpen(true);
        // Reset the flag to avoid unintended modal openings.
        setAttemptedConnectionFromSection(false);
      }
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [wallet, attemptedConnectionFromSection]);

  return (
    <div className="h-[90vh] container flex items-center justify-center">
      <div className="grid grid-cols-12 h-[526px] gap-4">
        <div className="col-span-5 p-10 flex flex-col h-full justify-center gap-24 bg-white dark:bg-pine rounded-2xl shadow-lg">
          <p className="text-charcoal dark:text-white text-base text-center font-medium leading-7">
            &ldquo;Quickly generate synthetica data with LLMs and use $SAI as
            gas.&ldquo;
          </p>

          <div className="w-full flex justify-center">
            {wallet ? (
              <div className="w-full">
                <PopUpModal isOpen={isModalOpen} />
              </div>
            ) : (
              <Button
                variant="default"
                size="lg"
                className="w-full"
                onClick={() => {
                  // Mark the connection attempt coming from this section and try to connect.
                  setAttemptedConnectionFromSection(true);
                  connect();
                }}
              >
                Create Data
              </Button>
            )}
          </div>
        </div>

        <div className="col-span-7 flex h-full justify-center">
          <Image
            src="/images/sideImage.png"
            height={242}
            width={581}
            alt="Side Image"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
