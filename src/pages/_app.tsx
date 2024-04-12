import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { MyThemeContextProvider } from "../store/myThemeContext";

import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import infinityWalletModule from "@web3-onboard/infinity-wallet";
import fortmaticModule from "@web3-onboard/fortmatic";
import safeModule from "@web3-onboard/gnosis";
import keepkeyModule from "@web3-onboard/keepkey";
import keystoneModule from "@web3-onboard/keystone";
import portisModule from "@web3-onboard/portis";
import trezorModule from "@web3-onboard/trezor";
import coinbaseModule from "@web3-onboard/coinbase";
import magicModule from "@web3-onboard/magic";
import dcentModule from "@web3-onboard/dcent";
import sequenceModule from "@web3-onboard/sequence";
import tahoModule from "@web3-onboard/taho";
import trustModule from "@web3-onboard/trust";
import frontierModule from "@web3-onboard/frontier";

const INFURA_KEY = "";

const ethereumRopsten = {
  id: "0x3",
  token: "rETH",
  label: "Ethereum Ropsten",
  rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
};

const polygonMainnet = {
  id: "0x89",
  token: "MATIC",
  label: "Polygon",
  rpcUrl: "https://matic-mainnet.chainstacklabs.com",
};

const chains = [ethereumRopsten, polygonMainnet];

//defined function for wallets
const injected = injectedModule();
const coinbase = coinbaseModule();
const dcent = dcentModule();
const infinityWallet = infinityWalletModule();
const keystone = keystoneModule();
const keepkey = keepkeyModule();
const safe = safeModule();
const sequence = sequenceModule();
const taho = tahoModule();
const trust = trustModule();
const frontier = frontierModule();
const trezor = trezorModule({
  email: "test@test.com",
  appUrl: "https://www.blocknative.com",
});
const portis = portisModule({
  apiKey: "apiKey",
});
const fortmatic = fortmaticModule({
  apiKey: "apiKey",
});
const magic = magicModule({
  apiKey: "apiKey",
});

const wallets = [
  infinityWallet,
  keepkey,
  sequence,
  injected,
  trust,
  frontier,
  taho,
  coinbase,
  dcent,
  trezor,
  safe,
  magic,
  fortmatic,
  keystone,
  portis,
];

const web3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: "Web3-Onboard Demo",
    icon: "<svg>My App Icon</svg>",
    description: "A demo of Web3-Onboard.",
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
