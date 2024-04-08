import React, { useState, useEffect, FC } from "react";
import Link from "next/link";

// Components Import
import { Button } from "@/components/ui/button";

// Icons Import
import Image from "next/image";

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

  return (
    <header
      className={`fixed z-20 w-full transition-all duration-300 bg-gradient-to-l from-primary to-forestGreen ${
        isScrolled ? "shadow-md py-3.5" : "py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex gap-40 items-end">
          {/* Logo Section */}
          <h1 className="text-3xl font-bold">
            <Link href="/">
              <div className="relative w-[134px] h-[53px]">
                <Image
                  src="/images/sai-logo.svg"
                  fill
                  alt="SAI Logo"
                  priority
                  className="object-cover"
                />
              </div>
            </Link>
          </h1>
        </div>

        {/* Button Section */}
        <Button variant="whiteBg" size="default" className="font-light">
          Authorize with wallet
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
