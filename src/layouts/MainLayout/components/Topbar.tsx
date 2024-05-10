import React, { useState, useEffect, FC, useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import MyThemeContext from "@/store/myThemeContext";

// Components Import
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// Web3 Import
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";

const TopBar: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  // create an ethers provider
  let ethersProvider;

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any");
  }

  const themeCtx: { isDarkMode?: boolean; toggleThemeHandler: () => void } =
    useContext(MyThemeContext);

  function toggleThemeHandler(): void {
    themeCtx.toggleThemeHandler();
  }

  return (
    <header
      className={`fixed z-20 w-full transition-all duration-300  ${
        isScrolled ? "shadow-md py-10" : "py-10"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex gap-40 items-end">
          {/* Logo Section */}
          <h1 className="text-3xl font-bold">
            <Link href="/">
              <div className="relative w-[83px] h-[33px] sm:w-[134px] sm:h-[53px]">
                <Image
                  src="/images/sai-logo.svg"
                  layout="fill"
                  alt="SAI Logo"
                  priority
                  className="object-cover"
                />
              </div>
            </Link>
          </h1>
        </div>

        {/* Button Section */}
        <div className="flex items-center gap-5">
          <Button
            variant="outline"
            size="lg"
            className="font-light text-lg"
            disabled={connecting}
            onClick={() => (wallet ? disconnect(wallet) : connect())}
          >
            {connecting
              ? "Connecting"
              : wallet
              ? "Disconnect"
              : "Authorize with wallet"}
          </Button>
          {/* <Switch
            defaultChecked={true}
            id="theme-mode"
            onClick={toggleThemeHandler}
          /> */}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
