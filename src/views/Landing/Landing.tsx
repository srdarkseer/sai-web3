import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import PopUpModal from "./components/PopUpModal";

const Landing = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // create an ethers provider
  let ethersProvider;

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any");
  }

  useEffect(() => {
    if (wallet) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsModalOpen(false);
    }
  }, [wallet]);

  return (
    <div className="h-[90vh] container flex items-center justify-center">
      <div className="grid grid-cols-12 h-[526px] gap-4">
        <div className="col-span-5 p-10 flex flex-col h-full justify-center gap-24 bg-white dark:bg-pine rounded-2xl shadow-lg">
          <p className="text-charcoal dark:text-white text-base text-center font-medium leading-7">
            &ldquo;Authorize with wallet&ldquo; typically refers to the process
            of granting access or permission to a service or application using a
            digital wallet. A digital wallet is a software-based system that
            securely stores users&apos; payment information and passwords for
            numerous payment methods and websites.
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
                onClick={() => (wallet ? disconnect(wallet) : connect())}
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
