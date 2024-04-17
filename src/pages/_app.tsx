import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { MyThemeContextProvider } from "../store/myThemeContext";
import setupWallets from "@/lib/setupWallets";

import { Web3OnboardProvider, init } from "@web3-onboard/react";

const web3Onboard = init({
  wallets: setupWallets(),
  chains: [
    {
      id: "0x3",
      token: "rETH",
      label: "Ethereum Ropsten",
      rpcUrl: `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
    },
    {
      id: "0x89",
      token: "MATIC",
      label: "Polygon",
      rpcUrl: "https://matic-mainnet.chainstacklabs.com",
    },
  ],
  appMetadata: {
    name: "Your App Name",
    icon: "<svg>Your App Icon</svg>",
    description: "Your App Description",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MyThemeContextProvider>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <Component {...pageProps} />
      </Web3OnboardProvider>
    </MyThemeContextProvider>
  );
}
