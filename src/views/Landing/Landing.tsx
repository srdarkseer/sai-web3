import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import PopUpModal from "./components/PopUpModal";

import { useConnectWallet } from "@web3-onboard/react";

const Landing = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attemptedConnectionFromSection, setAttemptedConnectionFromSection] =
    useState(false);

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
    <div className="h-[90vh] bg-[url('/images/background.png')] bg-center bg-cover flex items-center justify-center">
      <div className="container sm:h-[581px]">
        <div className=" px-20 py-12 flex flex-col h-full bg-black bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-custom-green">
          <h1 className="text-[150px] font-semibold  gradient-text">
            SYNTHETIC V2
          </h1>

          <div className="w-1/2 space-y-12">
            <p className="text-sm text-silver">
              &apos;Authorize with wallet&apos; typically refers to the process
              of granting access or permission to a service or application using
              a digital wallet. A digital wallet is a software-based system that
              securely stores users&apos; payment information and passwords for
              numerous payment methods and websites.
            </p>
            <div className="w-full flex justify-start">
              {wallet ? (
                <div className="w-full">
                  <PopUpModal isOpen={isModalOpen} />
                  {/* <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={sendTransaction}
                >
                  Send Transaction
                </Button> */}
                </div>
              ) : (
                <Button
                  variant="gradient1"
                  size="lg"
                  className="w-72 text-xl font-normal"
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
        </div>
      </div>
    </div>
  );
};

export default Landing;
