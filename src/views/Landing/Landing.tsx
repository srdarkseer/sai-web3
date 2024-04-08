import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="h-[90vh] container flex items-center justify-center">
      <div className="grid grid-cols-12 h-[526px] gap-4">
        <div className="col-span-5 p-10 flex flex-col h-full justify-center gap-24 bg-white rounded-2xl shadow-lg">
          <p className="text-charcoal text-base text-center font-medium leading-7">
            &ldquo;Authorize with wallet&ldquo; typically refers to the process
            of granting access or permission to a service or application using a
            digital wallet. A digital wallet is a software-based system that
            securely stores users&apos; payment information and passwords for
            numerous payment methods and websites.
          </p>

          <Button variant="default" size="lg">
            Create Data
          </Button>
        </div>

        <div className="col-span-7 flex h-full justify-center">
          <Image src="/images/landing-bg.png" height={410} width={720} alt="Side Image" />

        </div>
      </div>
    </div>
  );
};

export default Landing;
